import { Link } from 'react-router-dom'
import { useGetMyProfile } from '@/api/generated/profile'
import Header from '@/components/layout/Header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'

export function ProfilePage() {
  const { data: profile, isLoading, error } = useGetMyProfile()

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

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-destructive">
            プロフィールの読み込みに失敗しました
          </p>
        </div>
      </div>
    )
  }

  const getInitials = (nickname: string) => {
    return nickname.slice(0, 2).toUpperCase()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>プロフィール</CardTitle>
            <CardDescription>あなたのプロフィール情報</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile?.avatarUrl} alt={profile?.nickname} />
                <AvatarFallback>
                  {profile?.nickname ? (
                    getInitials(profile.nickname)
                  ) : (
                    <User className="h-16 w-16" />
                  )}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  ニックネーム
                </h3>
                <p className="mt-1 text-lg">{profile?.nickname}</p>
              </div>

              {profile?.bio && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    自己紹介
                  </h3>
                  <p className="mt-1 whitespace-pre-wrap">{profile.bio}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button asChild>
                <Link to="/profile/edit">プロフィールを編集</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
