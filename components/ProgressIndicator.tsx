'use client'

interface ProgressIndicatorProps {
  completed: number;
  total: number;
}

export default function ProgressIndicator({ completed, total }: ProgressIndicatorProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="progress-container animate__animated animate__fadeIn" style={{ animationDelay: '0.5s' }}>
      <p className="progress-label">{completed} of {total} Scrolls Completed</p>
      <div className="progress-bar-background">
        <div 
          className="progress-bar-foreground"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}