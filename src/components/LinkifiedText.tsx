import React from 'react';
import Link from 'next/link';

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Canada", "DC", "District of Columbia"
];

const sortedStates = [...STATES].sort((a, b) => b.length - a.length);

export default function LinkifiedText({ text, currentState }: { text: string; currentState: string }) {
  if (!text) return null;
  
  // A regex that matches any state name exactly as a whole word
  const regex = new RegExp(`\\b(${sortedStates.join('|')})\\b`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => {
        const matchedState = sortedStates.find(s => s.toLowerCase() === part.toLowerCase());
        
        if (matchedState && matchedState.toLowerCase() !== currentState.toLowerCase()) {
          let slug = '';
          if (matchedState.toLowerCase() === 'canada') {
            slug = '/canada';
          } else if (matchedState.toLowerCase() === 'dc' || matchedState.toLowerCase() === 'district of columbia') {
            slug = '/us/district-of-columbia';
          } else {
            slug = `/us/${matchedState.toLowerCase().replace(/\s+/g, '-')}`;
          }
          
          return (
            <Link key={i} href={slug} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(165,180,252,0.3)' }}>
              {part}
            </Link>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}
