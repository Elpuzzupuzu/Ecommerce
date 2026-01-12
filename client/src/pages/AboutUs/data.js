import {
  Calendar,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Star,
  ShoppingCart,
  Package,
  Truck,
  Store,
  Home
} from "lucide-react";

/* =========================
   STATS (Confianza)
========================= */

export const stats = [
  { icon: Calendar, number: "2015", key: "founded", label: "Plataforma fundada" },
  { icon: Users, number: "1M+", key: "clients", label: "Clientes activos" },
  { icon: Package, number: "10M+", key: "products", label: "Productos disponibles" },
  { icon: TrendingUp, number: "99%", key: "satisfaction", label: "Órdenes entregadas a tiempo" },
];

/* =========================
   CATEGORÍAS DESTACADAS
========================= */

export const expertiseAreas = [
  {
    icon: ShoppingCart,
    title: "Tecnología y Electrónica",
    description: "Los últimos dispositivos, accesorios y gadgets al mejor precio.",
    features: ["Smartphones", "Laptops", "Accesorios"],
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200"
  },
  {
    icon: Home,
    title: "Hogar y Cocina",
    description: "Todo para equipar tu hogar con calidad y estilo.",
    features: ["Electrodomésticos", "Decoración", "Cocina"],
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200"
  },
  {
    icon: Store,
    title: "Moda y Accesorios",
    description: "Ropa, calzado y accesorios para toda la familia.",
    features: ["Hombre", "Mujer", "Niños"],
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=1200"
  },
  {
    icon: Package,
    title: "Belleza y Cuidado Personal",
    description: "Productos esenciales para tu rutina diaria.",
    features: ["Cuidado facial", "Higiene", "Fragancias"],
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200"
  },
  {
    icon: Truck,
    title: "Herramientas y DIY",
    description: "Todo para proyectos, reparaciones y mejoras del hogar.",
    features: ["Herramientas eléctricas", "Manualidades", "Jardín"],
    image: "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?w=1200"
  },
  {
    icon: Star,
    title: "Ofertas destacadas",
    description: "Descuentos diarios en productos seleccionados.",
    features: ["Ofertas flash", "Más vendidos", "Recomendados"],
    image: "https://images.unsplash.com/photo-1607082349566-1870b0b41f38?w=1200"
  }
];

/* =========================
   TESTIMONIOS
========================= */

export const testimonials = [
  {
    name: "Ana Rodríguez",
    role: "Compradora frecuente",
    text: "Siempre encuentro lo que busco y los envíos llegan antes de lo esperado.",
    rating: 5,
    avatar: "A.R."
  },
  {
    name: "Juan Pérez",
    role: "Vendedor asociado",
    text: "La plataforma me permitió llegar a miles de clientes de forma sencilla.",
    rating: 5,
    avatar: "J.P."
  },
  {
    name: "María González",
    role: "Cliente Prime",
    text: "Excelente experiencia de compra, devoluciones fáciles y gran variedad.",
    rating: 5,
    avatar: "M.G."
  }
];

/* =========================
   HISTORIA / CRECIMIENTO
========================= */

export const historyItems = [
  {
    icon: Award,
    title: "El comienzo",
    description:
      "Iniciamos con una idea simple: hacer que comprar online fuera más fácil, rápido y accesible para todos.",
    gradient: "from-[#FF9900] to-[#e88b00]"
  },
  {
    icon: TrendingUp,
    title: "Expansión global",
    description:
      "Crecimos junto a millones de clientes y vendedores, ampliando categorías y mejorando la logística.",
    gradient: "from-blue-600 to-blue-500"
  },
  {
    icon: Star,
    title: "La plataforma hoy",
    description:
      "Hoy conectamos a personas con productos en todo el mundo, ofreciendo confianza y conveniencia.",
    gradient: "from-purple-600 to-pink-600"
  }
];

/* =========================
   VALORES
========================= */

export const values = [
  {
    icon: CheckCircle,
    title: "Confianza",
    description: "Compras seguras y protección al cliente en cada pedido"
  },
  {
    icon: Truck,
    title: "Rapidez",
    description: "Envíos eficientes con seguimiento en tiempo real"
  },
  {
    icon: Users,
    title: "Clientes primero",
    description: "Experiencia pensada para millones de compradores"
  },
  {
    icon: TrendingUp,
    title: "Innovación",
    description: "Mejoramos constantemente la experiencia de compra"
  }
];
