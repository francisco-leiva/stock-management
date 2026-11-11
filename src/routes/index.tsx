import './home.css';
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
      navigate({ to: '/dashboard' });
    }
    setLoading(false);
  };

  return (
    <div id='loginContainer'>
      <form id='loginForm' onSubmit={handleLogin}>
        <img
          src='./images/byn-logo.svg'
          alt='Logo Blanco y Negro'
          width={1000}
          height={1000}
        />

        <h1>Blanco y Negro</h1>

        <label htmlFor='user_email'>E-mail</label>
        <input
          id='user_email'
          name='user_email'
          type='email'
          placeholder='jonhdoe@gmail.com'
          required={true}
          ref={emailInput}
        />

        <label htmlFor='user_password'>Contraseña</label>
        <input
          id='user_password'
          name='user_password'
          type='password'
          placeholder='••••••••••'
          required={true}
          ref={passwordInput}
        />

        <button disabled={loading}>
          {loading ? <span>Cargando...</span> : <span>Ingresar</span>}
        </button>
      </form>
    </div>
  );
}
