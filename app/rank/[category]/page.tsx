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
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  useSortable, 
  rectSortingStrategy 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, item }: { id: string, item: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`ranking-item ${isDragging ? 'dragging' : ''}`}
    >
      <div className="rank-number">{item.rank}</div>
      <Image
        src={item.image || `https://via.placeholder.com/100`}
        alt={item.name}
        width={100}
        height={100}
        onError={(e) => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/100` }}
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

    const rankingsRef = ref(database, `rankings/${category}`);
    const unsubscribe = onValue(rankingsRef, (snapshot) => {
      const data = snapshot.val();
      setRankings(data || {});
    });

    return () => unsubscribe();
  }, [category]);

  const categoryInfo = categoryData[category];
  const player1Ranking = rankings.player1 || categoryInfo?.items.map((item: any) => item.id) || [];
  const player2Ranking = rankings.player2 || categoryInfo?.items.map((item: any) => item.id) || [];

  // Dnd-kit sensors
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  }));

  if (!categoryInfo) {
    return <main className="container header"><h1>Category Not Found</h1></main>
  }

  // Memoized helper: render one sortable list, isolated per player
  const renderRankingList = useCallback((playerKey: 'player1' | 'player2') => {
    const playerName = playerKey === 'player1' ? player1Name : player2Name;
    // Use the actual state for up to date ordering
    const currentList = rankings[playerKey] || [];
    const itemsWithData = currentList.map((id, index) => ({
      id,
      rank: index + 1,
      ...categoryInfo.items.find((i: any) => i.id === id)
    }));

    // Drag handler for this column only
    const handleColumnDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = currentList.indexOf(active.id as string);
      const newIndex = currentList.indexOf(over.id as string);
      const newList = arrayMove(currentList, oldIndex, newIndex);
      const newRankings = { ...rankings, [playerKey]: newList };
      const rankingsRef = ref(database, `rankings/${category}`);
      set(rankingsRef, newRankings);
    };

    return (
      <div className="ranking-column">
        <h3>{playerName}'s Ranking</h3>
        {/* Independent DndContext for each column */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleColumnDragEnd}
        >
          <SortableContext items={itemsWithData.map(i => i.id)} strategy={rectSortingStrategy}>
            {itemsWithData.map((item) => (
              <SortableItem key={item.id} id={item.id} item={item} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    );
  }, [player1Name, player2Name, rankings, categoryInfo, sensors, category]);

  return (
    <>
      <ClientEffects />
      <main className="container">
        <header className="header animate__animated animate__fadeIn">
          <h1 style={{fontSize: '3.5rem'}}>{categoryInfo.name}</h1>
          <p className="animate__animated animate__fadeInUp" style={{
            animationDelay: '0.5s',
            fontSize: '1.2rem',
            fontStyle: 'italic'
          }}>
            {categoryInfo.instruction}
          </p>
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
