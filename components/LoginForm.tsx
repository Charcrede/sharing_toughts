'use client';

import { useState } from 'react';
import { validatePassword, saveUser, type UserName } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Heart, Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: (user: UserName) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Petite pause pour l'effet
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = validatePassword(password);
    if (user) {
      saveUser(user);
      onLogin(user);
    } else {
      setError('Mot de passe incorrect. Vérifiez votre saisie.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-400 to-pink-400 p-3 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-light text-gray-800">
            Sharing Thoughts
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Un sanctuaire numérique pour vos pensées partagées
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 mt-1 animate-in fade-in duration-300">
                  {error}
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white border-0 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Accéder à nos pensées'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}