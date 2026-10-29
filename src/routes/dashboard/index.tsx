import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/utils/supabase';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

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
