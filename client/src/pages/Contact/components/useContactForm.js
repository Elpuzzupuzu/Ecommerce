// src/hooks/useContactForm.js
import { useState } from "react";

/* Endpoint relativo */
const CONTACT_PATH = "/contact/submit";

/* ===========================
   Validación frontend
=========================== */
const validateForm = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  }

  if (!data.email.trim()) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "El correo electrónico no es válido.";
  }

  if (!data.message.trim()) {
    errors.message = "El mensaje no puede estar vacío.";
  }

  return errors;
};

/* ===========================
   Hook principal
=========================== */
const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // idle | loading | success | error
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  /* Limpia feedback visual luego de unos segundos */
  const clearFeedback = () => {
    setTimeout(() => {
      setSubmissionStatus("idle");
      setFormErrors({});
    }, 5000);
  };

  /* Manejo de cambios */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpia el error del campo al escribir
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* Envío del formulario */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* 1. Validación */
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmissionStatus("error");
      clearFeedback();
      return;
    }

    /* 2. Preparar envío */
    setLoading(true);
    setSubmissionStatus("loading");
    setFormErrors({});

    const BASE_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

    const API_ENDPOINT = `${BASE_URL}${CONTACT_PATH}`;

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData?.message || "No se pudo enviar el mensaje."
        );
      }

      /* 3. Éxito */
      setSubmissionStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error.message);
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
      clearFeedback();
    }
  };

  return {
    formData,
    submissionStatus,
    loading,
    formErrors,
    handleChange,
    handleSubmit,
  };
};

export default useContactForm;
