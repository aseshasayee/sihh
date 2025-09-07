import { supabase } from './supabase'
import type { Student, Teacher, School, DailyTask, Submission } from './supabase'

// Auth functions
export const signUp = async (email: string, password: string, userData: Partial<Student | Teacher>) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  // Insert user data into appropriate table
  if (userData.hasOwnProperty('school_id')) {
    const isStudent = 'eco_points' in userData
    const table = isStudent ? 'students' : 'teachers'
    
    const { error: insertError } = await supabase
      .from(table)
      .insert([{ 
        ...userData, 
        email,
        [`${isStudent ? 'student' : 'teacher'}_id`]: data.user?.id 
      }])

    if (insertError) throw insertError
  }

  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Student functions
export const getStudentProfile = async (studentId: string) => {
  const { data, error } = await supabase
    .from('students')
    .select(`
      *,
      schools:school_id (name, city, region),
      student_badges (
        badge_id,
        unlocked_at,
        badges (name, description, icon_url)
      )
    `)
    .eq('student_id', studentId)
    .single()

  if (error) throw error
  return data
}

export const updateStudentPoints = async (studentId: string, points: number) => {
  const { data, error } = await supabase
    .from('students')
    .update({ eco_points: points })
    .eq('student_id', studentId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Task functions
export const getDailyTasks = async () => {
  const { data, error } = await supabase
    .from('daily_tasks')
    .select('*')
    .gte('valid_to', new Date().toISOString().split('T')[0])
    .order('eco_points', { ascending: false })

  if (error) throw error
  return data
}

export const getSchoolTasks = async (schoolId: string) => {
  const { data, error } = await supabase
    .from('school_tasks')
    .select(`
      *,
      daily_tasks (*),
      teachers:assigned_by (name)
    `)
    .eq('school_id', schoolId)
    .eq('status', 'active')

  if (error) throw error
  return data
}

export const submitTask = async (submission: Omit<Submission, 'submission_id' | 'submitted_at'>) => {
  const { data, error } = await supabase
    .from('submissions')
    .insert([submission])
    .select()
    .single()

  if (error) throw error
  return data
}

// Leaderboard functions
export const getStudentLeaderboard = async (limit: number = 10) => {
  const { data, error } = await supabase
    .from('students')
    .select(`
      student_id,
      name,
      eco_points,
      streak_count,
      schools:school_id (name)
    `)
    .order('eco_points', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export const getSchoolLeaderboard = async (limit: number = 10) => {
  const { data, error } = await supabase
    .from('schools')
    .select('*')
    .order('eco_points', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

// Image upload function
export const uploadTaskImage = async (file: File, submissionId: string) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${submissionId}-${Date.now()}.${fileExt}`
  const filePath = `task-images/${fileName}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('task-images')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: urlData } = supabase.storage
    .from('task-images')
    .getPublicUrl(filePath)

  // Save image record
  const { data, error } = await supabase
    .from('irl_task_images')
    .insert([{
      submission_id: submissionId,
      image_url: urlData.publicUrl,
    }])
    .select()
    .single()

  if (error) throw error
  return data
}
