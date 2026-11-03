import './dashboard.css';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import Aside from '@/components/dashboard/Aside';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Aside />
      <Outlet />
    </>
  );
}
