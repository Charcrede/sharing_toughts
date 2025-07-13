export type UserName = 'Sacha' | 'Desti';

const passwords = {
  'cheminrose2025': 'Sacha' as UserName,
  'échosbleus2025': 'Desti' as UserName
};

export const validatePassword = (password: string): UserName | null => {
  return passwords[password as keyof typeof passwords] || null;
};

export const saveUser = (userName: UserName) => {
  localStorage.setItem('sharingThoughtsUser', userName);
};

export const getStoredUser = (): UserName | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('sharingThoughtsUser') as UserName | null;
};

export const logout = () => {
  localStorage.removeItem('sharingThoughtsUser');
};