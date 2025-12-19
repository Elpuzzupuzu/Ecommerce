import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Solo importamos las acciones necesarias que NO gestiona UserReviewsList
import { 
    fetchUserPurchaseHistory, 
    fetchUserWishlist,
    // fetchUserReviews ya no es necesario aquí si UserReviewsList es autónomo
} from '../../../features/user/usersSlice'; 

// Importación de componentes (UserReviewsList ya debe estar en index.js)
import { 
    ProfileHeader, 
    Tabs, 
    ProjectCard, 
    AccountInfo, 
    ChangePassword, 
    Orders, 
    Wishlist,
    UserReviewsList // <-- Componente Autónomo de Reviews
} from '../ProfileSection/components/index'; 

// Main ProfilePage
export default function ProfilePage() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('account');
    
    // ----------------------------------------------------
    // LÓGICA DE EXTRACCIÓN DEL USUARIO Y DATOS REALES DE REDUX
    // ----------------------------------------------------
    const { 
        user: reduxUser, 
        authChecked,
        loading, 
        purchaseHistory, 
        wishlist: reduxWishlist,
        // reviews: userReviews, <-- Ya no es necesario extraer las reviews aquí
    } = useSelector((state) => state.user);
    
    // Preparamos los arrays de datos
    const realOrders = purchaseHistory || []; 
    const realWishlist = reduxWishlist?.data || [];
    // const realReviews = userReviews || []; // <-- Ya no es necesario
    
    const user = reduxUser || {
        name: 'Usuario Invitado',
        role: 'Visitante',
        location: '',
        email: '',
        phone: '',
        id: null,
    };
    
    const handleRemoveFromWishlist = (itemId) => {
        if (reduxUser?.id) {
            console.log(`[PENDIENTE] Eliminando item ${itemId}...`);
            // dispatch(removeWishlistItem({ userId: reduxUser.id, itemId }));
        }
    };

    // ----------------------------------------------------
    // EFECTO PARA CARGAR DATOS ASÍNCRONOS POR PESTAÑA
    // ----------------------------------------------------
    useEffect(() => {
        if (!reduxUser?.id) return;

        // Carga de Historial de Compras
        if (activeTab === "orders") {
            dispatch(fetchUserPurchaseHistory(reduxUser.id));
        }

        // Carga de Lista de Deseos
        if (activeTab === "wishlist") {
            dispatch(fetchUserWishlist(reduxUser.id));
        }
        
    }, [activeTab, dispatch, reduxUser?.id]);


    // --- Manejo de la Carga de Autenticación y Sesión (sin cambios) ---
    if (!authChecked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 text-lg">Verificando sesión...</p>
            </div>
        );
    }

    if (!reduxUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-red-500 text-lg">Por favor, inicia sesión para ver tu perfil.</p>
            </div>
        );
    }

    // --- Datos de Mock restantes (sin cambios) ---
    const projects = [
        { id: 1, title: 'VPN Mobile App', category: 'Mobile UI, Research', likes: '517', views: '9.3k', bgColor: 'bg-gradient-to-br from-blue-200 to-blue-300', images: ['https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=400&fit=crop'] },
        { id: 2, title: 'Property Dashboard', category: 'Web interface', likes: '983', views: '14k', bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200', images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=250&fit-crop'], badges: [{ text: 'UI', color: 'bg-orange-500' }] },
        { id: 3, title: 'Healthcare Mobile App', category: 'Mobile UI, Branding', likes: '875', views: '13.5k', bgColor: 'bg-gradient-to-br from-blue-100 to-indigo-200', images: ['https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=400&fit-crop'], badges: [{ text: 'UI', color: 'bg-orange-500' }, { text: 'Br', color: 'bg-blue-500' }] }
    ];


    // Renderizado principal
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                
                {/* Profile Header */}
                <ProfileHeader user={user} />
                
                {/* Tabs */}
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                
                {/* Content */}
                <div className="p-8">
                    
                    {activeTab === 'work' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}
                    
                    {activeTab === 'account' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
                            <AccountInfo user={user} />
                            <ChangePassword />
                        </div>
                    )}
                    
                    {activeTab === 'orders' && (
                        <div className="max-w-3xl">
                            <Orders orders={realOrders} loading={loading} />
                        </div>
                    )}
                    
                    {activeTab === 'wishlist' && (
                        <div className="max-w-4xl">
                            <Wishlist 
                                items={realWishlist} 
                                loading={loading} 
                                onRemove={handleRemoveFromWishlist} 
                            />
                        </div>
                    )}
                    
                    {/* --------------------------------------------------- */}
                    {/* INTEGRACIÓN DEL COMPONENTE DE REVIEWS AUTÓNOMO */}
                    {/* --------------------------------------------------- */}
                    {activeTab === 'reviews' && (
                        <div className="max-w-3xl">
                            <UserReviewsList 
                                userId={user.id} 
                                
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}