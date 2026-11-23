import './dashboard.css';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { getSession } from '@/utils/getSession';
import Navbar from '@/components/dashboard/Navbar';
import Aside from '@/components/dashboard/Aside';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: async () => {
    const session = await getSession();

    if (!session) {
      throw Route.redirect({ to: '/' });
    }
  },
});

function RouteComponent() {
  return (
    <div id='dashboard'>
      <Navbar />
      <Aside />
      <Outlet />
    </div>
  );
}
