import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';

export type Film = {
  id: string;
  title: string;
  description: string;
  genres: string[];
  year: number;
  rating: number;
  poster: string; // base64 або URL
  trailer?: string;
  cast?: string[];
};

const DEMO_FILMS: Film[] = [
  {
    id: '1',
    title: 'Avatar Fire and Ash',
    description: 'The next chapter in the Avatar saga explores new territories and challenges for the Na\'vi.',
    genres: ['Action', 'Adventure', 'Science Fiction', 'Fantasy'],
    year: 2024,
    rating: 8.9,
    poster: '/posters/Avatar Fire and Ash.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver']
  },
  {
    id: '2',
    title: 'Black Bag',
    description: 'A mysterious black bag leads to an intricate web of conspiracy and danger.',
    genres: ['Thriller', 'Mystery', 'Drama'],
    year: 2024,
    rating: 7.8,
    poster: '/posters/Black Bag.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '3',
    title: 'Dune Part Two',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    genres: ['Action', 'Adventure', 'Science Fiction'],
    year: 2024,
    rating: 8.8,
    poster: '/posters/Dune Part Two.jpg',
    trailer: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson']
  },
  {
    id: '4',
    title: 'Eddington',
    description: 'A biographical drama about the life of astronomer Arthur Eddington.',
    genres: ['Drama', 'Biography', 'History'],
    year: 2024,
    rating: 7.5,
    poster: '/posters/Eddington.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '5',
    title: 'Heart Eyes',
    description: 'A romantic comedy that explores modern love in the digital age.',
    genres: ['Comedy', 'Romance'],
    year: 2024,
    rating: 7.2,
    poster: '/posters/Heart Eyes.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '6',
    title: 'Minecraft The Movie',
    description: 'An epic adventure in the world of blocks and crafting comes to life.',
    genres: ['Animation', 'Adventure', 'Family'],
    year: 2024,
    rating: 7.9,
    poster: '/posters/Minecraft The Movie.jpeg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '7',
    title: 'Mission Impossible – The Final Reckoning',
    description: 'Ethan Hunt and his IMF team embark on their most dangerous mission yet.',
    genres: ['Action', 'Adventure', 'Thriller'],
    year: 2024,
    rating: 8.5,
    poster: '/posters/Mission Impossible – The Final Reckoning.jpg',
    trailer: 'https://www.youtube.com/watch?v=2m1drlOZSDw',
    cast: ['Tom Cruise', 'Hayley Atwell', 'Ving Rhames']
  },
  {
    id: '8',
    title: 'Paddington in Peru',
    description: 'Paddington Bear embarks on an adventure in Peru, returning to his roots.',
    genres: ['Family', 'Comedy', 'Adventure'],
    year: 2024,
    rating: 8.0,
    poster: '/posters/Paddington in Peru.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Ben Whishaw', 'Hugh Bonneville', 'Sally Hawkins']
  },
  {
    id: '9',
    title: 'The Witcher Origins',
    description: 'The untold story of the first Witcher and the creation of the monster-hunting warriors.',
    genres: ['Fantasy', 'Adventure', 'Drama'],
    year: 2024,
    rating: 8.2,
    poster: '/posters/The Witcher Origins.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '10',
    title: 'Zootopia 2',
    description: 'Judy Hopps and Nick Wilde return for another adventure in the bustling metropolis of Zootopia.',
    genres: ['Animation', 'Adventure', 'Comedy', 'Family'],
    year: 2024,
    rating: 8.3,
    poster: '/posters/Zootopia 2.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Ginnifer Goodwin', 'Jason Bateman']
  },
  {
    id: '20',
    title: 'Beyond the Stars',
    description: 'The first crewed mission to Alpha Centauri discovers that humanity is not alone in its quest to reach the stars.',
    genres: ['Science Fiction', 'Drama', 'Adventure'],
    year: 2024,
    rating: 8.6,
    poster: '/posters/Beyond the Stars.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Oscar Isaac', 'Jessica Chastain']
  },
  {
    id: '21',
    title: 'Interstellar',
    description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    genres: ['Science Fiction', 'Drama', 'Adventure'],
    year: 2014,
    rating: 8.7,
    poster: '/posters/Interstellar.jpg',
    trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine']
  },
  {
    id: '22',
    title: 'Arctic Dawn',
    description: 'A thrilling survival story set in the harsh Arctic wilderness, where a climate scientist discovers something extraordinary beneath the melting ice.',
    genres: ['Adventure', 'Science Fiction', 'Thriller'],
    year: 2024,
    rating: 7.8,
    poster: '/posters/Arctic Dawn.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '23',
    title: 'Blade Runner 2099',
    description: 'Fifty years after the events of Blade Runner 2049, a new generation of replicants and blade runners face off in a world forever changed by climate collapse.',
    genres: ['Science Fiction', 'Action', 'Thriller'],
    year: 2024,
    rating: 8.4,
    poster: '/posters/Blade Runner 2099.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '24',
    title: 'Neon Knights',
    description: 'In a cyberpunk metropolis, a group of high-tech vigilantes fights against corporate corruption and cyber-crime.',
    genres: ['Science Fiction', 'Action', 'Crime'],
    year: 2024,
    rating: 7.9,
    poster: '/posters/Neon Knights.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '25',
    title: 'Quantum Dreams',
    description: 'A groundbreaking experiment in quantum computing leads to unexpected consequences when researchers discover they can access parallel universes through dreams.',
    genres: ['Science Fiction', 'Mystery', 'Drama'],
    year: 2024,
    rating: 8.1,
    poster: '/posters/Quantum Dreams.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '26',
    title: 'The Great Game',
    description: 'A historical drama depicting the complex political intrigue between British and Russian empires in Central Asia during the 19th century.',
    genres: ['Drama', 'History', 'Thriller'],
    year: 2024,
    rating: 7.7,
    poster: '/posters/The Great Game.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '27',
    title: 'The Jazz Age',
    description: 'A vibrant musical drama set in the roaring 1920s, following the rise of jazz music and social change in American society.',
    genres: ['Drama', 'Music', 'History'],
    year: 2024,
    rating: 8.0,
    poster: '/posters/The Jazz Age.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '28',
    title: 'The Last Samurai Legacy',
    description: 'In modern Japan, the descendant of a legendary samurai must confront both ancient traditions and contemporary challenges.',
    genres: ['Drama', 'Action', 'Cultural'],
    year: 2024,
    rating: 7.6,
    poster: '/posters/The Last Samurai Legacy.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '29',
    title: 'The Lost City of Z',
    description: 'A modern expedition into the Amazon rainforest follows the footsteps of legendary explorer Percy Fawcett in search of an ancient civilization.',
    genres: ['Adventure', 'Mystery', 'Historical'],
    year: 2024,
    rating: 7.9,
    poster: '/posters/The Lost City of Z.png',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  },
  {
    id: '30',
    title: 'The Silk Road',
    description: 'An epic adventure following multiple storylines along the ancient trade routes connecting East and West.',
    genres: ['Adventure', 'Drama', 'Historical'],
    year: 2024,
    rating: 7.8,
    poster: '/posters/The Silk Road.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    cast: ['Unknown Cast']
  }
];

