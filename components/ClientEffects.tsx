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
      setTimeout(() => sparkle.remove(), 1400);
    };
    document.addEventListener('pointermove', handlePointerMove);
    return () => document.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return null;
}