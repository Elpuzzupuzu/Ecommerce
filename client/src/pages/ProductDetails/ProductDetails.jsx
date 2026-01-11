// pages/ProductDetails/ProductDetails.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, ChevronRight, Star, Heart } from "lucide-react";
import { fetchProductById } from "../../features/products/productsSlice";
import { gsap } from "gsap";

// WISHLIST
import useWishlist from "../../hooks/wishList/useWishlist";

// RELACIONADOS
import RelatedProductsSlider from "../relatedProducts/RelatedProductsSlider";

// REVIEWS
import ProductReviewsList from "../productReviewsList/ProductReviewsList";
import AddReviewForm from "../productReviewsList/AddReviewForm";

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.adminProducts.items) || [];

  // USUARIO
  const user = useSelector((state) => state.user);
  const userId = user?.user?.id ?? null;

  const { isInWishlist, toggleWishlist } = useWishlist(userId);

  const [product, setProduct] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(null);

  // ==========================
  // REFS PARA ROTACIÓN 360
  // ==========================
  const imageRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentRotation = useRef(0);

  // ==========================
  // ROTACIÓN 360 CON DRAG
  // ==========================
  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || e.touches[0].clientX;

    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.2,
    });
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const x = e.clientX || e.touches[0].clientX;
    const deltaX = x - startX.current;

    currentRotation.current += deltaX * 0.4;

    gsap.set(imageRef.current, {
      rotationY: currentRotation.current,
    });

    startX.current = x;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Eventos globales
  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, []);

  // ==========================
  // CARGA DE PRODUCTO
  // ==========================
  useEffect(() => {
    if (!products) return;

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

  const renderStars = (rating = 4.6) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    for (let i = 0; i < full; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
      );
    }

    if (half) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
        </div>
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <Star key={`e-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  const favorite = isInWishlist(product.id);

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-6">
          <Link to="/">Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/productos">Productos</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-blue-600 font-medium">
            {product.nombre}
          </span>
        </div>

        <div className="lg:flex lg:gap-8">
          {/* IMAGEN 360 */}
          <div
            className="lg:w-1/2 relative cursor-grab active:cursor-grabbing"
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
          >
            <div className="rounded-xl bg-gray-50 border shadow-inner [perspective:1200px] overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
              )}
              <img
                ref={imageRef}
                src={product.imagen}
                alt={product.nombre}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-80 object-contain [transform-style:preserve-3d] transition-opacity ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {userId && (
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
              >
                <Heart
                  className={`w-6 h-6 ${
                    favorite
                      ? "text-red-500 fill-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>
            )}
          </div>

          {/* DETALLES */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold">{product.nombre}</h1>

            <div className="flex items-center gap-2">
              {renderStars(product.rating)}
              <span className="text-xs">{product.rating ?? 4.6}</span>
            </div>

            <p className="text-sm text-gray-600">{product.descripcion}</p>

            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`w-full py-3 rounded-full text-white font-semibold ${
                addingToCart
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {addingToCart ? "Agregando..." : "Agregar al carrito"}
            </button>
          </div>
        </div>

        {/* RELACIONADOS */}
        <div className="mt-10">
          <RelatedProductsSlider
            productId={product.id}
            categoriaId={product.categoria_principal_id}
            onAddToCart={onAddToCart}
          />
        </div>

        {/* REVIEWS */}
        <div className="mt-12">
          <ProductReviewsList productId={product.id} />
          {userId && (
            <AddReviewForm productId={product.id} userId={userId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
