import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from 'react';

export const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold ml-4">プロフィール編集</h1>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-md mx-auto">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder-user.jpg" alt="@user" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <button className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full border border-gray-200">
              <Camera className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              名前
            </Label>
            <Input 
              id="name" 
              placeholder="名前を入力" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              メールアドレス
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="メールアドレスを入力" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <a 
              href="#" 
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              パスワードを変更する
            </a>
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
