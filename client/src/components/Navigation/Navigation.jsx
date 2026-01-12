import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Package,
  Settings,
  Users,
  Phone,
  LogIn,
  LogOut,
  User,
  LayoutDashboard,
  ListChecks,
  FileText,
  Handshake,
} from 'lucide-react';

// =========================================================
// RUTAS
// =========================================================

const COMMON_NAV_ITEMS = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/productos', label: 'Productos', icon: Package },
  { path: '/servicios', label: 'Servicios', icon: Settings },
  { path: '/acerca-de-nosotros', label: 'Nosotros', icon: Users },
  // { path: '/contacto', label: 'Contacto', icon: Phone },
  // { path: '/catalogo-pdfs', label: 'Catálogos', icon: FileText },
];

const USER_NAV_ITEMS = [
  { path: '/cotizaciones', label: 'Cotizaciones', icon: Handshake },
];

const ADMIN_NAV_ITEMS = [
  { path: '/admin/products', label: 'Admin Productos', icon: LayoutDashboard },
  { path: '/admin/quotations', label: 'Gestionar Cotizaciones', icon: ListChecks },
  { path: '/admin/manage', label: 'Administración General', icon: Settings },
];

// =========================================================
// COMPONENTE
// =========================================================

const Navigation = ({
  isMobile = false,
  onLinkClick,
  isLoggedIn = false,
  onLogout,
  rol,
}) => {
  const commonClasses =
    'font-medium transition-all duration-300 relative group';

  /* ======================================================
     VISTA MÓVIL (menú lateral blanco)
  ====================================================== */
  if (isMobile) {
    let allNavItems = [...COMMON_NAV_ITEMS];
    if (isLoggedIn) allNavItems.push(...USER_NAV_ITEMS);
    if (rol === 'admin') allNavItems.push(...ADMIN_NAV_ITEMS);

    return (
      <nav className="flex flex-col space-y-2">
        {allNavItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? 'bg-pink-50 text-pink-600'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}

        <div className="border-t border-slate-200 my-4" />

        {isLoggedIn ? (
          <>
            <NavLink
              to="/mi-cuenta"
              onClick={onLinkClick}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              <User size={18} />
              <span>Mi Cuenta</span>
            </NavLink>

            <button
              onClick={() => {
                onLogout();
                onLinkClick();
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
            >
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            onClick={onLinkClick}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            <LogIn size={18} />
            <span>Iniciar Sesión</span>
          </NavLink>
        )}
      </nav>
    );
  }

  /* ======================================================
     VISTA ESCRITORIO (header blanco)
  ====================================================== */
  return (
    <nav className="hidden lg:flex items-center space-x-6">

      {/* Enlaces comunes */}
      {COMMON_NAV_ITEMS.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `${commonClasses} text-slate-700 hover:text-slate-900 ${
              isActive ? 'text-slate-900 font-semibold' : ''
            }`
          }
        >
          {label}
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </NavLink>
      ))}

      {/* Enlaces usuario */}
      {isLoggedIn &&
        rol !== 'admin' &&
        USER_NAV_ITEMS.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `${commonClasses} text-pink-500 hover:text-pink-600 ${
                isActive ? 'font-semibold' : ''
              }`
            }
          >
            {label}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </NavLink>
        ))}

      {/* Enlaces admin */}
      {rol === 'admin' && (
        <>
          <span className="text-slate-400">|</span>
          {ADMIN_NAV_ITEMS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${commonClasses} text-amber-600 hover:text-amber-700 font-semibold ${
                  isActive ? 'border-b-2 border-amber-500' : ''
                }`
              }
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </NavLink>
          ))}
        </>
      )}
    </nav>
  );
};

export default Navigation;
