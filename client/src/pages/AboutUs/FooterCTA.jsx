import React from "react";

const FooterCTA = ({ getAnimationClass = () => "", ArrowRightIcon }) => (
  <section className="bg-blue-900 py-20 px-6 relative">
    
    {/* Línea superior */}
    <div className="absolute top-0 left-0 right-0 h-px bg-white/20"></div>

    <div className="max-w-5xl mx-auto text-center relative">
      <div
        className={`text-white ${getAnimationClass("cta")}`}
        data-animate
        id="cta"
      >
        {/* Headline orientado a conversión */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Compra con confianza y recibe asesoría experta
        </h2>

        {/* Separador */}
        <div className="w-16 h-0.5 bg-white/70 mx-auto mb-6"></div>

        {/* Subheadline */}
        <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Miles de clientes ya confían en nosotros para soluciones hidráulicas
          seguras, duraderas y con soporte real.
        </p>

        {/* CTA principal */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contacto"
            className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold bg-white text-blue-900 rounded hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            Cotiza ahora
            {ArrowRightIcon && (
              <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            )}
          </a>

          <a
            href="tel:+529991234567"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold border border-white/60 text-white rounded hover:bg-white/10 transition-all duration-300"
          >
            Llamar ahora
          </a>
        </div>

        {/* Confianza + contacto */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/70 text-sm mb-2">
            Atención personalizada • Soporte real • Respuesta rápida
          </p>
          <p className="text-white text-xl font-semibold">
            +52 (999) 123-4567
          </p>
        </div>
      </div>
    </div>

    {/* Línea inferior */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
  </section>
);

export default FooterCTA;
