import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
  ];

  return (
    <footer className="bg-slate-100 text-slate-700 relative overflow-hidden border-t border-slate-200">
      {/* Decoración sutil */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-fuchsia-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Branding */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
              MimitoShop
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tu tienda favorita para descubrir productos únicos, lindos y llenos de estilo.
              Compras fáciles, seguras y con mucho amor.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-base font-bold mb-4 text-slate-900 relative">
              Contáctanos
              <div className="absolute -bottom-2 left-0 w-10 h-0.5 bg-pink-500"></div>
            </h3>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-pink-500 mt-1" />
                <p>
                  Avenida Creativa 123<br />
                  Distrito Digital, Ciudad Rosa
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-pink-500" />
                <p>hola@mimitoshop.com</p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-pink-500" />
                <p>+00 123 456 7890</p>
              </div>
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-base font-bold mb-4 text-slate-900 relative">
              Enlaces Rápidos
              <div className="absolute -bottom-2 left-0 w-10 h-0.5 bg-pink-500"></div>
            </h3>

            <ul className="space-y-2 text-sm">
              {['Tienda', 'Novedades', 'Sobre MimitoShop', 'Preguntas Frecuentes', 'Contacto'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-pink-600 hover:translate-x-1 transition-all inline-block"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h3 className="text-base font-bold mb-4 text-slate-900 relative">
              Síguenos
              <div className="absolute -bottom-2 left-0 w-10 h-0.5 bg-pink-500"></div>
            </h3>

            <div className="flex space-x-3 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all border border-slate-200 shadow-sm"
                  aria-label={link.name}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>

            <p className="text-slate-500 text-xs">
              Síguenos para promociones, lanzamientos y sorpresas ✨
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-400/40 to-transparent mb-4"></div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-2 md:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} MimitoShop. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-pink-600 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-pink-600 transition-colors">Términos</a>
            <a href="#" className="hover:text-pink-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
