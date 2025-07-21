'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'

export default function Home() {

  // The names are now hardcoded here for a personalized gift.
  const player1Name = "Jenny";
  const player2Name = "Andrew";

  // This effect runs once to save the names for the other pages to use.
  useEffect(() => {
    localStorage.setItem('player1', player1Name);
    localStorage.setItem('player2', player2Name);
  }, [player1Name, player2Name]);

  return (
    <>
      <ClientEffects />
      <main className="container">
        <header className="header animate__animated animate__fadeIn">
          <Image 
            src="/Sorting_Hat.png" 
            alt="The Sorting Hat"
            width={120}
            height={120}
            style={{ opacity: 0.9, marginBottom: '1rem' }}
          />
          <h1>The Sorting Hat</h1>
        </header>

        {/* The setup form and conditional logic have been removed. This section now displays directly. */}
        <section>
          <div className="header animate__animated animate__fadeIn">
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
    </>
  );
}