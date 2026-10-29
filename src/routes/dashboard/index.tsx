import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/utils/supabase';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { getSession } from '@/utils/getSession';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    getSession().then((data) => {
      if (!data) {
        navigate({ to: '/' });
      }
    });
  }, []);

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
