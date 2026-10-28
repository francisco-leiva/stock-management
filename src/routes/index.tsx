import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.ChangeEvent) => {
    event.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'valid.email@supabase.io',
      password: 'example-password',
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Successfully login!');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Show login form
  return (
    <div>
      <h1>Supabase + React</h1>
      <p>Sign in via magic link with your email below</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Your password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? <span>Loading</span> : <span>Enter</span>}
        </button>
      </form>
    </div>
  );
}
