import Masonry from 'react-masonry-css';
import { Moodboard } from '../types/moodboard';
import MoodboardCard from './MoodboardCard';

interface MasonryGridProps {
  moodboards: Moodboard[];
  onCardClick?: (moodboard: Moodboard) => void;
}

export default function MasonryGrid({ moodboards, onCardClick }: MasonryGridProps) {
  const breakpointColumns = {
    default: 4,
    1536: 3,
    1024: 2,
    640: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-6 w-auto"
      columnClassName="pl-6 bg-clip-padding"
    >
      {moodboards.map((moodboard, index) => (
        <MoodboardCard
          key={moodboard.id}
          moodboard={moodboard}
          index={index}
          onClick={() => onCardClick?.(moodboard)}
        />
      ))}
    </Masonry>
  );
}
