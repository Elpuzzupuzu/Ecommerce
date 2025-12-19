import React from 'react';
// 1. Importar la imagen del banner desde la carpeta assets
import bannerImage from '../../../../assets/images/imgs/bannerprofile.jpg'; // **Ajusta la ruta según tu estructura de carpetas**

// ProfileHeader Component
const ProfileHeader = ({ user }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Banner de Imagen */}
      {/* 2. Reemplazar el div de fondo con una etiqueta <img> */}
      <img
        src={bannerImage}
        alt="User Profile Banner"
        className="absolute inset-0 w-full h-56 object-cover rounded-3xl"
        style={{ zIndex: 0 }} // Asegura que la imagen esté detrás del contenido
      />

      {/* Una superposición sutil para asegurar la legibilidad del texto superior si es necesario */}
      <div className="absolute inset-0 h-56 bg-black/10 rounded-3xl" style={{ zIndex: 1 }}></div>


      {/* Profile Content */}
      <div className="relative pt-16 px-8 pb-8" style={{ zIndex: 2 }}> {/* Asegura que el contenido esté encima */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8">
          
          {/* Avatar con modern styling */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
            <img
              src={user?.foto_perfil || '/avatar-placeholder.png'}
              alt={`${user?.name || 'User'} profile`}
              className="relative w-44 h-44 rounded-3xl object-cover shadow-2xl border-4 border-white"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1 pb-2">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                {user?.name || `${user?.nombre} ${user?.apellido}`}
              </h1>

              {user?.isAdmin && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-indigo-500/30">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  ADMIN
                </span>
              )}
            </div>

            <p className="text-white mb-6 text-lg capitalize font-medium">
              {user?.rol}
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="group relative px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="relative z-10">Follow</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-900 rounded-xl font-semibold hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get in touch
              </button>
            </div>
          </div>

          {/* Stats with modern cards */}
          <div className="flex gap-6 pb-2">
            <div className="group text-center px-6 py-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Followers</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                2,985
              </p>
            </div>

            <div className="group text-center px-6 py-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Following</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                132
              </p>
            </div>

            <div className="group text-center px-6 py-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Likes</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-pink-600 to-red-600 bg-clip-text text-transparent">
                548
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;