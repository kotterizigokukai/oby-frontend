import React from 'react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

interface GoogleLoginButtonProps {
  buttonText?: string;
  className?: string;
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080';

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  buttonText = 'Googleでログイン',
  className = '',
}) => {
  const handleClick = () => {
    // バックエンドのOAuth2エンドポイントにリダイレクト
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={`w-full ${className}`}
      onClick={handleClick}
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      {buttonText}
    </Button>
  );
};

export default GoogleLoginButton;
