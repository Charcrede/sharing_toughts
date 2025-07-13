'use client';

import { useState, useEffect } from 'react';
import { getStoredUser, logout, type UserName } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { LogOut, Heart } from 'lucide-react';
import ThoughtsList from './ThoughtsList';
import AddThoughtForm from './AddThoughtForm';

interface ThoughtsPageProps {
  initialUser: UserName | null;
  onLogout: () => void;
}

export default function ThoughtsPage({ initialUser, onLogout }: ThoughtsPageProps) {
  const [currentUser, setCurrentUser] = useState<UserName | null>(initialUser);

  useEffect(() => {
    if (!currentUser) {
      const storedUser = getStoredUser();
      if (storedUser) {
        setCurrentUser(storedUser);
      } else {
        onLogout();
      }
    }
  }, [currentUser, onLogout]);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              currentUser === 'Sacha' ? 'bg-blue-100' : 'bg-pink-100'
            }`}>
              <Heart className={`w-6 h-6 ${
                currentUser === 'Sacha' ? 'text-blue-600' : 'text-pink-600'
              }`} />
            </div>
            <div>
              <h1 className="text-2xl font-light text-gray-800">
                Bienvenue, <span className="font-medium">{currentUser}</span>
              </h1>
              <p className="text-sm text-gray-600">
                Vos pensées partagées avec {currentUser === 'Sacha' ? 'Desti' : 'Sacha'}
              </p>
            </div>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        {/* Add Thought Form */}
        <div className="mb-8">
          <AddThoughtForm currentUser={currentUser} />
        </div>

        {/* Thoughts List */}
        <ThoughtsList currentUser={currentUser} />
      </div>
    </div>
  );
}