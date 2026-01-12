// src/components/contact/ContactForm.jsx
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

/* Animación del contenedor */
const formVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ContactForm = ({
  formData,
  submissionStatus,
  loading,
  handleChange,
  handleSubmit,
}) => {
  return (
    <motion.div
      className="bg-white p-8 md:p-10 rounded-xl border border-gray-200 shadow-xl shadow-gray-300/40"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={formVariants}
    >
      {/* Título */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight"
        variants={itemVariants}
      >
        Contáctanos
      </motion.h2>

      {/* Subtítulo */}
      <motion.p
        className="text-gray-600 text-base md:text-lg mb-8"
        variants={itemVariants}
      >
        ¿Tienes dudas sobre un producto, envío o cotización? Nuestro equipo te
        responde rápidamente.
      </motion.p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <motion.div variants={itemVariants}>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej. Juan Pérez"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800
              focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20
              transition-all duration-200"
          />
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800
              focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20
              transition-all duration-200"
          />
        </motion.div>

        {/* Mensaje */}
        <motion.div variants={itemVariants}>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Cuéntanos qué necesitas o qué producto te interesa…"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 resize-none
              focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20
              transition-all duration-200"
          />
        </motion.div>

        {/* Botón */}
        <motion.button
          type="submit"
          disabled={loading}
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 bg-[#1E3A8A] text-white
            font-semibold text-base py-4 rounded-lg shadow-lg
            hover:bg-[#162c6e] hover:shadow-xl transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Enviando…
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar mensaje
            </>
          )}
        </motion.button>

        {/* Success */}
        {submissionStatus === "success" && (
          <motion.div
            className="flex items-start gap-3 p-4 bg-green-50 border border-green-300 rounded-lg text-green-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-sm font-medium">
              Mensaje enviado correctamente. Nuestro equipo te responderá en
              breve.
            </p>
          </motion.div>
        )}

        {/* Error */}
        {submissionStatus === "error" && (
          <motion.div
            className="flex items-start gap-3 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-sm font-medium">
              No se pudo enviar el mensaje. Intenta nuevamente en unos momentos.
            </p>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;
