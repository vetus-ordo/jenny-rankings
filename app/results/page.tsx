'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { categoryData } from '@/lib/data'

export default function ResultsPage() {
  const [allRankings, setAllRankings] = useState<{ [key: string]: any }>({})
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')

  useEffect(() => {
    setPlayer1Name(localStorage.getItem('player1') || 'Wizard 1')
    setPlayer2Name(localStorage.getItem('player2') || 'Wizard 2')

    const rankings: { [key: string]: any } = {}
    Object.keys(categoryData).forEach(category => {
      const saved = localStorage.getItem(`rankings_${category}`)
      if (saved) {
        rankings[category] = JSON.parse(saved)
      }
    })
    setAllRankings(rankings)
  }, [])

  const calculateCompatibility = () => {
    let exactMatches = 0
    let totalComparisons = 0

    Object.keys(allRankings).forEach(category => {
      const ranking = allRankings[category]
      if (ranking?.player1 && ranking?.player2) {
        ranking.player1.forEach((item: string, index: number) => {
          if (ranking.player2[index] === item) {
            exactMatches++
          }
          totalComparisons++
        })
      }
    })

    return { 
      exactMatches, 
      totalComparisons, 
      percentage: totalComparisons > 0 ? Math.round((exactMatches / totalComparisons) * 100) : 0 
    }
  }

  const getCompatibilityMessage = (percentage: number) => {
    if (percentage >= 80) return { message: 'A Perfect Charm!' }
    if (percentage >= 60) return { message: 'Outstanding!' }
    if (percentage >= 40) return { message: 'An Acceptable Accord' }
    if (percentage >= 20) return { message: 'Curious Potion...' }
    return { message: 'Troll! In the dungeon!' }
  }

  const compatibility = calculateCompatibility()
  const completedCategories = Object.keys(allRankings).filter(cat => allRankings[cat]?.player1 && allRankings[cat]?.player2)
  const compatibilityInfo = getCompatibilityMessage(compatibility.percentage)

  return (
    <div className="container">
      <div className="header">
        <h1>The Final Decree</h1>
        <p>Comparing the magical tastes of {player1Name} and {player2Name}</p>
      </div>

      <div className="compatibility-section">
        <h2>Magical Compatibility</h2>
        <div className="compatibility-score">
          {compatibility.percentage}%
        </div>
        <p>
          <strong>{compatibilityInfo.message}</strong><br />
          You had {compatibility.exactMatches} exact matches in your rankings!
        </p>
      </div>

      {completedCategories.length > 0 ? (
        <div>
          <h2 style={{ fontFamily: 'Lora, serif', textAlign: 'center', color: '#422d1a', marginBottom: '30px' }}>
            Category Breakdowns
          </h2>
          {completedCategories.map(categoryId => {
            const category = categoryData[categoryId as keyof typeof categoryData]
            const ranking = allRankings[categoryId]
            if (!category || !ranking) return null

            return (
              <div key={categoryId} className="results-card">
                <h3 style={{ fontFamily: 'Lora, serif', marginBottom: '20px', textAlign: 'center' }}>
                  {category.name}
                </h3>
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>{player1Name}'s Pick</th>
                      <th>{player2Name}'s Pick</th>
                      <th>Accord</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.player1.map((itemId: string, index: number) => {
                      const player1Item = category.items.find((item: any) => item.id === itemId)
                      const player2ItemId = ranking.player2[index]
                      const player2Item = category.items.find((item: any) => item.id === player2ItemId)
                      const isMatch = itemId === player2ItemId

                      return (
                        <tr key={index} className={isMatch ? 'match' : 'mismatch'}>
                          <td><strong>#{index + 1}</strong></td>
                          <td>{player1Item?.name || 'Unknown'}</td>
                          <td>{player2Item?.name || 'Unknown'}</td>
                          <td>{isMatch ? '✨' : ''}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="results-card">
          <h3>No completed scrolls yet!</h3>
          <p>Complete some rankings to see your final decree.</p>
        </div>
      )}

      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <Link href="/">
          <button className="btn">← Back to the Great Hall</button>
        </Link>
      </div>
    </div>
  )
}