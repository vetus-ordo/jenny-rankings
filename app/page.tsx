'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const player1Name = "Jenny";
  const player2Name = "Andrew";

  // This effect adds/removes the dark background class
  useEffect(() => {
    document.body.classList.add('welcome-active');
  }, []);

  useEffect(() => {
    localStorage.setItem('player1', player1Name);
    localStorage.setItem('player2', player2Name);
  }, [player1Name, player2Name]);

  const handleEnter = () => {
    // Remove the dark background class for a smooth transition
    document.body.classList.remove('welcome-active');
    
    setShowWelcome(false);
    audioRef.current?.play().catch(error => {
      console.error("Audio autoplay failed:", error);
    });
  };

  return (
    <>
      <audio ref={audioRef} src="/hedwig.mp3" loop />
      <ClientEffects />

      {showWelcome && (
        <div 
          className="welcome-overlay"
          onClick={handleEnter}
          style={{ cursor: 'pointer' }}
        >
          <div className="welcome-content animate__animated animate__zoomIn">
            <h2>The Sorting Awaits, {player1Name}</h2>
            <p>Click anywhere to begin</p>
            <div className="welcome-stars">
              {[...Array(24)].map((_, i) => {
                const size = Math.random() * 2.5 + 1.2;
                return (
                  <div
                    key={i}
                    className="star"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      animationDelay: `${Math.random() * 2.5}s`
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {!showWelcome && (
        <main className="container animate__animated animate__fadeIn">
          <header className="header">
            <Image 
              src="/Sorting_Hat.png" 
              alt="The Sorting Hat"
              width={120}
              height={120}
              style={{ opacity: 0.9, marginBottom: '1rem' }}
            />
            <h1>The Sorting Hat</h1>
          </header>
          <section>
            <div className="header">
              <p style={{ fontFamily: 'Cinzel', fontSize: '1.5rem' }}>A Magical Comparison for</p>
              <p style={{ fontFamily: 'Cinzel', fontSize: '2rem', marginTop: '0.5rem' }}>
                {player1Name} & {player2Name}
              </p>
              <p style={{marginTop: '1rem'}}>Choose a category to begin.</p>
            </div>
            <div className="category-grid">
              {Object.entries(categoryData).map(([id, category], index) => (
                <Link key={id} href={`/rank/${id}`} passHref>
                  <div className="card animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.05}s`, padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'Cinzel' }}>{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
             <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link href="/results" className="btn">See the Final Decree</Link>
            </div>
          </section>
        </main>
      )}
    </>
  );
}