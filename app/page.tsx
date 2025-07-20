'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'

export default function Home() {
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  const [isSetup, setIsSetup] = useState(false)
  
  useEffect(() => {
    const savedPlayer1 = localStorage.getItem('player1');
    const savedPlayer2 = localStorage.getItem('player2');
    if (savedPlayer1 && savedPlayer2) {
      setPlayer1(savedPlayer1);
      setPlayer2(savedPlayer2);
      setIsSetup(true);
    }
  }, []);

  const handleSetup = () => {
    if (player1.trim() && player2.trim()) {
      localStorage.setItem('player1', player1);
      localStorage.setItem('player2', player2);
      setIsSetup(true);
    } else {
      alert('Please enter names for both wizards.');
    }
  };

  return (
    <>
      <ClientEffects />
      <main className="container">
        <header className="header animate__animated animate__fadeIn">
          <Image 
            src="/Sorting_Hat.png" 
            alt="The Sorting Hat"
            width={80}
            height={80}
            style={{ opacity: 0.9, marginBottom: '1rem' }}
          />
          <h1>The Sorting of Tastes</h1>
        </header>

        {!isSetup ? (
          <section className="card animate__animated animate__fadeInUp" style={{maxWidth: '500px', margin: '0 auto'}}>
            <h2 style={{ fontFamily: 'Cinzel' }}>A Magical Comparison</h2>
            <div style={{ margin: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <input type="text" value={player1} onChange={(e) => setPlayer1(e.target.value)} placeholder="Your Name" />
              <input type="text" value={player2} onChange={(e) => setPlayer2(e.target.value)} placeholder="Her Name" />
            </div>
            <button className="btn" onClick={handleSetup}>
              Begin the Sorting
            </button>
          </section>
        ) : (
          <section>
            <div className="header animate__animated animate__fadeIn">
              <p>Choose a category to begin.</p>
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
        )}
      </main>
    </>
  );
}