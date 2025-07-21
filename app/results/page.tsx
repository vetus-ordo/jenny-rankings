'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'
import FinalSurprise from '@/components/FinalSurprise'
import { createHeartBurst } from '@/lib/effects'
import { database } from '@/firebase' // Import the database connection
import { ref, onValue } from "firebase/database"; // Import Firebase functions

const getPersonalizedCompatibility = (score: number) => {
  if (score > 80) return {
    title: "An Extraordinary Connection ✨",
    message: "Wow. Your tastes are so in sync, it's practically magic.",
    subtext: "Are you two sure you didn't share a Polyjuice Potion?"
  };
  if (score > 60) return {
    title: "A Powerful Harmony!",
    message: "You agree on so much. This is the kind of magic that lasts.",
    subtext: "Definitely more than just a fleeting charm."
  };
   if (score > 40) return {
    title: "A Promising Accord",
    message: "You agree on the important things and can have fun debating the rest. A perfect balance!",
    subtext: "The foundation is strong."
  };
  return {
    title: "The Classic 'Opposites Attract'",
    message: "Your differences could be what make things exciting. You complement each other.",
    subtext: "Every adventure needs a little unpredictability."
  };
}

export default function ResultsPage() {
  const [allRankings, setAllRankings] = useState<{ [key: string]: any }>({});
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [revealStep, setRevealStep] = useState(0);
  const matchRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  useEffect(() => {
    // Get player names from localStorage (this doesn't need to be real-time)
    setPlayer1Name(localStorage.getItem('player1') || 'Wizard 1');
    setPlayer2Name(localStorage.getItem('player2') || 'Wizard 2');

    // --- NEW: This now listens for real-time updates from Firebase ---
    const rankingsRef = ref(database, 'rankings/');
    const unsubscribe = onValue(rankingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAllRankings(data);
      }
    });

    // Cinematic reveal sequence
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
    
    // Clean up the Firebase listener when the page is closed
    return () => unsubscribe();
  }, []);

  // --- NEW: The upgraded "Proximity Scoring" calculation ---
  const calculateCompatibility = () => {
    let userScore = 0;
    let maxScore = 0;
    let exactMatches = 0;
    let totalComparisons = 0;

    Object.keys(allRankings).forEach(category => {
      const ranking = allRankings[category];
      if (ranking?.player1 && ranking?.player2) {
        const numItems = ranking.player1.length;
        maxScore += numItems * 3; // Max possible score is 3 points per item
        totalComparisons += numItems;

        ranking.player1.forEach((p1_item: string, p1_index: number) => {
          const p2_index = ranking.player2.indexOf(p1_item);

          if (p2_index !== -1) { // If the item exists in the other list
            const distance = Math.abs(p1_index - p2_index);
            if (distance === 0) {
              userScore += 3; // 3 points for exact match
              exactMatches++;
            } else if (distance === 1) {
              userScore += 2; // 2 points for being 1 spot off
            } else if (distance === 2) {
              userScore += 1; // 1 point for being 2 spots off
            }
          }
        });
      }
    });

    return { 
      exactMatches, 
      totalComparisons, 
      percentage: maxScore > 0 ? Math.round((userScore / maxScore) * 100) : 0 
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
                      
                      const ref = isMatch ? (el: HTMLTableRowElement | null) => { if(el) matchRefs.current.push(el) } : null;

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