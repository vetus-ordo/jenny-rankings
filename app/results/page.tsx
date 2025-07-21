'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'
import FinalSurprise from '@/components/FinalSurprise'
import { createHeartBurst } from '@/lib/effects'
import { database } from '@/firebase'
import { ref, onValue, remove } from "firebase/database";

const getPersonalizedCompatibility = (score: number) => {
  if (score > 80) return {
    title: "An Extraordinary Connection ✨",
    message: "Wow. Our tastes are so in sync, it's practically magic.",
    subtext: "Are we sure we didn't share a Polyjuice Potion?"
  };
  if (score > 60) return {
    title: "A Powerful Harmony!",
    message: "We agree on so much! This is the kind of magic that lasts.",
    subtext: "This is definitely more than just a fleeting charm."
  };
   if (score > 40) return {
    title: "A Promising Accord",
    message: "We agree on the important things and have fun debating the rest. What a perfect balance!",
    subtext: "Our foundation is strong."
  };
  return {
    title: "The Classic 'Opposites Attract'",
    message: "Our differences are what make things exciting. We perfectly complement each other.",
    subtext: "Every adventure needs a little unpredictability."
  };
}

const calculateCategoryScore = (player1Ranks: string[], player2Ranks: string[]) => {
  if (!player1Ranks || !player2Ranks) return { userScore: 0, maxScore: 0 };
  let userScore = 0;
  const numItems = player1Ranks.length;
  const maxScore = numItems * 3;
  player1Ranks.forEach((p1_item, p1_index) => {
    const p2_index = player2Ranks.indexOf(p1_item);
    if (p2_index !== -1) {
      const distance = Math.abs(p1_index - p2_index);
      userScore += Math.max(0, 3 - distance);
    }
  });
  return { userScore, maxScore };
}

export default function ResultsPage() {
  const router = useRouter();
  const [allRankings, setAllRankings] = useState<{ [key: string]: any }>({});
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [overallScore, setOverallScore] = useState(0);
  const [revealStep, setRevealStep] = useState(0);
  const matchRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  useEffect(() => {
    setPlayer1Name(localStorage.getItem('player1') || 'Wizard 1');
    setPlayer2Name(localStorage.getItem('player2') || 'Wizard 2');
    
    const rankingsRef = ref(database, 'rankings/');
    const unsubscribe = onValue(rankingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAllRankings(data);
        const completed = Object.values(data).filter((r: any) => r.player1 && r.player2);
        if (completed.length > 0) {
            const totalUserScore = completed.reduce((sum, r: any) => {
            const categoryScores = calculateCategoryScore(r.player1, r.player2);
            return sum + categoryScores.userScore;
            }, 0);
            const totalMaxScore = completed.reduce((sum, r: any) => sum + r.player1.length * 3, 0);
            const finalPercentage = totalMaxScore > 0 ? Math.round((totalUserScore / totalMaxScore) * 100) : 0;
            setOverallScore(finalPercentage);
        }
      }
    });

    const sequence = [
      () => setRevealStep(1), () => setRevealStep(2),
      () => { setRevealStep(3); setTimeout(() => { matchRefs.current.forEach(ref => { if (ref) createHeartBurst(ref); }); }, 500); },
      () => setRevealStep(4),
    ];
    sequence.forEach((step, i) => setTimeout(step, (i + 1) * 2000));
    
    return () => unsubscribe();
  }, []);

  const handleNewGame = () => {
    if (confirm("Are you sure you want to start a new game? This will erase all current rankings.")) {
      const rankingsRef = ref(database, 'rankings/');
      remove(rankingsRef);
      router.push('/');
    }
  };
  
  const personalizedResult = getPersonalizedCompatibility(overallScore);
  const completedCategories = Object.keys(allRankings).filter(cat => allRankings[cat]?.player1 && allRankings[cat]?.player2);

  return (
    <>
      <ClientEffects />
      <main className="container">
        <header className="header"><h1>The Final Decree</h1></header>

        {revealStep >= 1 && (
          <div className="card compatibility-reveal">
            <h2 style={{fontFamily: 'Cinzel'}}>Magical Compatibility</h2>
            <div className="compatibility-score" style={{fontSize: '4rem', margin: '1rem 0'}}>{overallScore}%</div>
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
            const categoryScores = calculateCategoryScore(ranking.player1, ranking.player2);
            const categoryPercentage = categoryScores.maxScore > 0 ? Math.round((categoryScores.userScore / categoryScores.maxScore) * 100) : 0;

            return (
              <div key={categoryId} className="card compatibility-reveal" style={{animationDelay: `${catIndex * 0.3}s`, padding: '1.5rem', marginBottom: '1.5rem'}}>
                <h3 style={{ fontFamily: 'Cinzel', marginBottom: '1rem', textAlign: 'center' }}>
                  {category.name}
                  <span className="category-score">({categoryPercentage}%)</span>
                </h3>
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
                      const isPerfectMatch = isMatch && index === 0;
                      const ref = isMatch ? (el: HTMLTableRowElement | null) => { if(el) matchRefs.current.push(el) } : null;

                      return (
                        <tr key={index} ref={ref} className={isPerfectMatch ? 'perfect-match' : (isMatch ? 'match' : '')}>
                          <td><strong>#{index + 1}</strong></td>
                          <td>{player1Item?.name || '...'}</td>
                          <td>{player2Item?.name || '...'}</td>
                          <td style={{textAlign: 'center'}}>{isMatch ? (isPerfectMatch ? '🏆' : '✨') : ''}</td>
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
                <button onClick={handleNewGame} className="btn">Create a New Scroll</button>
            </div>
        }
      </main>
    </>
  )
}