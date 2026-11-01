import { supabase } from '@/utils/supabase';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { getSession } from '@/utils/getSession';

export default function Aside() {
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
    <aside id='dashboardAside'>
      Aside

      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </aside>
  );
}
