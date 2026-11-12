import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div id='dashboardMain'>
      <div id='indexContainer'>
        <img
          src='./images/byn-logo.svg'
          alt='Logo Blanco y Negro'
          width={80}
          height={80}
        />

        <h2>Bienvenido @usuario</h2>
      </div>
    </div>
  );
}
