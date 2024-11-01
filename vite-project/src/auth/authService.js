import { supabase } from '../lib/supabaseClient';
import CryptoJS from 'crypto-js';

const hashPassword = (plainPassword) => {
  return CryptoJS.SHA256(plainPassword).toString(); 
};


export const registerUser = async (email, password, name) => {
  const { user, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  const { error: insertError } = await supabase
    .from('users')
    .insert([{ id: user.id, email, name, created_at: new Date() }]); 

  if (insertError) {
    throw new Error(insertError.message);
  }

  return user; 
};


export const loginUser = async (email, plainPassword) => {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
  
    if (error) {
      throw new Error("Pengguna tidak ditemukan.");
    }
  
    const isPasswordCorrect = verifyPassword(plainPassword, user.password);
  
    if (!isPasswordCorrect) {
      throw new Error("Kata sandi salah.");
    }
  
    return user;
  };
  