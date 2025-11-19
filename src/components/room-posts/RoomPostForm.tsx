import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRoomPostSchema, type CreateRoomPostFormData } from '@/schemas/roomPostSchema';
import { ImageUpload } from './ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RoomPostFormProps {
  onSubmit: (data: CreateRoomPostFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function RoomPostForm({ onSubmit, onCancel, isLoading }: RoomPostFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateRoomPostFormData>({
    resolver: zodResolver(createRoomPostSchema),
  });

  const imageValue = watch('image');

  const handleImageSelect = (file: File) => {
    setValue('image', file, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 画像アップロード */}
      <div className="space-y-2">
        <Label>画像 *</Label>
        <ImageUpload onImageSelect={handleImageSelect} value={imageValue} />
        {errors.image && (
          <Alert variant="destructive">
            <AlertDescription>{errors.image.message}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* タイトル */}
      <div className="space-y-2">
        <Label htmlFor="title">タイトル *</Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="投稿のタイトルを入力"
          maxLength={100}
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      {/* 説明文 */}
      <div className="space-y-2">
        <Label htmlFor="description">説明文（任意）</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="投稿の説明を入力"
          rows={5}
          maxLength={1000}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* ボタン */}
      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            キャンセル
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '投稿中...' : '投稿する'}
        </Button>
      </div>
    </form>
  );
}
