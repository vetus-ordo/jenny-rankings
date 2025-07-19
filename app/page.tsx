'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image' // Make sure this import is here
import { categoryData } from '../lib/data'

export default function Home() {
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  const [isSetup, setIsSetup] = useState(false)
  const [categoryStatus, setCategoryStatus] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    // Load player names from localStorage if they exist
    const savedPlayer1 = localStorage.getItem('player1')
    const savedPlayer2 = localStorage.getItem('player2')
    if (savedPlayer1 && savedPlayer2) {
      setPlayer1(savedPlayer1)
      setPlayer2(savedPlayer2)
      setIsSetup(true)
    }

    // Check the status of each category to display on the cards
    const statuses: { [key: string]: string } = {}
    Object.keys(categoryData).forEach(category => {
      const rankings = JSON.parse(localStorage.getItem(`rankings_${category}`) || '{}')
      if (rankings.player1 && rankings.player2) {
        statuses[category] = 'completed'
      } else if (rankings.player1 || rankings.player2) {
        statuses[category] = 'in-progress'
      } else {
        statuses[category] = 'not-started'
      }
    })
    setCategoryStatus(statuses)
  }, [])

  const handleSetup = () => {
    if (player1.trim() && player2.trim()) {
      localStorage.setItem('player1', player1)
      localStorage.setItem('player2', player2)
      setIsSetup(true)
    } else {
      alert('Please enter names for both wizards.')
    }
  }

  return (
    <div className="container">
      <div className="header">
        <Image 
          src="/Sorting_Hat.png" 
          alt="The Sorting Hat"
          width={100}
          height={100}
          style={{ opacity: 0.8 }}
        />
        <h1>The Sorting of Tastes</h1>
        <p>Discover whose preferences align in the wizarding world.</p>
      </div>

      {!isSetup ? (
        <div className="player-setup">
          <h2>Two Wizards, One Scroll</h2>
          <div className="input-group">
            <label>Wizard 1 Name:</label>
            <input
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <div className="input-group">
            <label>Wizard 2 Name:</label>
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <button className="btn" onClick={handleSetup}>
            Begin the Sorting
          </button>
        </div>
      ) : (
        <>
          <div style={{ textAlign: 'center', color: '#422d1a', marginBottom: '30px' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>The Wizards</h2>
            <p style={{ fontSize: '1.1rem', marginTop: '5px' }}>{player1} and {player2}</p>
            <p style={{ marginTop: '10px' }}>Choose a category to consult the scroll.</p>
          </div>
          <div className="category-grid">
            {Object.entries(categoryData).map(([id, category]) => (
              <Link key={id} href={`/rank/${id}`} passHref>
                <div className={`category-card ${categoryStatus[id]}`}>
                  <h3>{category.name}</h3>
                  <p className="status">
                    {categoryStatus[id] === 'completed' ? 'Completed' : categoryStatus[id] === 'in-progress' ? 'In Progress' : 'Begin'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/results">
              <button className="btn">See the Final Decree</button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}