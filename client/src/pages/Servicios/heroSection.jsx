const HeroSection = () => {
  return (
    <section
      className="w-full relative overflow-hidden py-20 bg-[#F7F8FA]"
    >
      {/* Fondos decorativos */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6">

          {/* TEXTO */}
          <div className="animate-fade-in visible">
            <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-orange-600 bg-orange-100 rounded-full">
              Compras rápidas y seguras
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Todo lo que necesitas, <br />
              <span className="text-orange-600">entregado a tu puerta</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Descubre millones de productos en tecnología, hogar, moda y más.
              Precios competitivos, envíos rápidos y devoluciones sin complicaciones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold bg-orange-600 hover:bg-orange-700 rounded-lg transition shadow-lg"
              >
                Comprar ahora
              </a>

              <a
                href="https://www.amazon.com/gp/help/customer/display.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg transition"
              >
                Ver cómo funciona
              </a>
            </div>
          </div>

          {/* IMAGEN */}
          <div className="animate-fade-in visible">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1585386959984-a41552231693"
                alt="Ecommerce products"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Badge flotante */}
              <div className="absolute bottom-6 left-6 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold text-gray-800">
                ⭐ Más de 1M de clientes satisfechos
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Animación */}
      <style>{`
        .animate-fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-out;
        }

        .animate-fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
