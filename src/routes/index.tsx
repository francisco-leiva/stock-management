import { useEffect, useState, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from '@/utils/supabase';
import { getSession } from '@/utils/getSession';
import type { Session } from '@supabase/supabase-js';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>();

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getSession().then((n) => setSession(n));

    if (session) {
      navigate({ to: '/dashboard' });
    }
  }, [session]);

  const handleLogin = async (event: React.ChangeEvent) => {
    event.preventDefault();
    setLoading(true);

    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;

    if (!email || !password) {
      throw new Error('Form fields are incomplete');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      console.log({ data });
      alert('Successfully login!');
      navigate({ to: '/dashboard' });
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email"
          required={true}
          ref={emailInput}
        />

        <input
          type="password"
          placeholder="Your password"
          required={true}
          ref={passwordInput}
        />

        <button disabled={loading}>
          {loading ? <span>Loading</span> : <span>Enter</span>}
        </button>
      </form>
    </div>
  );
}
