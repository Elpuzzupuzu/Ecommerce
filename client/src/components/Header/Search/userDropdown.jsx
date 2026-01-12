import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  LogIn,
  User,
  Power,
  List,
  Truck,
  UserPlus,
  FileText,
} from "lucide-react";

const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  let initials = "";

  if (parts.length > 0) initials += parts[0].charAt(0).toUpperCase();
  if (parts.length > 1) initials += parts[1].charAt(0).toUpperCase();
  else if (initials.length === 1 && name.length > 1)
    initials += name.charAt(1).toUpperCase();

  return initials.substring(0, 2);
};

const UserDropdown = ({
  userName: reduxUserName,
  isLoggedIn: reduxLoggedIn,
  onLogout,
  rol,
  profilePicture: reduxProfilePicture,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const userName = reduxUserName || "Usuario";
  const profilePicture = reduxProfilePicture;
  const isLoggedIn = reduxLoggedIn;

  const userInitials = useMemo(() => getInitials(userName), [userName]);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };
  const handleLinkClick = () => setIsOpen(false);

  const TriggerContent = () => (
    <div className="flex items-center space-x-2">
      {isLoggedIn && (
        <>
          {profilePicture ? (
            <img
              src={profilePicture}
              alt={`${userName}'s profile`}
              className="w-8 h-8 rounded-full object-cover border-2 border-slate-300 shadow-sm"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center bg-slate-200 text-slate-800 font-bold text-sm rounded-full shadow-inner">
              {userInitials}
            </div>
          )}
        </>
      )}
      <div className="flex flex-col leading-none">
        <span className="text-xs text-slate-500">
          Hola, {isLoggedIn ? userName.split(" ")[0] : "visitante"}
        </span>
        <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">
          {isLoggedIn ? "Tu Cuenta" : "Identifícate"}
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="relative flex items-center h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`p-2 rounded-md transition-all cursor-pointer ${
          isOpen
            ? "bg-slate-100 border border-slate-300"
            : "border border-transparent hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        <TriggerContent />
      </div>

      {isOpen && (
        <div
          className={`absolute top-[calc(100%-5px)] right-0 bg-white shadow-xl border border-slate-200 p-4 z-40 transform origin-top-right ${
            isLoggedIn ? "w-[450px] rounded-xl" : "w-[400px] rounded-lg"
          }`}
        >
          {/* Flecha */}
          <div className="absolute -top-3 right-6 w-4 h-4 bg-white transform rotate-45 border-t border-l border-slate-200"></div>

          {!isLoggedIn ? (
            <div className="flex flex-col items-center p-2">
              <p className="text-sm text-slate-600 mb-3">
                Accede o regístrate para una mejor experiencia.
              </p>

              <Link
                to="/login"
                onClick={handleLinkClick}
                className="w-full text-center bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <LogIn size={20} /> Iniciar Sesión
              </Link>

              <Link
                to="/register"
                onClick={handleLinkClick}
                className="w-full text-center mt-2 text-sm text-pink-600 hover:text-pink-700 flex items-center justify-center gap-1"
              >
                <UserPlus size={16} /> Crear una cuenta
              </Link>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-extrabold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                ¡Bienvenido, {userName.split(" ")[0]}!
              </h3>

              <div className="flex justify-between gap-8">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-700 mb-2 text-sm uppercase tracking-wider">
                    Tu Cuenta
                  </h4>
                  <ul className="space-y-2">
                    <LinkItem to="/mi-cuenta" onClick={handleLinkClick} Icon={User}>
                      Mi Perfil
                    </LinkItem>
                    <LinkItem to="/listas/crear" onClick={handleLinkClick} Icon={List}>
                      Mis Listas de Deseos
                    </LinkItem>
                    <LinkItem
                      to="/mi-cuenta/mis-facturas"
                      onClick={handleLinkClick}
                      Icon={FileText}
                    >
                      Mis Facturas
                    </LinkItem>
                  </ul>
                </div>

                <div className="w-px bg-slate-200"></div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-700 mb-2 text-sm uppercase tracking-wider">
                    Pedidos y Acciones
                  </h4>
                  <ul className="space-y-2">
                    <LinkItem to="/pedidos" onClick={handleLinkClick} Icon={Truck}>
                      Historial de Pedidos
                    </LinkItem>
                    <li className="text-sm">
                      <button
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-3 py-1 w-full text-left font-medium hover:bg-red-50 rounded-md px-2 -mx-2"
                      >
                        <Power size={18} className="text-red-500" />
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const LinkItem = ({ to, onClick, Icon, children }) => (
  <li className="text-sm group">
    <Link
      to={to}
      onClick={onClick}
      className="text-slate-700 hover:text-pink-600 transition-colors flex items-center gap-3 py-1 font-medium hover:bg-slate-100 rounded-md px-2 -mx-2"
    >
      <Icon
        size={18}
        className="text-slate-400 group-hover:text-pink-500 transition-colors"
      />
      {children}
    </Link>
  </li>
);

export default UserDropdown;
