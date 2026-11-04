import { supabase } from '@/utils/supabase';
import { Link, useNavigate } from '@tanstack/react-router';

export default function Aside() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: '/' });
  };

  return (
    <aside id='dashboardAside'>
      <nav>
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

      <button onClick={handleLogout}>Cerrar sesión</button>
    </aside>
  );
}
