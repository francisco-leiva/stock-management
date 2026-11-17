import { supabase } from '@/utils/supabase';
import { Link, useNavigate } from '@tanstack/react-router';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: '/' });
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
            defaultChecked
          />

          <label htmlFor='menuCheckbox'>
            <img src='./images/menu.svg' alt='Menu' width={50} height={50} />
          </label>
        </div>

        <div id='navbar'>
          <nav aria-label='Main Navbar'>
            <ul>
              <li>
                <Link to='/dashboard'>Inicio</Link>
              </li>
              <li>
                <Link to='/dashboard/products'>Productos</Link>
              </li>
              <li>
                <Link to='/dashboard/sales'>Ventas</Link>
              </li>
              <li>
                <Link to='/dashboard/sendtobranch'>Envíos sucursal</Link>
              </li>
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