interface FilmsContextProps {
  films: Film[];
  isLoading: boolean;
  error: Error | null;
  addFilm: (film: Omit<Film, 'id'>) => void;
  editFilm: (id: string, updates: Partial<Omit<Film, 'id'>>) => void;
  deleteFilm: (id: string) => void;
}

const FilmsContext = createContext<FilmsContextProps | undefined>(undefined);

const FILMS_KEY = 'movie-poster-films';
const FAVORITES_KEY = 'movie-poster-favorites';

export const FilmsProvider = ({ children }: { children: ReactNode }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load from localStorage or DEMO
  useEffect(() => {
    try {
      setIsLoading(true);
      const stored = localStorage.getItem(FILMS_KEY);
      if (stored && stored !== '[]') {
        const parsedFilms = JSON.parse(stored);
        setFilms(parsedFilms);
      } else {
        setFilms(DEMO_FILMS.filter(film => film.poster !== '/images/placeholder-movie.png'));
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load films'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(FILMS_KEY, JSON.stringify(films));
  }, [films]);

  const addFilm = (film: Omit<Film, 'id'>) => {
    setFilms((prev) => [...prev, { ...film, id: crypto.randomUUID() }]);
  };
  const editFilm = (id: string, updates: Partial<Omit<Film, 'id'>>) => {
    setFilms((prev) => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };
  const deleteFilm = (id: string) => {
    setFilms((prev) => prev.filter(f => f.id !== id));
  };

  return (
    <FilmsContext.Provider value={{ films, isLoading, error, addFilm, editFilm, deleteFilm }}>
      {children}
    </FilmsContext.Provider>
  );
};

export function useFilms() {
  const context = useContext(FilmsContext);
  if (!context) throw new Error('useFilms must be used within FilmsProvider');
  return context;
}

export function useFavorites() {
  const { films } = useFilms();
  const [favIds, setFavIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favIds));
  }, [favIds]);

  const addFavorite = useCallback((id: string) => {
    setFavIds(ids => ids.includes(id) ? ids : [...ids, id]);
  }, []);
  const removeFavorite = useCallback((id: string) => {
    setFavIds(ids => ids.filter(f => f !== id));
  }, []);
  const isFavorite = useCallback((id: string) => favIds.includes(id), [favIds]);

  const favorites = films.filter(f => favIds.includes(f.id));

  return { favoriteIds: favIds, favorites, addFavorite, removeFavorite, isFavorite };
}
