import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, MapPin, Menu } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/user/usersSlice';

import Navigation from '../Navigation/Navigation';
import Search from './Search/Search';
import LogoCompleto from '../../assets/images/logo2.png';
import UserDropdown from './Search/userDropdown';

const Header = ({ onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [previousCartCount, setPreviousCartCount] = useState(0);
  const [showAddedBadge, setShowAddedBadge] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const rol = useSelector((state) => state.user.user?.rol);
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  const isLoggedIn = !!user;
  const userName =
    user?.name ||
    user?.nombre ||
    user?.correo ||
    user?.email ||
    'Usuario';
  const userProfile = user?.foto_perfil;

  const handleLogout = () => dispatch(logoutUser());

  useEffect(() => {
    setPreviousCartCount(prev => {
      if (totalCartItems > prev) {
        setIsCartAnimating(true);
        setShowAddedBadge(true);
        setTimeout(() => setIsCartAnimating(false), 600);
        setTimeout(() => setShowAddedBadge(false), 1500);
      }
      return totalCartItems;
    });
  }, [totalCartItems]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 bg-white border-b border-slate-200 shadow-sm z-50">

        {/* Top bar */}
        <div className="bg-gradient-to-r from-white via-[#fff5fa] to-white">
          <div className="max-w-[1500px] mx-auto px-4 py-3 flex items-center gap-4">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group cursor-pointer">
              <img
                src={LogoCompleto}
                alt="MimitoShop"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Ubicación */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 transition cursor-pointer border border-transparent hover:border-slate-300">
              <MapPin className="w-5 h-5 text-pink-500" />
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">Enviar a</span>
                <span className="text-sm font-semibold text-slate-900">
                  Mérida, Yucatán
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-3xl">
              <div className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200">
                <Search />
              </div>
            </div>

            {/* Right section */}
            <div className="hidden lg:flex items-center gap-2">

              <UserDropdown
                userName={userName}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                rol={rol}
                profilePicture={userProfile}
              />

              <div className="px-3 py-2 rounded-md hover:bg-slate-100 transition cursor-pointer border border-transparent hover:border-slate-300">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Mis</span>
                  <span className="text-sm font-semibold text-slate-900">Pedidos</span>
                </div>
              </div>

              {/* Cart */}
              <button
                onClick={onCartToggle}
                className={`relative group px-3 py-2 rounded-md hover:bg-slate-100 transition border border-transparent flex items-center gap-2 ${
                  isCartAnimating ? 'animate-bounce border-green-400/50 bg-green-500/10' : ''
                }`}
              >
                {isCartAnimating && (
                  <div className="absolute inset-0 bg-green-400/20 rounded-md animate-ping"></div>
                )}
                <div className="relative">
                  <ShoppingCart
                    className={`w-8 h-8 transition-colors ${
                      isCartAnimating ? 'text-green-500' : 'text-slate-900 group-hover:text-pink-500'
                    }`}
                  />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[11px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                      {totalCartItems}
                    </span>
                  )}
                  {showAddedBadge && (
                    <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce shadow border border-white/30">
                      +
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-slate-500">Carrito</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {totalCartItems > 0 ? `${totalCartItems} items` : '0'}
                  </span>
                </div>
              </button>
            </div>

            {/* Mobile icons */}
            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <button onClick={onCartToggle} className="relative p-2 rounded-md hover:bg-slate-100 transition">
                <ShoppingCart className="w-6 h-6 text-slate-900" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                    {totalCartItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-md hover:bg-slate-100 transition"
              >
                <Menu className="w-6 h-6 text-slate-900" />
              </button>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <div className="hidden lg:block bg-slate-50 border-t border-slate-200">
          <div className="max-w-[1500px] mx-auto px-4">
            <Navigation rol={rol} isLoggedIn={isLoggedIn} />
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden bg-white px-4 pb-3 border-t border-slate-200">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <Search />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 bg-white w-72 max-w-[85vw] shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 flex items-center justify-between border-b border-slate-200">
              <span className="text-slate-900 font-semibold">Menú</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition active:scale-95"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-5">
              <Navigation
                isMobile
                onLinkClick={() => setIsMenuOpen(false)}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                rol={rol}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
