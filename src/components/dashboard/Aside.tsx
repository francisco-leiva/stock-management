import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Link, useNavigate } from '@tanstack/react-router';

export default function Aside() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: '/' });
  };

  const handleToggleSidebar = () => {
    setSidebar(() => !sidebar);
  };

  return (
    <aside id='dashboardAside' className={sidebar ? '' : 'closeAside'}>
      <div id='asideHeader'>
        <img
          src='./images/aside/sidebar.svg'
          alt='Close sidebar'
          width={28}
          height={28}
          onClick={handleToggleSidebar}
        />
      </div>

      <nav>
        <ul>
          <li>
            <Link to='/dashboard'>
              <img
                src='./images/aside/home.svg'
                alt='Home'
                width={28}
                height={28}
              />

              <span>Inicio</span>
            </Link>
          </li>

          <li>
            <Link to='/dashboard/products'>
              <img
                src='./images/aside/data.svg'
                alt='Products'
                width={28}
                height={28}
              />

              <span>Productos</span>
            </Link>
          </li>

          <li>
            <Link to='/dashboard/sales'>
              <img
                src='./images/aside/billing.svg'
                alt='Sales'
                width={28}
                height={28}
              />

              <span>Ventas</span>
            </Link>
          </li>

          <li>
            <Link to='/dashboard/sendtobranch'>
              <img
                src='./images/aside/shipping-box.svg'
                alt='Send to branch'
                width={28}
                height={28}
              />

              <span>Envíos sucursal</span>
            </Link>
          </li>
        </ul>
      </nav>

      <button
        id='asideCloseSession'
        className='closeSessionButton'
        onClick={handleLogout}
      >
        <img
          src='./images/aside/exit.svg'
          alt='Close session'
          width={28}
          height={28}
        />

        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}
