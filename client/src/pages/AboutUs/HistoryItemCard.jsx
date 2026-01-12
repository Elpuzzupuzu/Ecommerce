import React from "react";
import HistoryItemCard from "./HistoryItemCard";

const HistorySection = ({
  historyItems = [],
  getAnimationClass = () => "",
  UsersIcon,
}) => (
  <section className="bg-white py-24 px-6 relative">
    {/* Separador superior */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div
        className={`text-center mb-20 ${getAnimationClass("history")}`}
        data-animate
        id="history"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
          Cómo creció nuestro marketplace
        </h2>
        <div className="w-16 h-0.5 bg-blue-900 mx-auto mb-6" />
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          De una tienda online especializada a una plataforma con miles de
          productos, vendedores y clientes activos cada día.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Timeline */}
        <div className="space-y-6">
          {historyItems.map((item, index) => (
            <HistoryItemCard
              key={item.id || item.title}
              {...item}
              animationClass={getAnimationClass(
                `history-${index}`,
                "fade-in"
              )}
              id={`history-${index}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            />
          ))}
        </div>

        {/* Info lateral */}
        <div className="space-y-6 lg:sticky lg:top-24">
          {[
            {
              title: "Nuestros Compradores",
              description:
                "Millones de usuarios confían en nuestra plataforma para encontrar productos al mejor precio, con envíos rápidos y soporte confiable.",
            },
            {
              title: "Nuestros Vendedores",
              description:
                "Marcas y emprendedores que escalan sus negocios vendiendo a nivel nacional a través de nuestra infraestructura.",
            },
          ].map((card, idx) => (
            <div
              key={card.title}
              className={`bg-white border border-gray-200 rounded-lg p-8 hover:border-blue-900 transition-all duration-300 hover:shadow-md ${
                idx === 0 ? getAnimationClass("side-cards", "scale-in") : ""
              }`}
              data-animate
            >
              <div className="flex items-start">
                {UsersIcon && (
                  <div className="w-14 h-14 bg-blue-900 rounded flex items-center justify-center mr-5 flex-shrink-0">
                    <UsersIcon className="w-7 h-7 text-white" />
                  </div>
                )}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h4>
                  <div className="w-10 h-0.5 bg-blue-600 mb-3" />
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Métrica fuerte */}
          <div className="bg-gray-900 rounded-lg p-8 text-white text-center">
            <div className="text-4xl font-bold mb-2">10M+</div>
            <div className="text-gray-300 text-sm font-medium uppercase tracking-wide">
              Pedidos procesados
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Separador inferior */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
  </section>
);

export default HistorySection;
