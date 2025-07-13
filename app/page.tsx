'use client';

import { useState, useEffect } from 'react';
import { getStoredUser, type UserName } from '@/lib/auth';
import LoginForm from '@/components/LoginForm';
import ThoughtsPage from '@/components/ThoughtsPage';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserName | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    setCurrentUser(storedUser);
    setIsLoading(false);
  }, []);

  const handleLogin = (user: UserName) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">❤️</div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <ThoughtsPage initialUser={currentUser} onLogout={handleLogout} />;
}