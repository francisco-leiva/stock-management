import './dashboard.css';
import { useEffect } from 'react';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { getSession } from '@/utils/getSession';
import Navbar from '@/components/dashboard/Navbar';
import Aside from '@/components/dashboard/Aside';

export const Route = createFileRoute('/dashboard')({
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

  return (
    <div id='dashboard'>
      <Navbar />
      <Aside />
      <Outlet />
    </div>
  );
}
