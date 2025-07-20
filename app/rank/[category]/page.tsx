'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'

const personalizedMessages: { [key: string]: string } = {
  'celebrities': "Let's see who you'd choose...",
  'disney-princesses': "Which princess matches your energy?",
  'date-activities': "What would make for a perfect day?",
  'love-languages': "How our hearts speak the same language.",
  'types-of-kisses': "This one should be interesting...",
}

export default function RankingPage() {
  const params = useParams();
  const router = useRouter();
  const category = params?.category as string;
  
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
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

  const categoryInfo = categoryData[category];
  const currentPlayerName = currentPlayer === 1 ? player1Name : player2Name;
  const playerKey = `player${currentPlayer}`;
  const currentRanking = rankings[playerKey] || categoryInfo?.items.map((item: any) => item.id) || [];

  const handleDrop = (dropIndex: number) => {
    if (!draggedItem) return;
    const dragIndex = currentRanking.indexOf(draggedItem);
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

  return (
    <>
      <ClientEffects />
      <main className="container">
        <header className="header animate__animated animate__fadeIn">
          <h1 style={{fontSize: '3.5rem'}}>{categoryInfo.name}</h1>
          {personalizedMessages[category] && <p className="animate__animated animate__fadeInUp" style={{animationDelay: '0.5s'}}>{personalizedMessages[category]}</p>}
        </header>

        <section className="card animate__animated animate__fadeInUp" style={{animationDelay: '0.2s', maxWidth: '600px', margin: '0 auto'}}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
            <button className={`btn ${currentPlayer === 1 ? '' : 'secondary'}`} onClick={() => setCurrentPlayer(1)} style={{flex: 1}}>{player1Name}</button>
            <button className={`btn ${currentPlayer === 2 ? '' : 'secondary'}`} onClick={() => setCurrentPlayer(2)} style={{flex: 1}}>{player2Name}</button>
          </div>
          <h3 style={{ margin: '2rem 0', fontFamily: 'Cinzel' }}>{currentPlayerName}, rank your choices:</h3>
          <div onMouseLeave={() => setDraggedItem(null)}>
            {currentRanking.map((itemId, index) => {
              const item = categoryInfo.items.find((i: any) => i.id === itemId);
              if (!item) return null;
              return (
                <div
                  key={itemId}
                  className="ranking-item"
                  draggable
                  onDragStart={() => setDraggedItem(itemId)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                >
                  <div className="rank-number">{index + 1}</div>
                  <Image src={item.image} alt={item.name} width={50} height={50} onError={(e) => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/50` }} />
                  <h4 style={{textAlign: 'left', marginLeft: '1rem'}}>{item.name}</h4>
                </div>
              );
            })}
          </div>
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
             <Link href="/" className="btn">← Back to Categories</Link>
          </div>
        </section>
      </main>
    </>
  )
}