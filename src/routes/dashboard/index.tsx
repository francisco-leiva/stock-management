import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getUser } from '@/utils/getUser';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState('@usuario');

  useEffect(() => {
    getUser().then((res) => {
      const { data, error } = res;

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        const userName = data[0].name;
        setName(userName);
      }
    });
  }, []);

  return (
    <div id='dashboardMain'>
      <div id='indexContainer'>
        <img
          src='./images/byn-logo.svg'
          alt='Logo Blanco y Negro'
          width={150}
          height={150}
        />

        <h2>Bienvenido {name}</h2>
      </div>
    </div>
  );
}
