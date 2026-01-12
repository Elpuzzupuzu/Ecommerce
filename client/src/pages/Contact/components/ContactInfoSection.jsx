// src/components/contact/ContactInfoSection.jsx

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactInfoCard from "./ContactInfoCard";

/* Animación del contenedor */
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

/* Animación del texto */
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ContactInfoSection = () => (
  <motion.div
    className="bg-white p-8 md:p-10 rounded-xl shadow-2xl shadow-gray-300/50 border border-gray-100"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={cardVariants}
  >
    {/* Título */}
    <motion.h2
      className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight"
      variants={itemVariants}
    >
      Información de Contacto
    </motion.h2>

    {/* Descripción */}
    <motion.p
      className="text-gray-700 text-base md:text-lg leading-relaxed mb-8"
      variants={itemVariants}
    >
      Nuestro equipo de atención está disponible para ayudarte con pedidos,
      cotizaciones, envíos o cualquier duda sobre nuestros productos.
    </motion.p>

    <div className="space-y-6">
      {/* Email */}
      <ContactInfoCard
        Icon={Mail}
        title="Correo electrónico"
        value="soporte@tienda-demo.com"
        href="mailto:soporte@tienda-demo.com"
        itemDelay={0}
      />

      {/* Teléfono ficticio */}
      <ContactInfoCard
        Icon={Phone}
        title="Teléfono de atención"
        value="+52 (55) 1234 5678"
        href="tel:+525512345678"
        itemDelay={0.15}
      />

      {/* Dirección ficticia */}
      <ContactInfoCard
        Icon={MapPin}
        title="Oficina principal"
        value="Av. Comercio Digital 123, Col. Centro Empresarial, Ciudad Demo, México. C.P. 01010"
        itemDelay={0.3}
      />
    </div>
  </motion.div>
);

export default ContactInfoSection;
