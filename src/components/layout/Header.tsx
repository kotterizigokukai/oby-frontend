import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            散らかリアル
          </Link>
          <div className="flex space-x-4">
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
          </div>
        </div>
      </div>
    </header>
  );
}
