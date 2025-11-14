import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomAvatar } from "../components/ui/custom-avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import Header from "../components/layout/Header";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="w-full flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 pb-2">
              <div className="flex justify-center">
                <div className="relative">
                  <CustomAvatar 
                    src="/placeholder-user.jpg" 
                    alt="User"
                    size="xl"
                    className="h-20 w-20 border-2 border-gray-200"
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="text-center space-y-3">
                  <h2 className="text-xl font-semibold">山田 太郎</h2>
                  <div className="text-gray-700 text-sm leading-relaxed px-4">
                    こんにちは！デザインとコーディングが大好きなエンジニアです。
                    新しい技術を学ぶことと、美しいUI/UXを作ることが趣味です。
                    よろしくお願いします！
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate('/profile/edit')}
                  className="w-full flex items-center justify-center space-x-2"
                  variant="outline"
                >
                  <Edit className="h-4 w-4" />
                  <span>プロフィールを編集</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
