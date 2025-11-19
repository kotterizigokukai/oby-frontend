import { useInfiniteQuery } from '@tanstack/react-query';
import { getRoomPosts, getGetRoomPostsQueryKey } from '@/api/generated/room-post';
import { RoomPostCard } from '@/components/room-posts/RoomPostCard';
import { CreatePostFAB } from '@/components/room-posts/CreatePostFAB';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useRef } from 'react';

export function RoomPostsPage() {
  const { isAuthenticated } = useAuth();
  const observerTarget = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: getGetRoomPostsQueryKey(),
      queryFn: ({ pageParam }) => getRoomPosts({ cursor: pageParam, limit: 10 }),
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore && lastPage.nextCursor ? lastPage.nextCursor : undefined;
      },
      initialPageParam: undefined as string | undefined,
    });

  // 無限スクロール実装
  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-6">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-6">
        <Alert variant="destructive">
          <AlertDescription>
            投稿の読み込みに失敗しました。
            {error instanceof Error && `: ${error.message}`}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const posts = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">投稿一覧</h1>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">まだ投稿がありません</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <RoomPostCard key={post.id} post={post} />
          ))}

          {/* 無限スクロール用の検知要素 */}
          <div ref={observerTarget} className="py-4">
            {isFetchingNextPage && (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            )}
          </div>

          {!hasNextPage && posts.length > 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">すべての投稿を表示しました</p>
            </div>
          )}
        </div>
      )}

      {/* FABボタン（認証済みユーザーのみ表示） */}
      {isAuthenticated && <CreatePostFAB />}
    </div>
  );
}
