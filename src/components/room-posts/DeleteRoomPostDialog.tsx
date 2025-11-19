import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDeleteRoomPost } from '@/api/generated/room-post';
import { useNavigate } from 'react-router-dom';

interface DeleteRoomPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
  onDeleteSuccess?: () => void;
}

export function DeleteRoomPostDialog({
  open,
  onOpenChange,
  postId,
  onDeleteSuccess,
}: DeleteRoomPostDialogProps) {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutate: deletePost, isPending } = useDeleteRoomPost({
    mutation: {
      onSuccess: () => {
        onOpenChange(false);
        if (onDeleteSuccess) {
          onDeleteSuccess();
        } else {
          navigate('/room-posts');
        }
      },
      onError: (err) => {
        console.error('Delete error:', err);
        setError('投稿の削除に失敗しました');
      },
    },
  });

  const handleDelete = () => {
    setError(null);
    deletePost({ roomPostId: postId });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>投稿を削除しますか？</DialogTitle>
          <DialogDescription>
            この操作は取り消せません。本当にこの投稿を削除してもよろしいですか？
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            キャンセル
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? '削除中...' : '削除'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
