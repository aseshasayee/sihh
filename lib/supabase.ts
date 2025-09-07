import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for your database tables
export interface School {
  school_id: string
  name: string
  city?: string
  region?: string
  eco_points: number
  created_at: string
}

export interface Teacher {
  teacher_id: string
  name: string
  email: string
  school_id: string
  role?: string
  created_at: string
}

export interface Student {
  student_id: string
  name: string
  email: string
  school_id: string
  eco_points: number
  streak_count: number
  power_ups: Record<string, any>
  created_at: string
}

export interface Badge {
  badge_id: string
  name: string
  description?: string
  icon_url?: string
  criteria?: Record<string, any>
  created_at: string
}

export interface StudentBadge {
  student_id: string
  badge_id: string
  unlocked_at: string
}

export interface DailyTask {
  task_id: string
  title: string
  description?: string
  eco_points: number
  difficulty_level?: string
  valid_from?: string
  valid_to?: string
}

export interface SchoolTask {
  school_task_id: string
  school_id: string
  task_id: string
  assigned_by?: string
  status: string
}

export interface Submission {
  submission_id: string
  student_id: string
  task_id: string
  status: string
  points_awarded: number
  submitted_at: string
}

export interface IrlTaskImage {
  image_id: string
  submission_id: string
  image_url: string
  gps_coordinates?: string
  timestamp: string
}

export interface Quiz {
  quiz_id: string
  title: string
  questions: Record<string, any>
  points: number
  created_by?: string
  created_at: string
}
