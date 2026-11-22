import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { Users } from './supabase.types';

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
