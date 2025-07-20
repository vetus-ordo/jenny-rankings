'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'
import FinalSurprise from '@/components/FinalSurprise'
import { createHeartBurst } from '@/lib/effects'

const getPersonalizedCompatibility = (score: number) => {
  if (score > 80) return {
    title: "An Extraordinary Connection ✨",
    message: "Wow. Our tastes are so in sync, it's practically magic.",
    subtext: "Are you sure we didn't share a Polyjuice Potion?"
  };
  if (score > 60) return {
    title: "A Powerful Harmony!",
    message: "We agree on so much! This is the kind of magic that lasts.",
    subtext: "Definitely more than just a fleeting charm."
  };
   if (score > 40) return {
    title: "A Promising Accord",
    message: "We agree on the important things and can have fun debating the rest. A perfect balance!",
    subtext: "The foundation is strong."
  };
  return {
    title: "The Classic 'Opposites Attract'",
    message: "Our differences could be what make things exciting. We complement each other.",
    subtext: "Every adventure needs a little unpredictability."
  };
}

export default function ResultsPage() {
  const [allRankings, setAllRankings] = useState<{ [key: string]: any }>({});
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [revealStep, setRevealStep] = useState(0);
  const matchRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  const loadRankings = () => {
    const rankings: { [key: string]: any } = {};
    Object.keys(categoryData).forEach(category => {
      const saved = localStorage.getItem(`rankings_${category}`);
      if (saved) rankings[category] = JSON.parse(saved);
    });
    setAllRankings(rankings);
  };
  
  useEffect(() => {
    setPlayer1Name(localStorage.getItem('player1') || 'Wizard 1');
    setPlayer2Name(localStorage.getItem('player2') || 'Wizard 2');
    loadRankings();

    const sequence = [
      () => setRevealStep(1),
      () => setRevealStep(2),
      () => {
        setRevealStep(3);
        setTimeout(() => {
            matchRefs.current.forEach(ref => {
                if (ref) createHeartBurst(ref);
            });
        }, 500);
      },
      () => setRevealStep(4),
    ];
    sequence.forEach((step, i) => setTimeout(step, (i + 1) * 2000));
  }, []);

  // Live update listener for the results page
  useEffect(() => {
    const handleStorageChange = () => {
      loadRankings();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const calculateCompatibility = () => {
    let exactMatches = 0;
    let totalComparisons = 0;
    Object.keys(allRankings).forEach(category => {
      const ranking = allRankings[category];
      if (ranking?.player1 && ranking?.player2) {
        ranking.player1.forEach((item: string, index: number) => {
          if (ranking.player2[index] === item) {
            exactMatches++;
          }
          totalComparisons++;
        });
      }
    });
    return { 
      exactMatches, 
      totalComparisons, 
      percentage: totalComparisons > 0 ? Math.round((exactMatches / totalComparisons) * 100) : 0 
    };
  };
  
  const compatibility = calculateCompatibility();
  const personalizedResult = getPersonalizedCompatibility(compatibility.percentage);
  const completedCategories = Object.keys(allRankings).filter(cat => allRankings[cat]?.player1 && allRankings[cat]?.player2);

  return (
    <>
      <ClientEffects />
      <main className="container">
        <header className="header"><h1>The Final Decree</h1></header>

        {revealStep >= 1 && (
          <div className="card compatibility-reveal">
            <h2 style={{fontFamily: 'Cinzel'}}>Magical Compatibility</h2>
            <div className="compatibility-score" style={{fontSize: '4rem', margin: '1rem 0'}}>{compatibility.percentage}%</div>
          </div>
        )}

        {revealStep >= 2 && (
          <div className="card compatibility-reveal" style={{animationDelay: '0.2s'}}>
            <h3 style={{fontFamily: 'Cinzel'}}>{personalizedResult.title}</h3>
            <p>{personalizedResult.message}</p>
            <p style={{opacity: 0.7, marginTop: '1rem'}}><em>{personalizedResult.subtext}</em></p>
          </div>
        )}

        {revealStep >= 3 && completedCategories.map((categoryId, catIndex) => {
            const category = categoryData[categoryId];
            const ranking = allRankings[categoryId];
            if (!category || !ranking) return null;

            return (
              <div key={categoryId} className="card compatibility-reveal" style={{animationDelay: `${catIndex * 0.3}s`, padding: '1.5rem', marginBottom: '1.5rem'}}>
                <h3 style={{ fontFamily: 'Cinzel', marginBottom: '1rem', textAlign: 'center' }}>{category.name}</h3>
                <table style={{width: '100%', textAlign: 'left'}}>
                  <thead>
                    <tr>
                      <th style={{width: '15%'}}>Rank</th>
                      <th>{player1Name}</th>
                      <th>{player2Name}</th>
                      <th style={{width: '15%', textAlign: 'center'}}>Accord</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.player1.map((itemId: string, index: number) => {
                      const player1Item = category.items.find((i: any) => i.id === itemId);
                      const player2Item = category.items.find((i: any) => i.id === ranking.player2[index]);
                      const isMatch = itemId === ranking.player2[index];
                      
                      // Assign the ref to the table row only if it's a match
                      const ref = isMatch ? (el: HTMLTableRowElement | null) => { matchRefs.current[index] = el } : null;

                      return (
                        <tr key={index} ref={ref} className={isMatch ? 'match' : ''}>
                          <td><strong>#{index + 1}</strong></td>
                          <td>{player1Item?.name || '...'}</td>
                          <td>{player2Item?.name || '...'}</td>
                          <td style={{textAlign: 'center'}}>{isMatch ? '✨' : ''}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
        })}
        
        {revealStep >= 4 && <FinalSurprise />}

        {revealStep >= 4 && 
            <div style={{ textAlign: 'center', marginTop: '40px' }} className="animate__animated animate__fadeInUp">
                <Link href="/" className="btn">Create a New Scroll</Link>
            </div>
        }
      </main>
    </>
  )
}