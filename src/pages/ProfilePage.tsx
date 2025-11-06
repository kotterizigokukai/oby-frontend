import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Settings, LogOut, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: <Settings className="h-5 w-5 text-gray-700" />, 
      label: '設定',
      onClick: () => navigate('/settings')
    },
    { 
      icon: <LogOut className="h-5 w-5 text-gray-700" />, 
      label: 'ログアウト',
      onClick: () => console.log('Logout')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold">プロフィール</h1>
        <button 
          onClick={() => navigate('/profile/edit')}
          className="text-blue-600 text-sm font-medium"
        >
          編集
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-6 flex flex-col items-center">
        <div className="relative mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder-user.jpg" alt="@user" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-xl font-bold">山田 太郎</h2>
        <p className="text-gray-500 text-sm">yamada@example.com</p>
      </div>

      {/* Menu Items */}
      <div className="border-t border-b border-gray-100">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-gray-100 rounded-lg">
                {item.icon}
              </div>
              <span className="text-gray-800">{item.label}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        ))}
      </div>

      {/* App Version */}
      <div className="fixed bottom-6 left-0 right-0 text-center">
        <p className="text-xs text-gray-400">アプリバージョン 1.0.0</p>
      </div>
    </div>
  );
};

export default ProfilePage;
