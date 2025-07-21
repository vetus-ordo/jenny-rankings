'use client'
import { useMemo } from 'react';

export default function AmbientParticles() {
  const particles = useMemo(() => {
    const particleArray = [];
    const particleCount = 50; // You can adjust this number
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2 + 1; // Size between 1px and 3px
      particleArray.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${Math.random() * 10 + 5}s`, // Duration between 5-15s
          animationDelay: `${Math.random() * 15}s`,
        }
      });
    }
    return particleArray;
  }, []);

  return (
    <div className="particle-container">
      {particles.map(p => (
        <span key={p.id} className="particle" style={p.style} />
      ))}
    </div>
  );
}