import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const CallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // バックエンドで認証が完了しているため、ユーザー情報を取得
        await checkAuth();

        // プロフィールページへリダイレクト
        navigate('/profile');
      } catch (error) {
        console.error('Authentication callback failed:', error);
        // エラーが発生した場合はログインページへ
        navigate('/login?error=true');
      }
    };

    handleCallback();
  }, [checkAuth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">ログイン処理中...</h2>
        <p className="text-gray-600">しばらくお待ちください</p>
      </div>
    </div>
  );
};

export default CallbackPage;
