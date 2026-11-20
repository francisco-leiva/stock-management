import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from './supabase';

type Users = {
  id: string;
  role: string;
  id_branch: string;
  created_at: string;
  name: string;
  id_user: string;
};

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data,
    error,
  }: { data: Users[] | null; error: PostgrestError | null } = await supabase
    .from('profiles')
    .select()
    .eq('id_user', user?.id);

  return { data, error };
}
