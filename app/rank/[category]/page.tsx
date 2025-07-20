'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'

export default function RankingPage() {
  const params = useParams()
  const router = useRouter()
  const category = params?.category as string
  
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState<number>(1)
  const [rankings, setRankings] = useState<{ [key: string]: string[] }>({})
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  useEffect(() => {
    setPlayer1Name(localStorage.getItem('player1') || 'Wizard 1')
    setPlayer2Name(localStorage.getItem('player2') || 'Wizard 2')
    const saved = localStorage.getItem(`rankings_${category}`)
    if (saved) {
      setRankings(JSON.parse(saved))
    }
  }, [category])

  const categoryInfo = categoryData[category]
  if (!categoryInfo) {
    return (
      <div className="container">
        <div className="header"><h1>Category not found</h1></div>
      </div>
    )
  }

  const currentPlayerName = currentPlayer === 1 ? player1Name : player2Name
  const playerKey = `player${currentPlayer}`
  const currentRanking = rankings[playerKey] || categoryInfo.items.map((item: any) => item.id)

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (dropIndex: number) => {
    if (!draggedItem) return
    const dragIndex = currentRanking.indexOf(draggedItem)
    const newRanking = [...currentRanking]
    newRanking.splice(dragIndex, 1)
    newRanking.splice(dropIndex, 0, draggedItem)

    const newRankings = { ...rankings, [playerKey]: newRanking }
    setRankings(newRankings)
    localStorage.setItem(`rankings_${category}`, JSON.stringify(newRankings))
    setDraggedItem(null)
  }

  return (
    <>
      <ClientEffects />
      <main className="container">
        <div className="header">
          <h1>{categoryInfo.name}</h1>
        </div>

        <div className="ranking-container card">
          <div className="player-tabs">
            <button 
              className={`player-tab ${currentPlayer === 1 ? 'active' : ''}`}
              onClick={() => setCurrentPlayer(1)}
            >
              {player1Name}'s Scroll
            </button>
            <button 
              className={`player-tab ${currentPlayer === 2 ? 'active' : ''}`}
              onClick={() => setCurrentPlayer(2)}
            >
              {player2Name}'s Scroll
            </button>
          </div>

          <h3 style={{ marginBottom: '20px', fontFamily: 'Cormorant Garamond, serif' }}>
            {currentPlayerName}, order the items from best to worst:
          </h3>

          {currentRanking.map((itemId, index) => {
            const item = categoryInfo.items.find((i: any) => i.id === itemId)
            if (!item) return null
            return (
              <div
                key={itemId}
                className="ranking-item"
                draggable
                onDragStart={() => handleDragStart(itemId)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => setDraggedItem(null)}
              >
                <div className="rank-number">{index + 1}</div>
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={60} 
                  height={60}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/60/ccc/FFFFFF?text=X`
                  }}
                />
                <h4>{item.name}</h4>
              </div>
            )
          })}
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/">
              <button className="primary-button">← Back to the Great Hall</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}