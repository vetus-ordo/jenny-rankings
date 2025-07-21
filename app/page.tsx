'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'
import ProgressIndicator from '@/components/ProgressIndicator'

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const player1Name = "Jenny";
  const player2Name = "Andrew";

  const calculateProgress = useCallback(() => {
    if (typeof window === 'undefined') return 0;

    const count = Object.keys(categoryData).filter(key => {
      const rankings = JSON.parse(localStorage.getItem(`rankings_${key}`) || '{}');
      return rankings.player1 && rankings.player2;
    }).length;

    return count;
  }, []);

  const updateProgress = useCallback(() => {
    const newCount = calculateProgress();
    setCompletedCount(newCount);
  }, [calculateProgress]);

  useEffect(() => {
    setIsClient(true);
    updateProgress();

    localStorage.setItem('player1', player1Name);
    localStorage.setItem('player2', player2Name);

    if (sessionStorage.getItem('welcomeScreenShown') === 'true') {
      setShowWelcome(false);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('rankings_')) {
        updateProgress();
      }
    };

    const handleRankingsUpdate = () => updateProgress();
    const handleFocus = () => updateProgress();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('rankingsUpdated', handleRankingsUpdate);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('rankingsUpdated', handleRankingsUpdate);
      window.removeEventListener('focus', handleFocus);
    };
  }, [updateProgress]);

  const handleEnter = () => {
    setShowWelcome(false);
    sessionStorage.setItem('welcomeScreenShown', 'true');

    audioRef.current?.play().catch(error => {
      console.error("Audio autoplay failed:", error);
    });
  };

  const totalCategories = Object.keys(categoryData).length;

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
            </div>

            {isClient && (
              <ProgressIndicator
                completed={completedCount}
                total={totalCategories}
              />
            )}

            <div className="category-grid">
              {Object.entries(categoryData).map(([id, category], index) => (
                <Link key={id} href={`/rank/${id}`} passHref>
                  <div className="card animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.05}s`, padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'Cinzel' }}>{category.name}</h3>
                    {/* This div adds the smoke effect on hover */}
                    <div className="card-smoke-container">
                      {[...Array(5)].map((_, i) => <div key={i} className="card-smoke-particle" />)}
                    </div>
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