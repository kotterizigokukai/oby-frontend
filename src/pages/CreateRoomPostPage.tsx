import { useNavigate } from 'react-router-dom';
import { useCreateRoomPost } from '@/api/generated/room-post';
import { RoomPostForm } from '@/components/room-posts/RoomPostForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { CreateRoomPostFormData } from '@/schemas/roomPostSchema';
import { useState } from 'react';

export function CreateRoomPostPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { mutate: createPost, isPending } = useCreateRoomPost({
    mutation: {
      onSuccess: (response) => {
        navigate(`/room-posts/${response.id}`);
      },
      onError: (err) => {
        console.error('Create post error:', err);
        setError('投稿の作成に失敗しました。もう一度お試しください。');
      },
    },
  });

  const handleSubmit = (data: CreateRoomPostFormData) => {
    setError(null);
    createPost({
      data: {
        image: data.image,
        title: data.title,
        description: data.description || undefined,
      },
    });
  };

  const handleCancel = () => {
    navigate('/room-posts');
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">新規投稿</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <RoomPostForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
