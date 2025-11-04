import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

interface GoogleLoginButtonProps {
  onSuccess: (credentialResponse: CredentialResponse) => void;
  onError: () => void;
  buttonText?: string;
  className?: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onError,
  buttonText = 'Googleでログイン',
  className = '',
}) => {
  // 環境変数からGoogle Client IDを取得
  // 開発中は.envファイルにVITE_GOOGLE_CLIENT_IDを設定してください
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  if (!clientId) {
    console.error(
      'Google Client ID is not set. Please set VITE_GOOGLE_CLIENT_ID environment variable.'
    );
    return (
      <Button variant="outline" className={`w-full ${className}`} disabled>
        <FcGoogle className="mr-2 h-4 w-4" />
        <span className="ml-2">{buttonText}</span>
      </Button>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap={true}
        type="standard"
        theme="outline"
        size="large"
        text={buttonText.includes('ログイン') ? 'signin_with' : 'signup_with'}
        shape="rectangular"
        logo_alignment="left"
        width="100%"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
