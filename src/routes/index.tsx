import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { getSession } from '@/utils/getSession';
import type { Session } from '@supabase/supabase-js';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  const [session, setSession] = useState<Session | null>()

  useEffect(() => {
    getSession().then(n => setSession(n))

    if (session) {
      navigate({ to: '/dashboard' })
    } else {
      navigate({ to: '/login' })
    }
  }, [session])

  return <div>Loading...</div>;
}
