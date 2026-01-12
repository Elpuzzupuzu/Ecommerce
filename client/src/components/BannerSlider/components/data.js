// data.js
import { Droplet, Gauge, Wrench } from "lucide-react";
import pipes from "../../../assets/images/hero1.jpg";
import pvc from  "../../../assets/images/hero2.jpg";
import bomb from  "../../../assets/images/hero3.jpg";

export const slidesData = [
  {
    id: 1,
    image: pipes,
    category: "Peluches Originales",
    title: "Squishmallows",
    subtitle: "Suaves y Adorables",
    description:
      "Peluches ultra suaves y abrazables, perfectos para coleccionar, regalar o acompañarte todos los días.",
    cta: "Ver Squishmallows",
    icon: Droplet,
  },
  {
    id: 2,
    image: pvc,
    category: "Colecciones Especiales",
    title: "Ediciones Únicas",
    subtitle: "y Personajes Favoritos",
    description:
      "Descubre Squishmallows exclusivos, ediciones limitadas y tus personajes más queridos en diferentes tamaños.",
    cta: "Explorar Colección",
    icon: Gauge,
  },
  {
    id: 3,
    image: bomb,
    category: "Regalos Perfectos",
    title: "El Detalle Ideal",
    subtitle: "para Cada Ocasión",
    description:
      "El regalo perfecto para niños, coleccionistas y amantes de los peluches. Amor, ternura y diversión garantizados.",
    cta: "Comprar Ahora",
    icon: Wrench,
  },
];
