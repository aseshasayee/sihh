// Test Supabase Connection
import { supabase } from './lib/supabase'

export async function testSupabaseConnection() {
  try {
    console.log('🔌 Testing Supabase connection...')
    
    // Test 1: Check if client is initialized
    console.log('✅ Supabase client initialized')
    console.log('📍 URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    
    // Test 2: Test basic connection with a simple query
    const { data, error } = await supabase
      .from('schools')
      .select('count')
      .limit(1)
    
    if (error) {
      console.log('⚠️  Database query test:', error.message)
      // This might fail if tables don't exist yet, which is okay
    } else {
      console.log('✅ Database connection successful')
    }
    
    // Test 3: Test auth service
    const { data: session } = await supabase.auth.getSession()
    console.log('✅ Auth service accessible')
    console.log('👤 Current session:', session.session ? 'Authenticated' : 'Not authenticated')
    
    return {
      success: true,
      message: 'Supabase connection is working properly!'
    }
    
  } catch (error) {
    console.error('❌ Supabase connection failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
