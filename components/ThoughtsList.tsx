'use client';

import { useState, useEffect } from 'react';
import { subscribeToThoughts, type Thought } from '@/lib/firebase';
import { type UserName } from '@/lib/auth';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ThoughtsListProps {
  currentUser: UserName;
}

export default function ThoughtsList({ currentUser }: ThoughtsListProps) {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToThoughts((newThoughts) => {
      setThoughts(newThoughts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-3xl h-36 w-full shadow-sm"></div>
          </div>
        ))}
      </div>
    );
  }

  if (thoughts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative">
          <div className="text-7xl mb-6 animate-bounce">💭</div>
          <div className="absolute inset-0 text-7xl mb-6 opacity-20 blur-sm">💭</div>
        </div>
        <h3 className="text-2xl font-light text-slate-700 mb-3">
          Aucune pensée pour le moment
        </h3>
        <p className="text-slate-500 text-lg">
          Soyez le premier à partager une pensée !
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {thoughts.map((thought, index) => (
        <div
          key={thought.id}
          className={`animate-in fade-in slide-in-from-bottom-4 duration-700 ${thought.author === 'Sacha' ? 'mr-6' : 'ml-6'
            }`}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div
            className={`relative rounded-3xl overflow-hidden pb-8 shadow-lg border-2 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${thought.author === 'Sacha'
              ? 'bg-gray-50 hover:from-pink-100 hover:to-rose-100'
              : 'bg-gray-50 hover:from-blue-100 hover:to-sky-100'
              }`}
          >

            <div className={` px-5 pt-5 pb-3 flex items-center gap-4 mb-4 ${thought.author === 'Sacha' ? 'justify-start bg-pink-200' : 'justify-end bg-blue-200'
              }`}>
              <div className={`flex items-center gap-3 ${thought.author === 'Sacha' ? 'flex-row' : 'flex-row-reverse'
                }`}>
                <div className={`text-3xl p-2 rounded-full ${thought.author === 'Sacha'
                  ? 'bg-pink-200 shadow-sm'
                  : 'bg-blue-200 shadow-sm'
                  }`}>
                  {thought.mood}
                </div>
                <div className={thought.author === 'Sacha' ? 'text-left' : 'text-right'}>
                  <span className={`font-semibold text-lg ${thought.author === 'Sacha' ? 'text-pink-800' : 'text-blue-800'
                    }`}>
                    {thought.author}
                  </span>
                  <div className="relative group">
                    <p className="text-sm text-slate-600 font-medium cursor-pointer transition duration-200 group-hover:text-slate-800">
                      {formatDistanceToNow(thought.createdAt.toDate(), {
                        addSuffix: true,
                        locale: fr
                      })}
                    </p>

                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center px-3 py-1 rounded-md bg-slate-50 text-slate-800 text-xs shadow-lg animate-fadeIn z-50">
                      {thought.createdAt.toDate().toLocaleString('fr-FR')}
                      <div className="absolute w-2 h-2 bg-slate-50 rotate-45 bottom-[-4px] left-1/2 -translate-x-1/2"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className={`relative ${thought.author === 'Sacha' ? 'text-left' : 'text-right'
              }`}>
              <p className="px-8 text-slate-600 leading-relaxed text-lg font-medium">
                {thought.text}
              </p>
              {/* Petit accent visuel */}
              <div className={`absolute -bottom-2 w-12 h-1 rounded-full ${thought.author === 'Sacha'
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 left-8'
                : 'bg-gradient-to-r from-blue-400 to-sky-400 right-8'
                }`}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}