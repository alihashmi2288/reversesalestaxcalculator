interface AdSlotProps {
  slot: string;
  size: 'leaderboard' | 'rectangle' | 'halfpage' | 'in-article';
  label?: string;
  className?: string;
}

export default function AdSlot(_props: AdSlotProps) {
  void _props;
  // Return null to hide all ad containers for now.
  // When you get approved for Google AdSense, implement the ins tag and adsbygoogle push here!
  return null;
}
