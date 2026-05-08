interface AdSlotProps {
  slot: string;
  size: 'leaderboard' | 'rectangle' | 'halfpage' | 'in-article';
  label?: string;
  className?: string;
}

const heights = {
  leaderboard: 90,
  rectangle: 250,
  halfpage: 600,
  'in-article': 90,
};

export default function AdSlot({ slot, size, label, className = '' }: AdSlotProps) {
  const minH = heights[size];
  return (
    <div
      className={`adslot adslot-${size} ${className}`}
      data-slot={slot}
      style={{ minHeight: minH }}
      aria-label={`Advertisement - ${label || slot}`}
    >
      <span>Ad · {label || slot}</span>
    </div>
  );
}
