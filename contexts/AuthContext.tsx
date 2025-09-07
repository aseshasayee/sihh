'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { Student, Teacher } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  profile: Student | Teacher | null
  userType: 'student' | 'teacher' | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  userType: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Student | Teacher | null>(null)
  const [userType, setUserType] = useState<'student' | 'teacher' | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    try {
      // Try to fetch as student first
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select(`
          *,
          schools:school_id (name, city, region)
        `)
        .eq('student_id', userId)
        .single()

      if (studentData && !studentError) {
        setProfile(studentData)
        setUserType('student')
        return
      }

      // If not a student, try teacher
      const { data: teacherData, error: teacherError } = await supabase
        .from('teachers')
        .select(`
          *,
          schools:school_id (name, city, region)
        `)
        .eq('teacher_id', userId)
        .single()

      if (teacherData && !teacherError) {
        setProfile(teacherData)
        setUserType('teacher')
        return
      }

      // If neither, clear profile
      setProfile(null)
      setUserType(null)
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
      setUserType(null)
    }
  }

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id)
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user?.id) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user?.id) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setUserType(null)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setUserType(null)
  }

  const value = {
    user,
    profile,
    userType,
    loading,
    signOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
