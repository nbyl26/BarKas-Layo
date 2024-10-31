import { supabase } from "../createClient";

export const getAllUsers = async () => {
    try {
      const { data, error } = await supabase.from('User').select('*');
  
      if (error) {
        console.error("Error fetching users:", error);
        return null;
      }
  
      return data;
    } catch (err) {
      console.error("Unexpected error:", err);
      return null;
    }
  };

export const getUserById = async (id) => {
    try {
      const { data, error } = await supabase.from('User').select('*').eq('id', id);
  
      if (error) {
        console.error("Error fetching user:", error);
        return null;
      }
  
      return data[0];
    } catch (err) {
      console.error("Unexpected error:", err);
      return null;
    }
  }

export const loginUserByEmailAndPassword = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        console.error("Error logging in:", error);
        return null;
      }

      console.log(data);
      return data;
    } catch (err) {
      console.error("Unexpected error:", err);
      return null;
    }
  }

export const registerUserByEmailAndPassword = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        console.error("Error registering user:", error);
        return null;
      }
  
      return data;
    } catch (err) {
      console.error("Unexpected error:", err);
      return null;
    }
  }