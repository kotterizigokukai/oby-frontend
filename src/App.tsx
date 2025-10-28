import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

// シンプルなダッシュボードコンポーネント
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">ダッシュボード</h1>
        <p className="text-gray-600">ログインに成功しました！</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Router>
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
