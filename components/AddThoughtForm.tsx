'use client';

import { useState } from 'react';
import { addThought } from '@/lib/firebase';
import { type UserName } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Heart } from 'lucide-react';

interface AddThoughtFormProps {
  currentUser: UserName;
}

const moods = [
  '😊', '😔', '🤔', '😍', '😴', '🎉', '😌', '🥰', 
  '💭', '✨', '🌸', '💙', '🌟', '💝', '🦋', '🌈'
];

export default function AddThoughtForm({ currentUser }: AddThoughtFormProps) {
  const [text, setText] = useState('');
  const [selectedMood, setSelectedMood] = useState('😊');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) return;

    setIsSubmitting(true);
    
    try {
      await addThought({
        author: currentUser,
        mood: selectedMood,
        text: text.trim()
      });
      
      setText('');
      setSelectedMood('😊');
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Comment vous sentez-vous ?
            </label>
            
            <div className="grid grid-cols-8 gap-2">
              {moods.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setSelectedMood(mood)}
                  className={`p-3 rounded-full flex justify-center items-center text-xl transition-all duration-200 hover:scale-110 ${
                    selectedMood === mood
                      ? 'bg-blue-100 ring-2 ring-blue-300 scale-110'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Votre pensée
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Partagez ce qui vous traverse l'esprit..."
              className="min-h-[120px] resize-none border-gray-200 focus:border-2 focus:border-blue-300 focus:ring-blue-200 focus-visible:!ring-0 focus-visible:!ring-transparent"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={!text.trim() || isSubmitting}
            className={`w-full h-12 transition-all duration-300 ${
              currentUser === 'Sacha'
                ? 'bg-blue-400 hover:bg-blue-500'
                : 'bg-pink-400 hover:bg-pink-500'
            } text-white border-0`}
          >
            {isSubmitting ? (
              'Envoi en cours...'
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Partager cette pensée
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}