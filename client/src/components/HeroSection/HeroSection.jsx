// src/components/hero/HeroSection.jsx
import { Link } from 'react-router-dom';

export default function HeroSection() {
  // Imagen de hero fija tipo e-commerce
  const heroImage = "https://images.unsplash.com/photo-1581291518835-5d5f7e14f7b7?auto=format&fit=crop&w=1470&q=80";

  return (
    <div className="relative w-full min-h-[450px] md:min-h-[550px] flex items-center overflow-hidden">
      
      {/* Imagen de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={heroImage} 
          alt="Productos destacados FLUCSA" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-transparent"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        <div className="max-w-2xl">
          
          {/* Título estilo e-commerce */}
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Todo lo que necesitas, <span className="text-cyan-400">lo encuentras en FLUCSA</span>
          </h1>

          {/* Subtítulo estilo venta de productos */}
          <p className="text-gray-200 text-base md:text-lg mb-8 leading-relaxed">
            Descubre nuestro catálogo de herramientas, ferretería, artículos de cocina, plomería y más. 
            <span className="text-cyan-300 font-medium"> Calidad garantizada, envío rápido y atención confiable para tu hogar y negocio.</span>
          </p>

          {/* Botones CTA */}
          <div className="flex flex-wrap gap-4 mb-8">
            
            {/* Botón Ver Ofertas */}
            <Link
              to="/catalogo"
              className="group relative inline-flex items-center justify-center px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
            >
              Ver Ofertas
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Botón Conócenos */}
            <Link 
              to="/acerca-de-nosotros"
              className="group relative inline-flex items-center justify-center px-8 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white font-semibold rounded-lg transition-all duration-300 gap-2"
            >
              Nuestra Tienda
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>

          {/* Características estilo e-commerce */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-200">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Envío rápido a todo el país</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Precios competitivos</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Productos garantizados y de calidad</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
