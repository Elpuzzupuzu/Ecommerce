import React from 'react';
import { Truck, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

// CategoryCard
const CategoryCard = ({ title, image, link }) => {
  return (
    <Link
      to={link}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <span className="absolute bottom-4 left-4 text-white text-lg font-semibold drop-shadow">
          {title}
        </span>
      </div>
    </Link>
  );
};

// CategoryGrid
function CategoryGrid() {

  // Ahora usando links directos a imágenes
  const categories = [
    {
      title: 'Novedades',
      image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
      link: '/catalogo?novedades=true'
    },
    {
      title: 'Más Vendidos',
      image: 'https://images.unsplash.com/photo-1591012911200-42f792f7e715?auto=format&fit=crop&w=800&q=80',
      link: '/catalogo?mas-vendidos=true'
    },
    {
      title: 'Regalos y Detalles',
      image: 'https://images.unsplash.com/photo-1567016543113-95d0c9756e50?auto=format&fit=crop&w=800&q=80',
      link: '/catalogo?regalos=true'
    },
    {
      title: 'Colecciones Especiales',
      image: 'https://images.unsplash.com/photo-1556910103-1e0b2dffeb59?auto=format&fit=crop&w=800&q=80',
      link: '/catalogo?colecciones=true'
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <div className="w-1 h-6 bg-gray-900 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Explora nuestra tienda
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Encuentra lo que estás buscando
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto md:mx-0">
            Descubre una selección de productos pensados para cada ocasión.
            Compra de forma rápida, segura y desde un solo lugar.
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              title={category.title}
              image={category.image}
              link={category.link}
            />
          ))}
        </div>

        {/* CTA general */}
        <div className="text-center mb-16">
          <Link 
            to="/catalogo"
            className="px-10 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-md"
          >
            Ver Todos los Productos
          </Link>
        </div>

        {/* Beneficios Ecommerce */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-200">
          
          <div className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <Truck className="w-6 h-6 text-gray-800" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Envíos a Todo el País
            </h4>
            <p className="text-gray-600 text-sm">
              Recibe tus pedidos de forma rápida y segura.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <ShieldCheck className="w-6 h-6 text-gray-800" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Compra Protegida
            </h4>
            <p className="text-gray-600 text-sm">
              Pagos seguros y experiencia confiable.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <ShoppingBag className="w-6 h-6 text-gray-800" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Productos Seleccionados
            </h4>
            <p className="text-gray-600 text-sm">
              Calidad, diseño y tendencia en un solo lugar.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
