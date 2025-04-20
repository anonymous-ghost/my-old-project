import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';

export type Session = {
  id: string;
  filmId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  price: number;
  hall?: string;
};

interface SessionsContextProps {
  sessions: Session[];
  isLoading: boolean;
  addSession: (session: Omit<Session, 'id'>) => void;
  editSession: (id: string, updates: Partial<Omit<Session, 'id'>>) => void;
  deleteSession: (id: string) => void;
}

const SessionsContext = createContext<SessionsContextProps | undefined>(undefined);

const SESSIONS_KEY = 'movie-poster-sessions';
const CART_KEY = 'movie-poster-cart';

const DEMO_SESSIONS: Session[] = [
  {
    id: '1',
    filmId: '1', // Inception
    date: '2025-04-20',
    time: '19:00',
    price: 200,
    hall: 'IMAX'
  },
  {
    id: '2',
    filmId: '2', // The Dark Knight
    date: '2025-04-21',
    time: '20:00',
    price: 180,
    hall: 'Hall 1'
  },
  {
    id: '3',
    filmId: '3', // Interstellar
    date: '2025-04-22',
    time: '18:30',
    price: 220,
    hall: 'IMAX'
  }
];

export const SessionsProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    try {
      setIsLoading(true);
      const stored = localStorage.getItem(SESSIONS_KEY);
      if (stored && stored !== '[]') {
        const parsedSessions = JSON.parse(stored);
        setSessions(parsedSessions);
      } else {
        setSessions(DEMO_SESSIONS);
      }
    } catch (err) {
      console.error('Failed to load sessions:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (session: Omit<Session, 'id'>) => {
    setSessions((prev) => [...prev, { ...session, id: crypto.randomUUID() }]);
  };
  const editSession = (id: string, updates: Partial<Omit<Session, 'id'>>) => {
    setSessions((prev) => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };
  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter(s => s.id !== id));
  };

  return (
    <SessionsContext.Provider value={{ sessions, isLoading, addSession, editSession, deleteSession }}>
      {children}
    </SessionsContext.Provider>
  );
};

export function useSessions() {
  const context = useContext(SessionsContext);
  if (!context) throw new Error('useSessions must be used within SessionsProvider');
  return context;
}

export function useCart() {
  const { sessions } = useSessions();
  const [cartIds, setCartIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartIds));
  }, [cartIds]);

  const addToCart = useCallback((id: string) => {
    setCartIds(ids => ids.includes(id) ? ids : [...ids, id]);
  }, []);
  const removeFromCart = useCallback((id: string) => {
    setCartIds(ids => ids.filter(f => f !== id));
  }, []);
  const isInCart = useCallback((id: string) => cartIds.includes(id), [cartIds]);
  const clearCart = useCallback(() => setCartIds([]), []);

  const cartSessions = sessions.filter(s => cartIds.includes(s.id));

  return { cartIds, cartSessions, addToCart, removeFromCart, isInCart, clearCart };
}
