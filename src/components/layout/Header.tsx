import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            散らかリアル
          </Link>
          <nav className="flex items-center space-x-4">
            {/* 投稿一覧リンク（全ユーザー） */}
            {!isLoginPage && !isRegisterPage && (
              <Link
                to="/room-posts"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                投稿一覧
              </Link>
            )}

            {isAuthenticated ? (
              // 認証済みユーザー向けナビゲーション
              <>
                <Link
                  to="/room-posts/new"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  新規投稿
                </Link>
                <Link
                  to="/profile"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  プロフィール
                </Link>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  ログアウト
                </Button>
              </>
            ) : (
              // 認証前ユーザー向けナビゲーション
              <>
                {isLoginPage && (
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    新規登録
                  </Link>
                )}
                {isRegisterPage && (
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    ログイン
                  </Link>
                )}
                {!isLoginPage && !isRegisterPage && (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
                    >
                      ログイン
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      新規登録
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
