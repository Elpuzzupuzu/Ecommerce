// useAccountInfoLogic.js
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../../../features/user/usersSlice";
import api from "../../../../api/axios";

/**
 * Hook personalizado para manejar la lógica de estado y guardado de la
 * información de la cuenta.
 * @param {object} user - El objeto de usuario actual.
 */
const useAccountInfoLogic = (user) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    phone: "",
    location: "",
    foto_perfil: "", // URL REAL (backend)
  });

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // ===============================
  // Cargar datos iniciales (Efecto)
  // ===============================
  useEffect(() => {
    if (!user) return;

    setFormData({
      nombre: user.nombre || "",
      apellido: user.apellido || "",
      phone: user.phone || "",
      location: user.location || "",
      foto_perfil: user.foto_perfil || "",
    });

    // Establece la URL de la imagen para la vista previa inicial
    setPreviewImage(user.foto_perfil || "");
    setFile(null); // Resetea el archivo seleccionado
  }, [user]);

  // ===============================
  // Handlers
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    // Crea una URL local para la vista previa
    setPreviewImage(URL.createObjectURL(selected));
  };

  // ===============================
  // Guardar perfil (Lógica principal)
  // ===============================
  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      let fotoPerfilUrl = formData.foto_perfil;

      // 1️⃣ Subir imagen solo si se seleccionó un nuevo archivo
      if (file) {
        const imageForm = new FormData();
        // El nombre del campo "imagen" debe coincidir con lo que espera tu API
        imageForm.append("imagen", file); 

        // NOTA: Si esta API es solo para subir imágenes de perfil,
        // considera crear una ruta más específica como /users/upload-profile-image
        const response = await api.post(
          "/products/upload-image", 
          imageForm
        );

        fotoPerfilUrl = response.data.imageUrl;
      }

      // 2️⃣ Payload FINAL para el slice (siempre incluye la nueva URL o la existente)
      const payload = {
        ...formData,
        foto_perfil: fotoPerfilUrl,
      };

      // 3️⃣ Dispatch y espera de resultado
      await dispatch(updateUserProfile(payload)).unwrap();
      // Opcional: limpiar el archivo si el guardado fue exitoso
      setFile(null); 
    } catch (err) {
      console.error("❌ Error al actualizar perfil:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Error al actualizar perfil"
      );
    } finally {
      setSaving(false);
    }
  };

  // Retorna todo lo que el componente necesite
  return {
    formData,
    previewImage,
    saving,
    error,
    handleChange,
    handleImageChange,
    handleSave,
  };
};

export default useAccountInfoLogic;