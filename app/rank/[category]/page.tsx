'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'

export default function RankingPage() {
  const params = useParams();
  const router = useRouter();
  const category = params?.category as string;
  
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [rankings, setRankings] = useState<{ [key: string]: string[] }>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    setPlayer1Name(localStorage.getItem('player1') || 'Wizard 1');
    setPlayer2Name(localStorage.getItem('player2') || 'Wizard 2');
    const saved = localStorage.getItem(`rankings_${category}`);
    if (saved) {
      setRankings(JSON.parse(saved));
    }
  }, [category]);
  
  // --- NEW: This is the "Magic Tripwire" listener ---
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Check if the change happened for the current category's rankings
      if (event.key === `rankings_${category}`) {
        const saved = localStorage.getItem(`rankings_${category}`);
        if (saved) {
          setRankings(JSON.parse(saved));
        }
      }
    };
    
    // Listen for changes in other tabs/windows
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up the listener when the page is closed
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [category]);
  // ---------------------------------------------------

  const categoryInfo = categoryData[category];
  const player1Ranking = rankings.player1 || categoryInfo?.items.map((item: any) => item.id) || [];
  const player2Ranking = rankings.player2 || categoryInfo?.items.map((item: any) => item.id) || [];
  
  const handleDrop = (dropIndex: number, playerKey: 'player1' | 'player2') => {
    if (!draggedItem) return;
    const currentRanking = rankings[playerKey] || categoryInfo.items.map((item: any) => item.id);
    const dragIndex = currentRanking.indexOf(draggedItem);
    if (dragIndex === -1) return;
    
    const newRanking = [...currentRanking];
    newRanking.splice(dragIndex, 1);
    newRanking.splice(dropIndex, 0, draggedItem);
    
    const newRankings = { ...rankings, [playerKey]: newRanking };
    setRankings(newRankings);
    localStorage.setItem(`rankings_${category}`, JSON.stringify(newRankings));
    setDraggedItem(null);
  };
  
  if (!categoryInfo) {
    return <main className="container header"><h1>Category Not Found</h1></main>
  }

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