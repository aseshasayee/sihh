'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string, userType?: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, userData: any) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string, userType?: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('Sign-in error:', error)
        
        // Provide user-friendly error messages
        let userMessage = error.message
        
        if (error.message.includes('Invalid login credentials')) {
          userMessage = 'Invalid email or password. Please check your credentials and try again.'
        } else if (error.message.includes('Email not confirmed')) {
          userMessage = 'Please check your email and click the confirmation link before signing in.'
        } else if (error.message.includes('Too many requests')) {
          userMessage = 'Too many sign-in attempts. Please wait a moment and try again.'
        }
        
        return { success: false, error: userMessage }
      }

      console.log('Sign-in successful:', data)
      return { success: true }
      
    } catch (error: any) {
      console.error('Unexpected sign-in error:', error)
      return { success: false, error: 'An unexpected error occurred during sign-in' }
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      
      if (error) {
        console.error('Sign-up error:', error)
        
        // Provide user-friendly error messages
        let userMessage = error.message
        
        if (error.message.includes('User already registered')) {
          userMessage = 'An account with this email already exists. Please sign in instead.'
        } else if (error.message.includes('Password should be at least')) {
          userMessage = 'Password should be at least 6 characters long.'
        } else if (error.message.includes('Invalid email')) {
          userMessage = 'Please enter a valid email address.'
        } else if (error.message.includes('signup is disabled')) {
          userMessage = 'Account registration is currently disabled. Please contact support.'
        }
        
        return { success: false, error: userMessage }
      }
      
      console.log('Sign-up successful:', data)
      return { success: true }
    } catch (error: any) {
      console.error('Unexpected sign-up error:', error)
      return { success: false, error: 'An unexpected error occurred during registration. Please try again.' }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
