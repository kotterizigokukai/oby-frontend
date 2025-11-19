import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function CreatePostFAB() {
  return (
    <Link to="/room-posts/new">
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </Link>
  );
}
