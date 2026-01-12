import React from "react";
import TestimonialCard from "./TestimonialCard";
import { Star, ShieldCheck, Truck } from "lucide-react";

const TestimonialsSection = ({ testimonials = [], getAnimationClass = () => "" }) => (
  <section className="bg-gradient-to-b from-gray-50 to-white py-24 px-6 relative">
    
    {/* Línea superior */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

    <div className="max-w-7xl mx-auto">
      
      {/* Header */}
      <div
        className={`text-center mb-16 ${getAnimationClass("testimonials")}`}
        data-animate
        id="testimonials"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Opiniones de Clientes
        </h2>

        <div className="flex items-center justify-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
          ))}
          <span className="text-sm font-medium text-gray-700">
            4.9 de 5 basado en clientes reales
          </span>
        </div>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Clientes reales que ya compraron y recomiendan nuestros productos y servicios
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={getAnimationClass(`testimonial-${index}`, "fade-in-up")}
            data-animate
            id={`testimonial-${index}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-16 pt-16 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-10 h-10 text-blue-900 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">
              Compras Seguras
            </h4>
            <p className="text-sm text-gray-600">
              Pagos protegidos y datos cifrados
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Truck className="w-10 h-10 text-blue-900 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">
              Entrega Confiable
            </h4>
            <p className="text-sm text-gray-600">
              Cumplimos tiempos y calidad
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Star className="w-10 h-10 text-blue-900 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">
              Clientes Satisfechos
            </h4>
            <p className="text-sm text-gray-600">
              Miles de reseñas positivas
            </p>
          </div>

        </div>
      </div>
    </div>

    {/* Línea inferior */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  </section>
);

export default TestimonialsSection;
