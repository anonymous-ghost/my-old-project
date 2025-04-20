import { useFilms, useFavorites } from '@/hooks/useFilms';
import { Link } from 'react-router-dom';
import '../styles/animations.css';

function MovieCard({ id, title, poster, rating, genres }: { id: string; title: string; poster: string; rating: number; genres: string[] }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const fav = isFavorite(id);
  const onFavoriteToggle = (id: string) => {
    if (fav) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };
  return (
    <article 
      className="relative group bg-neutral-900 rounded-lg overflow-hidden movie-card"
      role="article"
      aria-label={`Movie: ${title}`}
    >
      <Link to={`/movie/${id}`} className="block">
        <div className="relative aspect-[2/3]">
          <img
            src={poster || '/images/placeholder-movie.png'}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover movie-poster"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/images/placeholder-movie.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-white mb-2 movie-title">{title}</h2>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500 rating-star">★</span>
            <span className="text-white rating">{rating.toFixed(1)}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.slice(0, 3).map(genre => (
              <span
                key={genre}
                className="px-2 py-1 text-xs bg-neutral-800 text-neutral-300 rounded genre-tag"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <button
        onClick={() => onFavoriteToggle(id)}
        className={`absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white favorite-button ${
          isFavorite(id) ? 'active text-red-500' : 'text-white'
        }`}
        aria-label={isFavorite(id) ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite(id) ? '♥' : '♡'}
      </button>
    </article>
  );
}

export default function Home() {
  const { films } = useFilms();
  return (
    <div className="min-h-screen bg-neutral-950 pb-12">
      <header className="text-center py-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">NETFLIX MOVIES</h1>
        <p className="text-neutral-400">Current and New Releases</p>
      </header>
      <div className="px-2 md:px-6">
        {films.length === 0 ? (
          <div className="text-center text-neutral-400 text-lg pt-8">No movies yet. Add some in Admin Panel!</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-screen-xl mx-auto">
            {films.map(film => (
              <MovieCard key={film.id} id={film.id} title={film.title} poster={film.poster} rating={film.rating} genres={film.genres} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
