import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

const LoginPage: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">アカウントにログイン</CardTitle>
          <CardDescription className="text-center">
            以下の方法からログインしてください
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-4">
            <GoogleLoginButton className="w-full flex justify-center" />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">または</span>
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
    </div>
  );
};

export default LoginPage;
