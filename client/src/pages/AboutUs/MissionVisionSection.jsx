import React from "react";

const MissionVisionSection = ({
  values = [],
  getAnimationClass = () => "",
  AwardIcon,
  TrendingUpIcon,
  StarIcon,
  CheckCircleIcon,
}) => (
  <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative">
    {/* Línea decorativa superior */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF9900] to-transparent opacity-30"></div>

    <div className="max-w-7xl mx-auto relative">
      {/* Título */}
      <div
        className={`text-center mb-20 ${getAnimationClass("mission")}`}
        data-animate
        id="mission"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
          Nuestro compromiso contigo
        </h2>
        <div className="w-16 h-0.5 bg-[#FF9900] mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
          Trabajamos cada día para ofrecer una experiencia de compra simple,
          rápida y confiable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        {/* Compromiso (antes Misión) */}
        <div
          className={`bg-white rounded-lg p-12 border border-gray-200 hover:border-[#FF9900] transition-all duration-300 hover:shadow-xl ${getAnimationClass(
            "missionCard",
            "scale-in"
          )}`}
          data-animate
          id="missionCard"
        >
          <div className="flex items-start mb-6">
            {AwardIcon && (
              <div className="w-12 h-12 bg-[#FF9900] rounded flex items-center justify-center mr-5 flex-shrink-0">
                <AwardIcon className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                Lo que ofrecemos
              </h3>
              <div className="w-12 h-0.5 bg-[#FF9900]"></div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-base mb-8 font-light">
            Facilitar el acceso a millones de productos con precios competitivos,
            entregas rápidas y un servicio al cliente en el que puedas confiar,
            desde la compra hasta la devolución.
          </p>

          <div className="space-y-3">
            {CheckCircleIcon &&
              [
                "Compra segura y protegida",
                "Envíos rápidos y confiables",
                "Atención al cliente 24/7",
                "Devoluciones simples",
              ].map((text, i) => (
                <div key={i} className="flex items-center text-gray-700">
                  <CheckCircleIcon className="w-5 h-5 text-[#FF9900] mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Visión */}
        <div
          className={`bg-white rounded-lg p-12 border border-gray-200 hover:border-[#FF9900] transition-all duration-300 hover:shadow-xl ${getAnimationClass(
            "visionCard",
            "scale-in"
          )}`}
          data-animate
          id="visionCard"
        >
          <div className="flex items-start mb-6">
            {TrendingUpIcon && (
              <div className="w-12 h-12 bg-[#FF9900] rounded flex items-center justify-center mr-5 flex-shrink-0">
                <TrendingUpIcon className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                Hacia dónde vamos
              </h3>
              <div className="w-12 h-0.5 bg-[#FF9900]"></div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-base mb-8 font-light">
            Convertirnos en la plataforma de compras preferida, conectando a
            clientes y vendedores con tecnología, logística y una experiencia
            centrada en las personas.
          </p>

          <div className="space-y-3">
            {StarIcon &&
              [
                "Crecimiento constante",
                "Innovación en logística",
                "Experiencia centrada en el cliente",
                "Escala global",
              ].map((text, i) => (
                <div key={i} className="flex items-center text-gray-700">
                  <StarIcon className="w-5 h-5 text-[#FF9900] mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>

    {/* Línea decorativa inferior */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF9900] to-transparent opacity-30"></div>
  </section>
);

export default MissionVisionSection;
