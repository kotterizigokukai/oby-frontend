import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import CallbackPage from '@/pages/CallbackPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ProfileEditPage } from '@/pages/ProfileEditPage';
import { RoomPostsPage } from '@/pages/RoomPostsPage';
import { RoomPostDetailPage } from '@/pages/RoomPostDetailPage';
import { CreateRoomPostPage } from '@/pages/CreateRoomPostPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/room-posts" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auth/callback" element={<CallbackPage />} />

      {/* 部屋投稿機能 */}
      <Route path="/room-posts" element={<RoomPostsPage />} />
      <Route path="/room-posts/:roomPostId" element={<RoomPostDetailPage />} />
      <Route
        path="/room-posts/new"
        element={
          <ProtectedRoute>
            <CreateRoomPostPage />
          </ProtectedRoute>
        }
      />

      {/* プロフィール機能 */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <ProfileEditPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
