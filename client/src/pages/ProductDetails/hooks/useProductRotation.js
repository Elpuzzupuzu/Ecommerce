// hooks/product/useProductRotation.js
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export const useProductRotation = () => {
  const imageRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentRotation = useRef(0);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX);
    gsap.to(imageRef.current, { scale: 1.05, duration: 0.2 });
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const deltaX = x - startX.current;
    currentRotation.current += deltaX * 0.4;
    gsap.set(imageRef.current, { rotationY: currentRotation.current });
    startX.current = x;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    gsap.to(imageRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

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

  return { imageRef, handlePointerDown };
};