'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server.supa'



export async function login(formData) {
  const supabase = createClient()

  const { email, password } = formData

  if (!email || !password) {
    return { message: 'Email and password are required.' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}


export async function signup(formData) {
  const supabase = createClient()

  const { email, password, full_name } = formData

  if (!email || !password || !full_name) {
    return { message: 'Email, password, and full name are required.' }
  }

  const { error, data: { user } } = await supabase.auth.signUp({ email, password });

  if (error) {  
    return { message: error.message };
  }

  if (!user) {
    return { message: 'Sign up was successful, but user data is not available.' }
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .update({ full_name })
    .eq('id', user.id);

  if (profileError) {
    return { message: profileError.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/login');
}