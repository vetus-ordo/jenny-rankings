'use client'
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ClientEffects() {
  useEffect(() => {
    // --- Sparkle Effect Logic ---
    const handlePointerMove = (e: PointerEvent) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = e.clientX + 'px';
      sparkle.style.top = e.clientY + 'px';
      document.body.appendChild(sparkle);
      setTimeout(() => {
        sparkle.remove();
      }, 1400);
    };
    document.addEventListener('pointermove', handlePointerMove);

    // --- Parallax Background Logic ---
    gsap.registerPlugin(ScrollTrigger); // Register the plugin

    gsap.to("body.magical-bg::before", {
      backgroundPosition: "0px -200px", // Animate the background position vertically
      ease: "none", // No easing, for a direct link to scroll
      scrollTrigger: {
        trigger: "body", // The scroll of the whole page triggers the animation
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smoothly ties the animation to the scrollbar
      },
    });

    // Cleanup function
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      ScrollTrigger.killAll(); // Clean up ScrollTrigger instances
    };
  }, []);

  return null; // This component doesn't render anything itself
}