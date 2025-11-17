import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import Header from '@/components/layout/Header';
import type { UserResponse } from '@/api/generated/openAPIDefinition.schemas';

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string>('');

  const handleGoogleSuccess = (credentialResponse: UserResponse) => {
    console.log('Google Registration Success:', credentialResponse);
    // バックエンドで認証処理が完了
    console.log('登録が完了しました');
  };

  const handleGoogleError = () => {
    setError('Googleアカウントでの登録に失敗しました。もう一度お試しください。');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              アカウントを作成
            </CardTitle>
            <CardDescription className="text-center">
              以下の方法からご登録ください
              <p className="mt">現在、Googleアカウントでのみ登録可能です。</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

          <div className="space-y-4">
            <GoogleLoginButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              buttonText="Googleで登録"
              className="w-full justify-center"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">または</span>
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-600">
            アカウントをお持ちの方は{' '}
            <Link to="/login" className="text-primary hover:underline">
              ログイン
            </Link>
          </div>
        </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default RegisterPage;
