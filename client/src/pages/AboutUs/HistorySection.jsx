import React from "react";
import HistoryItemCard from "./HistoryItemCard";

const HistorySection = ({
  historyItems = [],
  getAnimationClass = () => "",
  UsersIcon,
}) => (
  <section className="bg-white py-24 px-6 relative">
    {/* Línea decorativa superior */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

    <div className="max-w-7xl mx-auto">
      {/* Título */}
      <div
        className={`text-center mb-20 ${getAnimationClass("history")}`}
        data-animate
        id="history"
      >
        <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight text-gray-900">
          Creciendo contigo
        </h2>

        <div className="w-16 h-0.5 bg-[#FF9900] mx-auto mb-6"></div>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
          Una plataforma que evoluciona cada día para ofrecer más productos,
          mejores precios y una experiencia de compra confiable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Línea de crecimiento / hitos */}
        <div className="space-y-6">
          {historyItems.map((item, index) => (
            <HistoryItemCard
              key={item.id || `${item.title}-${index}`}
              {...item}
              animationClass={getAnimationClass(
                `history-${item.id || index}`
              )}
              id={`history-${item.id || index}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>

        {/* Confianza y escala */}
        <div className="space-y-6 lg:sticky lg:top-24">
          {[
            {
              title: "Nuestros inicios",
              description:
                "Comenzamos con una idea simple: facilitar las compras online con precios justos y entregas confiables.",
            },
            {
              title: "La plataforma hoy",
              description:
                "Miles de vendedores, millones de productos y clientes que confían en nosotros todos los días.",
            },
          ].map((card, idx) => (
            <div
              key={card.title}
              className={`bg-white border border-gray-200 rounded-lg p-8 hover:border-[#FF9900] transition-all duration-300 hover:shadow-lg ${
                idx === 0 ? getAnimationClass("images", "scale-in") : ""
              }`}
              data-animate
              id={idx === 0 ? "images" : undefined}
            >
              <div className="flex items-start">
                {UsersIcon && (
                  <div className="w-16 h-16 bg-[#FF9900] rounded flex items-center justify-center mr-6 flex-shrink-0">
                    <UsersIcon className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h4>
                  <div className="w-12 h-0.5 bg-[#FF9900] mb-3"></div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Card de impacto / métricas */}
          <div className="bg-gradient-to-br from-[#FF9900] to-[#e88b00] rounded-lg p-8 text-white text-center">
            <div className="text-4xl font-bold mb-2">1M+</div>
            <div className="text-orange-100 text-sm font-medium uppercase tracking-wide">
              Clientes activos
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Línea decorativa inferior */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  </section>
);

export default HistorySection;
