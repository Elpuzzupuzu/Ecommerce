import React from "react";

/* =========================
   CARD DE CATEGORÍA
========================= */
const ExpertiseCard = ({
  title,
  description,
  image,
  animationClass,
  id,
  style,
}) => (
  <div
    id={id}
    className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${animationClass}`}
    data-animate
    style={style}
  >
    {/* Imagen */}
    <div className="relative h-64 overflow-hidden bg-slate-200">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    </div>

    {/* Contenido */}
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <h3 className="text-2xl font-bold mb-2 group-hover:text-[#FF9900] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-200 leading-relaxed line-clamp-2">
        {description}
      </p>
      <div className="mt-4 inline-block">
        <div className="w-12 h-1 bg-gradient-to-r from-[#FF9900] to-[#e88b00] rounded-full group-hover:w-16 transition-all"></div>
      </div>
    </div>

    {/* Overlay hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#FF9900]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
);

/* =========================
   SECCIÓN DE CATEGORÍAS
========================= */
const ExpertiseAreasSection = ({
  expertiseAreas = [],
  getAnimationClass = (key, fallback = "fade-in") => fallback,
}) => {
  /* Categorías por defecto (Marketplace) */
  const defaultExpertiseAreas = [
    {
      title: "Tecnología y Electrónica",
      description:
        "Smartphones, laptops, audífonos y los gadgets más populares.",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200",
    },
    {
      title: "Hogar y Cocina",
      description:
        "Electrodomésticos, decoración y todo para tu día a día.",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200",
    },
    {
      title: "Moda y Accesorios",
      description:
        "Ropa, calzado y accesorios para toda la familia.",
      image:
        "https://images.unsplash.com/photo-1521334884684-d80222895322?w=1200",
    },
    {
      title: "Belleza y Cuidado Personal",
      description:
        "Productos esenciales para tu rutina diaria.",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200",
    },
    {
      title: "Herramientas y Jardín",
      description:
        "Todo para proyectos, reparaciones y mejoras del hogar.",
      image:
        "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?w=1200",
    },
    {
      title: "Ofertas del Día",
      description:
        "Descuentos exclusivos en productos seleccionados.",
      image:
        "https://images.unsplash.com/photo-1607082349566-1870b0b41f38?w=1200",
    },
  ];

  const areas = expertiseAreas.length > 0 ? expertiseAreas : defaultExpertiseAreas;

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 ${getAnimationClass("expertise")}`}
          data-animate
          id="expertise"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900">
            Categorías destacadas
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF9900] to-[#e88b00] mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explora nuestras categorías más populares y encuentra lo que necesitas en segundos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <ExpertiseCard
              key={area.title}
              {...area}
              animationClass={getAnimationClass(`area-${index}`, "scale-in")}
              id={`area-${index}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseAreasSection;
