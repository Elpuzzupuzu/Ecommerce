// import { 
//   Wrench, Sprout, Leaf, Sun, Droplet, 
//   Users, Handshake, CheckCircle, Award, Clock 
// } from "lucide-react";

import riegoImg from '../../assets/serviceimages/riego.jpg';
import sensorImg from '../../assets/serviceimages/sensore.jpg';
import ahorroagua from '../../assets/serviceimages/ahorro.jpg';
import alberca1 from '../../assets/serviceimages/alberca1.jpg';
import alberca2 from '../../assets/serviceimages/alberca2.jpg';
import alberca3 from '../../assets/serviceimages/alberca3.jpg';
import pipe1 from '../../assets/serviceimages/pipe1.jpg';
import pipe2 from '../../assets/serviceimages/pipe2.jpg';
import pipe3 from '../../assets/serviceimages/pipe3.jpg';
import vu from '../../assets/serviceimages/vu.jpg';
import plan from '../../assets/serviceimages/plan.jpg';
import rev from '../../assets/serviceimages/rev.jpg';
import asp1 from '../../assets/serviceimages/asper1.jpg';
import asp2 from '../../assets/serviceimages/asper2.jpg';
import asp3 from '../../assets/serviceimages/asper3.jpg';
import cis1 from '../../assets/serviceimages/cisterna.jpg';
import cis2 from '../../assets/serviceimages/cis2.jpg';
import cis3 from '../../assets/serviceimages/cisterna3.jpg';



import { 
  ShoppingCart, Tv, Gamepad2, Music, Coffee, 
  Users, CheckCircle, Award, Clock 
} from "lucide-react";

export const services = [
  { 
    id: "streaming",
    icon: Tv, 
    title: "Streaming & Entretenimiento", 
    description: "Accede a las plataformas de streaming más populares con disponibilidad inmediata.",
    items: [
      {
        name: "Netflix",
        details: "Series y películas ilimitadas en todos tus dispositivos.",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
      },
      {
        name: "Disney+",
        details: "Contenido exclusivo de Disney, Marvel, Star Wars y Pixar.",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg"
      },
      {
        name: "Prime Video",
        details: "Películas, series y beneficios exclusivos con Amazon Prime.",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"
      }
    ],
    color: "from-blue-600 to-indigo-500"
  },
  { 
    id: "gaming",
    icon: Gamepad2, 
    title: "Gaming & Consolas", 
    description: "Productos y membresías oficiales para llevar tu experiencia gamer al siguiente nivel.",
    items: [
      {
        name: "Xbox Game Pass",
        details: "Acceso a cientos de juegos para consola y PC.",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Xbox_Game_Pass_logo.svg"
      },
      {
        name: "PlayStation Plus",
        details: "Juegos mensuales, multijugador online y descuentos exclusivos.",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/04/PlayStation_Plus_logo.svg"
      },
      {
        name: "Nintendo Switch Online",
        details: "Juega en línea y accede a clásicos de Nintendo.",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Nintendo_Switch_Online_logo.svg"
      }
    ],
    color: "from-green-600 to-emerald-500"
  },
  { 
    id: "musica",
    icon: Music, 
    title: "Música & Audio", 
    description: "Disfruta de música sin límites con las plataformas más reconocidas.",
    items: [
      {
        name: "Spotify Premium",
        details: "Música sin anuncios y descargas offline.",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
      },
      {
        name: "Apple Music",
        details: "Millones de canciones con calidad de audio superior.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_Logo.svg"
      },
      {
        name: "YouTube Music",
        details: "Música, mixes y videoclips sin interrupciones.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d8/YouTube_Music_logo.svg"
      }
    ],
    color: "from-red-500 to-pink-500"
  },
  { 
    id: "gift-cards",
    icon: ShoppingCart, 
    title: "Tarjetas de Regalo", 
    description: "Créditos digitales para comprar lo que quieras, cuando quieras.",
    items: [
      {
        name: "Amazon Gift Card",
        details: "Compra millones de productos en Amazon.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
      },
      {
        name: "Google Play Gift Card",
        details: "Apps, juegos, películas y más.",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
      },
      {
        name: "Apple Gift Card",
        details: "Todo el ecosistema Apple en una sola tarjeta.",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
      }
    ],
    color: "from-gray-700 to-slate-500"
  },
  { 
    id: "food-brands",
    icon: Coffee, 
    title: "Comida & Bebidas", 
    description: "Marcas reconocidas para disfrutar en cualquier momento.",
    items: [
      {
        name: "Starbucks",
        details: "Bebidas y café premium.",
        image: "https://upload.wikimedia.org/wikipedia/sco/d/d3/Starbucks_Corporation_Logo_2011.svg"
      },
      {
        name: "Uber Eats",
        details: "Entrega de comida de tus restaurantes favoritos.",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_Eats_2020_logo.svg"
      },
      {
        name: "Rappi",
        details: "Pedidos rápidos de comida, supermercado y más.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Rappi_logo.svg"
      }
    ],
    color: "from-orange-500 to-yellow-500"
  }
];


export const whyChooseUs = [
  {
    icon: Award,
    title: "Marcas Oficiales",
    description: "Trabajamos únicamente con proveedores y marcas 100% originales."
  },
  {
    icon: Users,
    title: "Miles de clientes",
    description: "Usuarios satisfechos comprando productos digitales cada día."
  },
  {
    icon: Clock,
    title: "Entrega inmediata",
    description: "Acceso instantáneo tras completar tu compra."
  },
  {
    icon: CheckCircle,
    title: "Compra segura",
    description: "Pagos protegidos y soporte confiable."
  }
];

