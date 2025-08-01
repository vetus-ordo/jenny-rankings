'use client'
import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { categoryData } from '@/lib/data'
import ClientEffects from '@/components/ClientEffects'
import { database } from '@/firebase'
import { ref, onValue, set } from "firebase/database"

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type RankableItem = {
  id: string;
  name: string;
  image: string;
  description?: string;
};

type SortableItemProps = {
  id: string;
  item: RankableItem & { rank: number };
};

function SortableItem({ id, item }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.6 : 1 };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`ranking-item${isDragging ? ' dragging' : ''}`}>
      <div className="rank-number">{item.rank}</div>
      <Image
        src={item.image || "https://via.placeholder.com/100"}
        alt={item.name}
        width={100}
        height={100}
        onError={e => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/100` }}
      />
      <h4 style={{ textAlign: 'left', marginLeft: '1rem' }}>{item.name}</h4>
    </div>
  );
}

export default function RankingPage() {
  const params = useParams();
  const category = params?.category as string;

  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [rankings, setRankings] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    setPlayer1Name(localStorage.getItem('player1') || 'Wizard 1');
    setPlayer2Name(localStorage.getItem('player2') || 'Wizard 2');

    if (!category) return;

    // Listen to Firebase for real-time updates
    const rankingsRef = ref(database, `rankings/${category}`);
    const unsubscribe = onValue(rankingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRankings(data);
        // Also update localStorage when Firebase data comes in
        localStorage.setItem(`rankings_${category}`, JSON.stringify(data));
      }
    });

    return () => unsubscribe();
  }, [category]);

  const categoryInfo = categoryData[category];

  if (!categoryInfo || !Array.isArray(categoryInfo.items) || categoryInfo.items.length === 0) {
    return <main className="container header"><h1>Category Not Found or has no items!</h1></main>
  }

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const renderRankingList = useCallback((playerKey: 'player1' | 'player2') => {
    const playerName = playerKey === 'player1' ? player1Name : player2Name;
    const currentList: string[] =
      (Array.isArray(rankings[playerKey]) && rankings[playerKey].length > 0)
        ? rankings[playerKey]
        : categoryInfo.items.map((item: RankableItem) => item.id);

    const itemsWithData: (RankableItem & { rank: number })[] = currentList.map((id, idx) => {
      const itemData = categoryInfo.items.find((it: RankableItem) => it.id === id);
      if (!itemData) {
        return {
          id, name: '(unknown)', image: '', rank: idx + 1,
        };
      }
      return { ...itemData, rank: idx + 1 };
    });

    const handleColumnDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = currentList.indexOf(active.id as string);
      const newIndex = currentList.indexOf(over.id as string);
      const newList = arrayMove(currentList, oldIndex, newIndex);
      const newRankings = { ...rankings, [playerKey]: newList };
      
      // Save to Firebase
      set(ref(database, `rankings/${category}`), newRankings);
      
      // **Save to localStorage to trigger progress bar update**
      localStorage.setItem(`rankings_${category}`, JSON.stringify(newRankings));

      // Dispatch event for same-tab updates on the homepage
      window.dispatchEvent(new Event('rankingsUpdated'));
    };

    return (
      <div className="ranking-column">
        <h3>{playerName}'s Ranking</h3>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleColumnDragEnd}>
          <SortableContext items={itemsWithData.map(i => i.id)} strategy={rectSortingStrategy}>
            {itemsWithData.map(item =>
              <SortableItem key={item.id} id={item.id} item={item} />
            )}
          </SortableContext>
        </DndContext>
      </div>
    );
  }, [player1Name, player2Name, rankings, category, categoryInfo, sensors]);

  return (
    <>
      <ClientEffects />
      <main className="container">
        <header className="header animate__animated animate__fadeIn">
          <h1 style={{ fontSize: '3.5rem' }}>{categoryInfo.name}</h1>
          <p className="animate__animated animate__fadeInUp" style={{ animationDelay: '0.5s', fontSize: '1.2rem', fontStyle: 'italic' }}>
            {categoryInfo.instruction}
          </p>
        </header>
        <section className="card animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="ranking-columns">
            {renderRankingList('player1')}
            {renderRankingList('player2')}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/" className="btn">← Back to Categories</Link>
          </div>
        </section>
      </main>
    </>
  );
}