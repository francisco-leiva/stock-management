import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/utils/supabase';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getSession } from '@/utils/getSession';
import type { Session } from '@supabase/supabase-js';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [session, setSession] = useState<Session | null>()

  useEffect(() => {
    getSession().then(n => setSession(n))

    if (!session) {
      navigate({ to: '/login' })
    }
  }, [session])

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: '/' });
  };

  return (
    <>
      <div>Welcome to the dashboard!</div>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}
