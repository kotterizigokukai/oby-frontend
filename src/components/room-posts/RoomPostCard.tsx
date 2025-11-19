import { Link } from 'react-router-dom';
import type { RoomPostListItemResponse } from '@/api/generated/openAPIDefinition.schemas';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatRelativeTime } from '@/utils/dateUtils';
import { useState } from 'react';

interface RoomPostCardProps {
  post: RoomPostListItemResponse;
}

export function RoomPostCard({ post }: RoomPostCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link to={`/room-posts/${post.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="flex flex-row items-center gap-3 pb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.userAvatarUrl} alt={post.userNickname} />
            <AvatarFallback>{post.userNickname.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{post.userNickname}</span>
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(post.createdAt)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          {/* 画像表示 */}
          <div className="relative w-full mb-3 bg-muted rounded-md overflow-hidden">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-muted w-full h-full" />
              </div>
            )}
            {imageError ? (
              <div className="w-full aspect-video flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">画像の読み込みに失敗しました</span>
              </div>
            ) : (
              <img
                src={post.imageUrl}
                alt={post.title}
                className={`w-full h-auto object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            )}
          </div>

          {/* タイトルと説明文 */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg line-clamp-2">{post.title}</h3>
            {post.description && (
              <p className="text-sm text-muted-foreground line-clamp-3">{post.description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
