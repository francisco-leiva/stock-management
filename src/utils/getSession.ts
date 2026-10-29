import { supabase } from "./supabase";

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()

  return session
}
