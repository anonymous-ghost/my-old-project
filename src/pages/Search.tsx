import { useFilms, useFavorites } from '@/hooks/useFilms';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SearchPage() {
  const { films } = useFilms();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  // Genres list for filter
  const allGenres = Array.from(new Set(films.flatMap(f => f.genres)));
  const yearOptions = Array.from(new Set(films.map(f => f.year))).sort((a, b) => b - a);

  // Apply filters
  const filtered = films.filter(f =>
    (!title || f.title.toLowerCase().includes(title.toLowerCase())) &&
    (!genre || f.genres.includes(genre)) &&
    (!year || String(f.year) === year) &&
    (!rating || f.rating >= Number(rating))
  );

  return (
    <div className="min-h-screen bg-neutral-950 pb-12">
      <header className="text-center py-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Search</h1>
        <p className="text-neutral-400">Find movies by filters</p>
      </header>
      <div className="w-full max-w-3xl mx-auto px-2 flex flex-wrap gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Title..."
          className="flex-1 min-w-[120px] p-2 rounded bg-neutral-800 text-white"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <select value={genre} onChange={e=>setGenre(e.target.value)} className="rounded bg-neutral-800 text-white p-2">
          <option value="">All genres</option>
          {allGenres.map(g=><option key={g} value={g}>{g}</option>)}
        </select>
        <select value={year} onChange={e=>setYear(e.target.value)} className="rounded bg-neutral-800 text-white p-2">
          <option value="">Any year</option>
          {yearOptions.map(y=><option key={y} value={y}>{y}</option>)}
        </select>
        <select value={rating} onChange={e=>setRating(e.target.value)} className="rounded bg-neutral-800 text-white p-2">
          <option value="">Any rating</option>
          {[10,9,8,7,6,5].map(r=><option key={r} value={r}>{r}+</option>)}
        </select>
      </div>
      <div className="px-2 md:px-6">
        {filtered.length === 0 ? (
          <div className="text-center text-neutral-400 pt-8">No movies found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-screen-xl mx-auto">
            {filtered.map(film => {
              const fav = isFavorite(film.id);
              return (
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
                      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
                      className={`rounded-full p-2 bg-black/70 hover:bg-red-500/80 transition-colors ${fav ? 'text-red-400' : 'text-white'}`}
                      onClick={() => fav ? removeFavorite(film.id) : addFavorite(film.id)}
                    >
                      {fav ? '♥' : '♡'}
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-900/90 to-transparent p-2">
                    <h3 className="text-lg font-semibold text-white truncate" title={film.title}>{film.title}</h3>
                    <span className="text-yellow-400 font-bold">★ {film.rating.toFixed(1)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
