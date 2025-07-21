'use client'

import { useEffect, useState } from 'react';

interface ProgressIndicatorProps {
  completed: number;
  total: number;
}

export default function ProgressIndicator({ completed, total }: ProgressIndicatorProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [prevCompleted, setPrevCompleted] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const targetPercentage = total > 0 ? (completed / total) * 100 : 0;
  const isCompleted = completed === total && total > 0;

  useEffect(() => {
    const animateProgress = () => {
      const startPercentage = total > 0 ? (prevCompleted / total) * 100 : 0;
      const endPercentage = targetPercentage;
      const duration = 800; // Animation duration in ms
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const currentPercentage = startPercentage + (endPercentage - startPercentage) * easeOut;
        setAnimatedPercentage(currentPercentage);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (isCompleted && !showCelebration) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 2000);
        }
      };

      requestAnimationFrame(animate);
    };

    if (completed !== prevCompleted) {
      animateProgress();
      setPrevCompleted(completed);
    }
  }, [completed, total, prevCompleted, targetPercentage, isCompleted, showCelebration]);

  // Initialize on mount
  useEffect(() => {
    setAnimatedPercentage(targetPercentage);
    setPrevCompleted(completed);
  }, []);

  return (
    <div className={`progress-indicator ${isCompleted ? 'completed' : ''} ${showCelebration ? 'celebrating' : ''}`}>
      <div className="progress-text">
        <span className="progress-numbers">
          <span className="completed-count">{completed}</span>
          <span className="progress-separator"> of </span>
          <span className="total-count">{total}</span>
        </span>
        <span className="progress-label"> Scrolls Completed</span>
        {isCompleted && <span className="completion-message">🎉 All Scrolls Complete! 🎉</span>}
      </div>

      <div className="progress-container">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${animatedPercentage}%`,
            } as React.CSSProperties}
          >
            <div className="progress-shimmer"></div>
            <div className="progress-glow"></div>
          </div>
        </div>

        <div className="progress-percentage">
          {Math.round(animatedPercentage)}%
        </div>
      </div>

      {/* Sparkle effects for completion milestones */}
      {completed > 0 && (
        <div className="progress-sparkles">
          {[...Array(Math.min(completed, 8))].map((_, i) => (
            <div
              key={i}
              className="progress-sparkle"
              style={{
                animationDelay: `${i * 0.15}s`,
                left: `${Math.min((i + 1) / total * 100, 95) - 5 + Math.random() * 10}%`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* Celebration confetti */}
      {showCelebration && (
        <div className="celebration-confetti">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#667eea', '#764ba2', '#ff9a56', '#ff6b9d'][Math.floor(Math.random() * 4)]
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}