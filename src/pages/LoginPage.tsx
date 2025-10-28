import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              アカウントにログイン
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              サービスをご利用になるにはログインしてください
            </p>
          </div>
          
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
          
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <GoogleLoginButton 
                onSuccess={handleSuccess}
                onError={handleError}
                className="w-full flex justify-center"
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
            
            <div className="text-center text-sm">
              <p className="text-gray-600">
                アカウントをお持ちでない場合は、
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  新規登録
                </Link>
                またはGoogleアカウントでログインできます
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
