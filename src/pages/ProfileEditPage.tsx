import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import {
  useGetMyProfile,
  useUpdateMyProfile,
  useUploadAvatar,
  useDeleteAvatar,
  getGetMyProfileQueryKey,
} from '@/api/generated/profile'
import Header from '@/components/layout/Header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ImageCropDialog } from '@/components/profile/ImageCropDialog'
import { User, Upload, Trash2 } from 'lucide-react'

export function ProfileEditPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const { data: profile, isLoading } = useGetMyProfile()
  const updateProfile = useUpdateMyProfile()
  const uploadAvatar = useUploadAvatar()
  const deleteAvatar = useDeleteAvatar()

  const [nickname, setNickname] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [cropDialogOpen, setCropDialogOpen] = useState(false)

  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname)
      setBio(profile.bio || '')
    }
  }, [profile])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('画像ファイルを選択してください')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setImageSrc(reader.result as string)
      setCropDialogOpen(true)
    }
    reader.readAsDataURL(file)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCropComplete = async (croppedImage: File) => {
    try {
      await uploadAvatar.mutateAsync({ data: { avatar: croppedImage } })
      // プロフィールを再取得してアバター画像を更新
      await queryClient.invalidateQueries({ queryKey: getGetMyProfileQueryKey() })
      setImageSrc(null)
    } catch (err) {
      setError('画像のアップロードに失敗しました')
      console.error(err)
    }
  }

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar.mutateAsync()
      // プロフィールを再取得してアバター画像を更新
      await queryClient.invalidateQueries({ queryKey: getGetMyProfileQueryKey() })
    } catch (err) {
      setError('画像の削除に失敗しました')
      console.error(err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (nickname.length < 1 || nickname.length > 50) {
      setError('ニックネームは1〜50文字で入力してください')
      return
    }

    if (bio.length > 500) {
      setError('自己紹介は500文字以内で入力してください')
      return
    }

    try {
      await updateProfile.mutateAsync({
        data: {
          nickname,
          bio: bio || undefined,
        },
      })
      navigate('/profile')
    } catch (err) {
      setError('プロフィールの更新に失敗しました')
      console.error(err)
    }
  }

  const getInitials = (nickname: string) => {
    return nickname.slice(0, 2).toUpperCase()
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>プロフィール編集</CardTitle>
            <CardDescription>
              プロフィール情報を編集できます
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profile?.avatarUrl} alt={nickname} />
                  <AvatarFallback>
                    {nickname ? (
                      getInitials(nickname)
                    ) : (
                      <User className="h-16 w-16" />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadAvatar.isPending}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    画像をアップロード
                  </Button>
                  {profile?.avatarUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDeleteAvatar}
                      disabled={deleteAvatar.isPending}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      削除
                    </Button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname">ニックネーム *</Label>
                <Input
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="ニックネームを入力"
                  maxLength={50}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {nickname.length} / 50文字
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="自己紹介を入力"
                  maxLength={500}
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">
                  {bio.length} / 500文字
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/profile')}
                >
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? '保存中...' : '保存'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {imageSrc && (
        <ImageCropDialog
          open={cropDialogOpen}
          onOpenChange={setCropDialogOpen}
          imageSrc={imageSrc}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  )
}
