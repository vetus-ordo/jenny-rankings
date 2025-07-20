'use client'
import { useEffect } from 'react';

export default function ClientEffects() {
  useEffect(() => {
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

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return null; // This component doesn't render any visible HTML itself
}