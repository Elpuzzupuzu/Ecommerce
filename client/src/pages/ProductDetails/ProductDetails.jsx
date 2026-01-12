import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, ChevronRight, Package, Shield, Truck } from "lucide-react";

import { fetchProductById } from "../../features/products/productsSlice";
import useWishlist from "../../hooks/wishList/useWishlist";

// Componentes Modulares
import ProductImage360 from "./components/ProductImage360";
import StarRating from "./components/StarRating";
import RelatedProductsSlider from "../relatedProducts/RelatedProductsSlider";
import ProductReviewsList from "../productReviewsList/ProductReviewsList";
import AddReviewForm from "../productReviewsList/AddReviewForm";

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const products = useSelector((state) => state.adminProducts.items) || [];
  const user = useSelector((state) => state.user);
  const userId = user?.user?.id ?? null;

  const { isInWishlist, toggleWishlist } = useWishlist(userId);
  const [product, setProduct] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      dispatch(fetchProductById(id))
        .unwrap()
        .then(setProduct)
        .catch(() => setError("Producto no encontrado."));
    }
  }, [id, products, dispatch]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAddingToCart(true);
    await new Promise((r) => setTimeout(r, 800));
    onAddToCart(product);
    setAddingToCart(false);
  };

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-medium text-lg">{error}</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"><div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" /></div>;

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-600 px-8 pt-6 pb-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/productos" className="hover:text-blue-600 transition-colors">Productos</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-blue-600 font-semibold">{product.nombre}</span>
        </nav>

        <div className="flex flex-col items-center px-8 pb-8">
          <ProductImage360 
            product={product} 
            userId={userId} 
            favorite={isInWishlist(product.id)} 
            onToggleWishlist={toggleWishlist} 
          />

          <div className="w-full max-w-3xl space-y-8 mt-4">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">{product.nombre}</h1>
              <div className="flex items-center gap-3">
                <StarRating rating={product.rating} />
                <span className="text-base font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
                  {product.rating ?? 4.6}
                </span>
              </div>
            </div>

            <div className="text-base text-gray-700 leading-relaxed border-t border-gray-200 pt-6">
              <p className="whitespace-pre-line">{product.descripcion}</p>
            </div>

            <div className="flex flex-wrap gap-6 py-6 border-t border-b border-gray-200 bg-gradient-to-r from-blue-50 to-transparent rounded-lg px-6">
              <FeatureBadge icon={<Package />} text="Envío incluido" />
              <FeatureBadge icon={<Shield />} text="Garantía 1 año" />
              <FeatureBadge icon={<Truck />} text="Envío rápido" />
            </div>

            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                addingToCart 
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
              }`}
            >
              {addingToCart ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Agregando...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  <span>Agregar al carrito</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-b from-gray-50 to-white px-8 py-10 border-t border-gray-100">
          <RelatedProductsSlider productId={product.id} categoriaId={product.categoria_principal_id} onAddToCart={onAddToCart} />
        </div>

        <div className="mt-8 px-8 pb-10">
          <ProductReviewsList productId={product.id} />
          {userId && <AddReviewForm productId={product.id} userId={userId} />}
        </div>
      </div>
    </div>
  );
};

// Pequeño componente interno para los badges
const FeatureBadge = ({ icon, text }) => (
  <div className="flex items-center gap-3 group">
    {React.cloneElement(icon, { className: "w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" })}
    <span className="text-sm font-semibold text-gray-800">{text}</span>
  </div>
);

export default ProductDetails;