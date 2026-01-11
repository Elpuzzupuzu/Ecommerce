import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
  ];

  return (
    <footer className="bg-[#2b0f1f] text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-fuchsia-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">

          {/* Branding */}
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">
              MimitoShop
            </h2>
            <p className="text-pink-200 text-sm leading-relaxed">
              Tu tienda favorita para descubrir productos únicos, lindos y llenos de estilo.
              Compras fáciles, seguras y con mucho amor 💕
            </p>
          </div>

          {/* Contacto ficticio */}
          <div>
            <h3 className="text-lg font-bold mb-4 relative">
              Contáctanos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-pink-500"></div>
            </h3>

            <div className="space-y-3 text-sm text-pink-200">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-pink-400 mt-1" />
                <p>
                  Avenida Creativa 123<br />
                  Distrito Digital, Ciudad Rosa
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-pink-400" />
                <p>hola@mimitoshop.com</p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-pink-400" />
                <p>+00 123 456 7890</p>
              </div>
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-lg font-bold mb-4 relative">
              Enlaces Rápidos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-pink-500"></div>
            </h3>

            <ul className="space-y-2 text-sm">
              {['Tienda', 'Novedades', 'Sobre MimitoShop', 'Preguntas Frecuentes', 'Contacto'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-pink-200 hover:text-white hover:translate-x-1 transition-all inline-block"
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
            <h3 className="text-lg font-bold mb-4 relative">
              Síguenos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-pink-500"></div>
            </h3>

            <div className="flex space-x-3 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-pink-500 hover:scale-110 transition-all border border-white/20"
                  aria-label={link.name}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>

            <p className="text-pink-300 text-xs">
              Síguenos para promociones, lanzamientos y sorpresas ✨
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent mb-4"></div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-pink-300 space-y-2 md:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} MimitoShop. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
