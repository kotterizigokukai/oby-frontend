import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Camera, Save, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { CustomAvatar } from "../components/ui/custom-avatar";
// Using standard textarea instead of Textarea component

export const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  
  console.log('ProfileEditPage is rendering');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" strokeWidth={2} />
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
              className="border-2 border-gray-100 h-24 w-24"
            />
            <button className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50">
              <Camera className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-sm font-medium text-gray-700">
              ニックネーム
            </Label>
            <Input 
              id="nickname" 
              type="text" 
              placeholder="表示名を入力" 
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
              自己紹介
            </Label>
            <textarea
              id="bio"
              rows={4}
              placeholder="自己紹介を入力"
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          {/* Save Button */}
          <Button className="w-full mt-6">
            <Save className="h-4 w-4 mr-2" />
            保存する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
