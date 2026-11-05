/**
 * Reusable AdSense-safe layout placeholder component.
 * Controlled by a single config flag (SHOW_AD_PLACEHOLDERS).
 * Collapsed by default (returns null) so no empty layout gaps appear before ad approval.
 * When enabled, provides fixed min-height with `contain: layout` to prevent CLS.
 */
export const SHOW_AD_PLACEHOLDERS = false;

interface AdSlotProps {
  slot: string;
  size: 'leaderboard' | 'rectangle' | 'halfpage' | 'in-article';
  label?: string;
  className?: string;
}

const SIZE_STYLES: Record<AdSlotProps['size'], { minHeight: number; maxWidth: number | string }> = {
  leaderboard: { minHeight: 90, maxWidth: 728 },
  rectangle: { minHeight: 250, maxWidth: 336 },
  halfpage: { minHeight: 600, maxWidth: 300 },
  'in-article': { minHeight: 280, maxWidth: 728 },
};

export default function AdSlot({ slot, size, label = 'Advertisement', className = '' }: AdSlotProps) {
  if (!SHOW_AD_PLACEHOLDERS) {
    return null;
  }

  const dimensions = SIZE_STYLES[size] || SIZE_STYLES.rectangle;

  return (
    <div
      data-ad-slot={slot}
      className={`ad-slot-placeholder ${className}`}
      style={{
        contain: 'layout',
        minHeight: dimensions.minHeight,
        maxWidth: dimensions.maxWidth,
        width: '100%',
        margin: '24px auto',
        backgroundColor: 'var(--canvas-soft)',
        border: '1px dashed var(--hairline-strong)',
        borderRadius: 'var(--radius-xs)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        boxSizing: 'border-box',
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--muted)',
          marginBottom: 4,
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 11, color: 'var(--faint)', fontFamily: 'var(--font-mono)' }}>
        Slot: {slot} ({size})
      </span>
    </div>
  );
}
