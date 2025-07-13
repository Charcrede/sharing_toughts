import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

// Configuration Firebase - REMPLACEZ avec vos propres credentials
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "sharing-thoughts",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Types
export interface Thought {
  id?: string;
  author: 'Sacha' | 'Desti';
  mood: string;
  text: string;
  createdAt: Timestamp;
}

// Ajouter une pensée
export const addThought = async (thought: Omit<Thought, 'id' | 'createdAt'>) => {
  try {
    await addDoc(collection(db, 'thoughts'), {
      ...thought,
      createdAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la pensée:', error);
    throw error;
  }
};

// Écouter les pensées en temps réel
export const subscribeToThoughts = (callback: (thoughts: Thought[]) => void) => {
  const q = query(collection(db, 'thoughts'), orderBy('createdAt', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const thoughts: Thought[] = [];
    snapshot.forEach((doc) => {
      thoughts.push({ id: doc.id, ...doc.data() } as Thought);
    });
    callback(thoughts);
  });
};