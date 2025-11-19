import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ImageUploadArea from '@/components/post/ImageUploadArea';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    images?: string;
  }>({});

  const MAX_TITLE_LENGTH = 20;

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = 'タイトルを入力してください';
    } else if (title.length > MAX_TITLE_LENGTH) {
      newErrors.title = `タイトルは${MAX_TITLE_LENGTH}文字以内で入力してください`;
    }

    if (!description.trim()) {
      newErrors.description = '説明を入力してください';
    }

    if (images.length === 0) {
      newErrors.images = '画像を1枚以上アップロードしてください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: API処理を実装
    console.log('投稿データ:', {
      title,
      description,
      images,
    });

    // 仮の処理: 投稿一覧画面へ遷移（投稿一覧画面が未実装のため仮）
    // TODO: 投稿一覧画面が実装されたら、適切なパスに変更
    navigate('/posts');
  };

  const handleCancel = () => {
    // 入力内容を破棄して投稿一覧画面へ遷移
    // TODO: 投稿一覧画面が実装されたら、適切なパスに変更
    navigate('/posts');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FBFBF5' }}>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 画像アップロードエリア */}
            <div>
              <ImageUploadArea images={images} onImagesChange={setImages} maxImages={4} />
              {errors.images && <p className="mt-2 text-sm text-red-600">{errors.images}</p>}
            </div>

            {/* タイトル入力 */}
            <div className="space-y-2">
              <Label htmlFor="title">タイトル</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={MAX_TITLE_LENGTH}
                  placeholder="タイトルを入力"
                  className={errors.title ? 'border-red-500' : ''}
                />
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {title.length}/{MAX_TITLE_LENGTH}
                </span>
              </div>
              {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* 説明入力 */}
            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="部屋のこだわりやアイテムについて説明しよう"
                rows={6}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* フッターボタン（画面下部） */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                className="text-gray-600"
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium"
              >
                投稿
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatePostPage;
