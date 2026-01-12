import React from 'react';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

const Location = () => {
  const companyInfo = {
    address: 'Avenida Central 245, Colonia Nueva Vista, Ciudad Aurora, CP 12345',
    phone: '+52 55 1234 5678',
    email: 'contacto@tutienda.com',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.7204000000003!2d-99.133208!3d19.432608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff0000000000%3A0x123456789abcdef!2sCentro%20Comercial!5e0!3m2!1ses!2smx!4v1700000000000',
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Dónde encontrarnos
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Estamos disponibles para ayudarte. Visítanos o contáctanos por el medio que prefieras.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Mapa */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 h-full shadow-sm">
              <iframe
                title="Ubicación de la tienda"
                src={companyInfo.mapEmbedUrl}
                className="w-full h-96 lg:h-full min-h-96"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Información */}
          <div className="order-1 lg:order-2 space-y-6">

            {/* Dirección */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-gray-200 transition-colors">
                <MapPin className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-900 mb-1 uppercase tracking-wide">
                  Dirección
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {companyInfo.address}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Teléfono */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-gray-200 transition-colors">
                <Phone className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-900 mb-1 uppercase tracking-wide">
                  Teléfono
                </h3>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Email */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-gray-200 transition-colors">
                <Mail className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-900 mb-1 uppercase tracking-wide">
                  Correo electrónico
                </h3>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  companyInfo.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto shadow-md"
              >
                <Navigation className="w-4 h-4" />
                Cómo llegar
              </a>
            </div>

            {/* Horario */}
            <div className="pt-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                  Horario de atención
                </h3>
                <p className="text-sm text-gray-600">
                  Lunes a Viernes: 9:00 AM – 6:00 PM
                </p>
                <p className="text-sm text-gray-600">
                  Sábados: 10:00 AM – 3:00 PM
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
