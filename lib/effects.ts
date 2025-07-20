// /lib/effects.ts

// This function creates the heart particle explosion effect.
export const createHeartBurst = (element: HTMLElement) => {
  if (typeof window === 'undefined' || !element) return;
  
  const rect = element.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('div');
    heart.innerText = '💕';
    heart.className = 'heart-burst';
    
    // Position heart at the center of the element
    heart.style.left = `${originX - 12}px`;
    heart.style.top = `${originY - 12}px`;

    // Randomize direction and distance for a natural burst
    const angle = Math.random() * 360;
    const distance = Math.random() * 50 + 50;
    const x = Math.cos(angle * (Math.PI / 180)) * distance;
    const y = Math.sin(angle * (Math.PI / 180)) * distance;

    heart.style.setProperty('--x', `${x}px`);
    heart.style.setProperty('--y', `${y}px`);
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}