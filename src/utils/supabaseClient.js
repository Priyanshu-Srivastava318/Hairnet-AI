import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qvqzcgsyfymbpkifgcyi.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2cXpjZ3N5ZnltYnBraWZnY3lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MTE1NjMsImV4cCI6MjA4NjE4NzU2M30.StN5uric6vOgdrAoHJsk6WWFAFbF3-vkdp45DR4fzOo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for authentication
export const authHelpers = {
  // Sign up new user
  signUp: async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })
    return { data, error }
  },

  // Sign in existing user
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Get session
  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }
}