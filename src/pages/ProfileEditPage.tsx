import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { CustomAvatar } from "../components/ui/custom-avatar";

export const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  
  console.log('ProfileEditPage is rendering');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-50"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold ml-4">プロフィール編集</h1>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-md mx-auto">
        {/* Profile Picture */}
        <div className="flex flex-col items-center py-6">
          <div className="relative">
            <CustomAvatar 
              src="/placeholder-user.jpg" 
              alt="User"
              size="xl"
              className="border-2 border-gray-100"
            />
            <button className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50">
              <Camera className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              名前
            </Label>
            <Input 
              id="name" 
              defaultValue="山田 太郎" 
              className="w-full h-11 text-base border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" 
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              メールアドレス
            </Label>
            <Input 
              id="email" 
              type="email" 
              defaultValue="yamada@example.com" 
              className="w-full h-11 text-base border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              パスワード
            </Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="w-full h-11 text-base border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
            保存する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
