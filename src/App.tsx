import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { ProfileEditPage } from "./pages/ProfileEditPage";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Router>
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* 開発用: 認証チェックを一時的に無効化 */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
