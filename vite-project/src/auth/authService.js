// src/auth/authService.js
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { supabase } from '../lib/supabaseClient';

export const registerUser = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Simpan data pengguna di Supabase
  const { error } = await supabase
    .from('users')
    .insert([{ id: user.uid, email: user.email, name }]);

  if (error) {
    throw new Error(error.message);
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
  