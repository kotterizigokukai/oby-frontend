import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import Header from '@/components/layout/Header';

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse: any) => {
    console.log('Login Success:', credentialResponse);
    // ここでバックエンドに認証情報を送信する処理を追加
    // 成功したらダッシュボードなどにリダイレクト
    navigate('/dashboard');
  };

  const handleError = () => {
    console.error('Login Failed');
    setError('Googleログインに失敗しました。もう一度お試しください。');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              アカウントにログイン
            </CardTitle>
            <CardDescription className="text-center">
              サービスをご利用になるにはログインしてください
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <GoogleLoginButton 
                onSuccess={handleSuccess}
                onError={handleError}
                className="w-full flex justify-center"
              />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    または
                  </span>
                </div>
              </div>
              
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  アカウントをお持ちでない場合は、
                  <Link to="/register" className="font-medium text-primary hover:underline">
                    新規登録
                  </Link>
                  またはGoogleアカウントでログインできます
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LoginPage;
