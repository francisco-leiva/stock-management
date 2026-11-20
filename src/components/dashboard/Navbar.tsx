import { supabase } from '@/utils/supabase';
import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

const pages = {
  inicio: '/dashboard',
  productos: '/dashboard/products',
  ventas: '/dashboard/sales',
  'envíos sucursal': '/dashboard/sendtobranch',
};

export default function Navbar() {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: '/' });
  };

  const handleUnchecked = () => {
    setCheck(false);
  };

  return (
    <>
      <header id='dashboardHeader'>
        <div id='navbarMenu'>
          <input
            id='menuCheckbox'
            name='menuCheckbox'
            aria-label='menuCheckbox'
            type='checkbox'
            onChange={(e) => setCheck(e.target.checked)}
            checked={check}
          />

          <label htmlFor='menuCheckbox'>
            <img src='./images/menu.svg' alt='Menu' width={40} height={40} />
          </label>
        </div>

        <div id='navbar'>
          <nav aria-label='Main Navbar'>
            <ul>
              {Object.entries(pages).map(([key, value]) => (
                <li key={key}>
                  <Link to={value} onClick={handleUnchecked}>
                    {key}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            id='closeSessionNav'
            className='closeSessionButton'
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </header>
    </>
  );
}
