import { useParams, useNavigate } from 'react-router-dom';
import { useGetRoomPostDetail } from '@/api/generated/room-post';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DeleteRoomPostDialog } from '@/components/room-posts/DeleteRoomPostDialog';
import { useAuth } from '@/contexts/AuthContext';
import { formatRelativeTime } from '@/utils/dateUtils';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function RoomPostDetailPage() {
  const { roomPostId } = useParams<{ roomPostId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useGetRoomPostDetail(roomPostId!, {
    query: {
      enabled: !!roomPostId,
    },
  });

  const isOwner = isAuthenticated && user && post && user.userId === post.userId;

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <Skeleton className="h-10 w-32 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <Button variant="ghost" onClick={() => navigate('/room-posts')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>
        <Alert variant="destructive">
          <AlertDescription>
            {error instanceof Error && error.message.includes('404')
              ? '投稿が見つかりませんでした'
              : '投稿の読み込みに失敗しました'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate('/room-posts')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>

        {isOwner && (
          <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            削除
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.userAvatarUrl} alt={post.userNickname} />
            <AvatarFallback>{post.userNickname.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{post.userNickname}</span>
            <span className="text-sm text-muted-foreground">
              {formatRelativeTime(post.createdAt)}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 画像 */}
          <div className="rounded-lg overflow-hidden">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" />
          </div>

          {/* タイトル */}
          <h1 className="text-2xl font-bold">{post.title}</h1>

          {/* 説明文 */}
          {post.description && (
            <p className="text-muted-foreground whitespace-pre-wrap">{post.description}</p>
          )}

          {/* 投稿日時 */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              作成日時: {new Date(post.createdAt).toLocaleString('ja-JP')}
            </p>
            {post.updatedAt !== post.createdAt && (
              <p className="text-xs text-muted-foreground">
                更新日時: {new Date(post.updatedAt).toLocaleString('ja-JP')}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 削除確認ダイアログ */}
      {isOwner && (
        <DeleteRoomPostDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          postId={post.id}
        />
      )}
    </div>
  );
}
