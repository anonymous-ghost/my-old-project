import { useFavorites } from '@/hooks/useFilms';
import { Link } from 'react-router-dom';

function FavoritesPage() {
  const { favorites, isFavorite, removeFavorite } = useFavorites();
  return (
    <div className="min-h-screen bg-neutral-950 pb-12">
      <header className="text-center py-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Favorites</h1>
        <p className="text-neutral-400">Your favorite movies</p>
      </header>
      <div className="px-2 md:px-6">
        {favorites.length === 0 ? (
          <div className="text-center text-neutral-400 text-lg pt-8">You have no favorite movies!</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-screen-xl mx-auto">
            {favorites.map(film => (
              <div key={film.id} className="group relative rounded-lg overflow-hidden shadow-lg bg-neutral-900">
                <Link to={`/movie/${film.id}`}>
                  <img
                    src={film.poster || '/images/placeholder-movie.png'}
                    alt={film.title}
                    className="w-full object-cover h-60 sm:h-72 max-h-[350px] bg-neutral-800"
                    style={{ maxHeight: 350 }}
                  />
                </Link>
                <div className="absolute top-2 right-2 z-10">
                  <button
                    aria-label={'Remove from favorites'}
                    className="rounded-full p-2 bg-black/70 hover:bg-red-500/80 transition-colors text-red-400"
                    onClick={() => removeFavorite(film.id)}
                  >
                    ♥
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-900/90 to-transparent p-2">
                  <h3 className="text-lg font-semibold text-white truncate" title={film.title}>{film.title}</h3>
                  <span className="text-yellow-400 font-bold">★ {film.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
