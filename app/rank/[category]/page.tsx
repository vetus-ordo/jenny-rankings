'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'

// 1. IMPORT FIREBASE TOOLS
import { database } from '@/firebase'
import { ref, onValue, set } from "firebase/database"

export default function RankingPage() {
  const params = useParams();
  const category = params?.category as string;
  
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [rankings, setRankings] = useState<{ [key: string]: string[] }>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // 2. LISTEN for real-time changes from Firebase
  useEffect(() => {
    // Player names can still come from localStorage, as they don't need to be real-time
    setPlayer1Name(localStorage.getItem('player1') || 'Wizard 1');
    setPlayer2Name(localStorage.getItem('player2') || 'Wizard 2');

    if (!category) return;

    // Create a reference to this category's data in Firebase
    const rankingsRef = ref(database, `rankings/${category}`);
    
    // onValue is the real-time listener. It runs automatically every time the data changes in Firebase.
    const unsubscribe = onValue(rankingsRef, (snapshot) => {
      const data = snapshot.val();
      setRankings(data || {}); // Update the screen with the new data from Firebase
    });

    // Clean up the listener when you navigate away from the page
    return () => unsubscribe();
  }, [category]);

  const categoryInfo = categoryData[category];
  const player1Ranking = rankings.player1 || categoryInfo?.items.map((item: any) => item.id) || [];
  const player2Ranking = rankings.player2 || categoryInfo?.items.map((item: any) => item.id) || [];
  
  // 3. SAVE changes to Firebase
  const handleDrop = (dropIndex: number, playerKey: 'player1' | 'player2') => {
    if (!draggedItem) return;

    const currentRanking = playerKey === 'player1' ? player1Ranking : player2Ranking;
    const dragIndex = currentRanking.indexOf(draggedItem);
    if (dragIndex === -1) return; // Item not found, do nothing
    
    const newRanking = [...currentRanking];
    newRanking.splice(dragIndex, 1);
    newRanking.splice(dropIndex, 0, draggedItem);
    
    const newRankings = { ...rankings, [playerKey]: newRanking };

    // Create a reference to the database location
    const rankingsRef = ref(database, `rankings/${category}`);
    // Save the entire updated rankings object to that location
    set(rankingsRef, newRankings);
    
    setDraggedItem(null);
  };
  
  if (!categoryInfo) {
    return <main className="container header"><h1>Category Not Found</h1></main>
  }

  // Helper function to render a single ranking list
  const renderRankingList = (playerKey: 'player1' | 'player2') => {
    const playerName = playerKey === 'player1' ? player1Name : player2Name;
    const rankingList = playerKey === 'player1' ? player1Ranking : player2Ranking;

    return (
      <div className="ranking-column">
        <h3>{playerName}'s Ranking</h3>
        <div onMouseLeave={() => setDraggedItem(null)}>
          {rankingList.map((itemId, index) => {
            const item = categoryInfo.items.find((i: any) => i.id === itemId);
            if (!item) return null;
            return (
              <div
                key={itemId}
                className="ranking-item"
                draggable
                onDragStart={() => setDraggedItem(itemId)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index, playerKey)}
              >
                <div className="rank-number">{index + 1}</div>
                <Image src={item.image} alt={item.name} width={50} height={50} onError={(e) => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/50` }} />
                <h4 style={{textAlign: 'left', marginLeft: '1rem'}}>{item.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <ClientEffects />
      <main className="container">
        <header className="header animate__animated animate__fadeIn">
          <h1 style={{fontSize: '3.5rem'}}>{categoryInfo.name}</h1>
          <p className="animate__animated animate__fadeInUp" style={{animationDelay: '0.5s', fontSize: '1.2rem', fontStyle: 'italic'}}>{categoryInfo.instruction}</p>
        </header>

        <section className="card animate__animated animate__fadeInUp" style={{animationDelay: '0.2s'}}>
          <div className="ranking-columns">
            {renderRankingList('player1')}
            {renderRankingList('player2')}
          </div>
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
             <Link href="/" className="btn">← Back to Categories</Link>
          </div>
        </section>
      </main>
    </>
  )
}