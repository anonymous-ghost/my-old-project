import { useParams, useNavigate } from 'react-router-dom';
import { useFilms, useFavorites } from '@/hooks/useFilms';
import { useSessions, useCart } from '@/hooks/useSessions';
import { FC, memo } from 'react';

interface Film {
  id: string;
  title: string;
  poster?: string;
  year: number;
  rating: number;
  genres: string[];
  description: string;
  trailer?: string;
  cast?: string[];
}

interface Session {
  id: string;
  filmId: string;
  date: string;
  time: string;
  hall?: string;
  price: number;
}

const PLACEHOLDER_IMAGE = '/images/placeholder-movie.png';

const MoviePoster: FC<{ film: Film; isFavorite: boolean; onFavoriteToggle: () => void }> = memo(({ film, isFavorite, onFavoriteToggle }) => (
  <div className="flex-shrink-0 mx-auto md:mx-0">
    <img
      src={film.poster || PLACEHOLDER_IMAGE}
      alt={film.title}
      className="rounded-lg shadow-xl max-h-[400px] md:max-h-[500px] w-auto object-contain"
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        img.src = PLACEHOLDER_IMAGE;
      }}
    />
    <button
      className={`mt-4 w-full rounded p-2 bg-black/60 hover:bg-red-500/80 transition-colors text-lg font-semibold ${isFavorite ? 'text-red-400' : 'text-white'}`}
      onClick={onFavoriteToggle}
      aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    >
      {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
    </button>
  </div>
));

const MovieMetadata: FC<{ year: number; rating: number; genres: string[] }> = memo(({ year, rating, genres }) => (
  <div className="flex flex-wrap gap-3 items-center mb-2" role="group" aria-label="Movie details">
    <span className="rounded bg-red-600 px-2 py-1 text-white text-xs font-bold" title="Release year">{year}</span>
    <span className="rounded bg-yellow-700 px-2 py-1 text-yellow-200 text-xs font-bold" title="Rating">★ {rating.toFixed(1)}</span>
    {genres.map(genre => (
      <span key={genre} className="rounded bg-neutral-800 px-2 py-1 text-white text-xs" role="listitem">{genre}</span>
    ))}
  </div>
));

const CastList: FC<{ cast: string[] }> = memo(({ cast }) => (
  <div className="mb-2">
    <h2 className="text-white inline font-bold">Cast:</h2>
    <ul className="inline ml-2 text-neutral-300" role="list">
      {cast.map((actor, index) => (
        <li className="inline" key={`${actor}-${index}`} role="listitem">
          {actor}{index < cast.length - 1 ? ', ' : ''}
        </li>
      ))}
    </ul>
  </div>
));

const TrailerButton: FC<{ url: string }> = memo(({ url }) => (
  <div className="my-4">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-neutral-800 rounded px-4 py-2 text-blue-300 font-semibold mb-1 hover:bg-blue-950 transition-colors"
      aria-label="Watch movie trailer (opens in new tab)"
    >
      <span aria-hidden="true">▶</span>
      Watch Trailer
    </a>
  </div>
));

const MovieInfo: FC<{ film: Film }> = memo(({ film }) => (
  <article>
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{film.title}</h1>
    <MovieMetadata year={film.year} rating={film.rating} genres={film.genres} />
    <p className="text-neutral-200 mb-4 whitespace-pre-line">{film.description}</p>
    {film.trailer && <TrailerButton url={film.trailer} />}
    {film.cast && film.cast.length > 0 && <CastList cast={film.cast} />}
  </article>
));

const SessionsList: FC<{
  sessions: Session[];
  isInCart: (id: string) => boolean;
  onCartToggle: (id: string) => void;
}> = memo(({ sessions, isInCart, onCartToggle }) => (
  <div className="mt-8">
    <h2 className="text-xl text-white mb-2 font-bold">Sessions:</h2>
    {sessions.length === 0 ? (
      <span className="text-neutral-400">No sessions for this movie.</span>
    ) : (
      <ul>
        {sessions.map(s => {
          const inCart = isInCart(s.id);
          return (
            <li key={s.id} className="mb-2 flex gap-3 items-center">
              <span className="px-2 py-1 rounded bg-neutral-800 text-white text-xs">{s.date} {s.time}</span>
              <span className="px-2 py-1 rounded bg-neutral-900 text-white text-xs">{s.hall || '-'}</span>
              <span className="px-2 py-1 rounded bg-yellow-700 text-yellow-200 text-xs">{s.price}₴</span>
              <button
                className={`ml-2 px-2 py-1 text-xs rounded ${inCart ? 'bg-red-600 text-white hover:bg-red-800' : 'bg-blue-700 text-white hover:bg-blue-900'}`}
                onClick={() => onCartToggle(s.id)}
                aria-label={inCart ? 'Remove from Cart' : 'Add to Cart'}
              >
                {inCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>
            </li>
          );
        })}
      </ul>
    )}
  </div>
));

const MovieDetails: FC = () => {
  const { id } = useParams();
  const { films, isLoading: isFilmsLoading, error: filmsError } = useFilms();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { sessions, isLoading: isSessionsLoading } = useSessions();
  const { isInCart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!id) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center text-white py-12">
          <h1 className="text-2xl mb-4">Invalid movie ID</h1>
          <button 
            onClick={() => navigate(-1)} 
            className="underline hover:text-blue-400 transition-colors"
            aria-label="Go back to previous page"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (isFilmsLoading || isSessionsLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center text-white py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (filmsError) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center text-white py-12">
          <h1 className="text-2xl mb-4">Error loading movie</h1>
          <p className="mb-4 text-red-400">{filmsError.message}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="underline hover:text-blue-400 transition-colors"
            aria-label="Go back to previous page"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const film = films.find(f => f.id === id);

  if (!film) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center text-white py-12">
          <h1 className="text-2xl mb-4">Movie not found</h1>
          <button 
            onClick={() => navigate(-1)} 
            className="underline hover:text-blue-400 transition-colors"
            aria-label="Go back to previous page"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const fav = isFavorite(film.id);
  const filmSessions = sessions.filter(s => s.filmId === film.id);

  return (
    <div className="min-h-screen bg-neutral-950 pb-12">
      <div className="max-w-4xl mx-auto px-2 pt-10 flex flex-col md:flex-row gap-8">
        <MoviePoster
          film={film}
          isFavorite={fav}
          onFavoriteToggle={() => fav ? removeFavorite(film.id) : addFavorite(film.id)}
        />
        <div className="flex-1 min-w-0">
          <MovieInfo film={film} />
          <SessionsList
            sessions={filmSessions}
            isInCart={isInCart}
            onCartToggle={(id) => isInCart(id) ? removeFromCart(id) : addToCart(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
