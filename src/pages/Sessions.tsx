import { useFilms } from '@/hooks/useFilms';
import { useSessions } from '@/hooks/useSessions';
import { useState } from 'react';

export default function SessionsPage() {
  const { films } = useFilms();
  const { sessions } = useSessions();
  const [date, setDate] = useState('');
  const [filmId, setFilmId] = useState('');
  const [genre, setGenre] = useState('');

  // Genres list for filter
  const allGenres = Array.from(new Set(films.flatMap(f => f.genres)));

  // Apply filters
  const filtered = sessions.filter(s => {
    const film = films.find(f => f.id === s.filmId);
    return (
      (!date || s.date === date) &&
      (!filmId || s.filmId === filmId) &&
      (!genre || (film && film.genres.includes(genre)))
    );
  });

  return (
    <div className="min-h-screen bg-neutral-950 pb-12">
      <header className="text-center py-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Sessions Schedule</h1>
        <p className="text-neutral-400">Find your session</p>
      </header>
      <div className="max-w-4xl mx-auto px-2 md:px-6 mb-4 flex flex-wrap gap-2 items-center">
        <label className="text-neutral-300">Date: </label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="bg-neutral-800 rounded text-white px-2 py-1"/>
        <label className="ml-2 text-neutral-300">Movie: </label>
        <select value={filmId} onChange={e=>setFilmId(e.target.value)} className="bg-neutral-800 rounded text-white px-2 py-1">
          <option value="">All</option>
          {films.map(f=><option key={f.id} value={f.id}>{f.title}</option>)}
        </select>
        <label className="ml-2 text-neutral-300">Genre: </label>
        <select value={genre} onChange={e=>setGenre(e.target.value)} className="bg-neutral-800 rounded text-white px-2 py-1">
          <option value="">All</option>
          {allGenres.map(g=><option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <div className="max-w-4xl mx-auto px-2 md:px-6">
        {filtered.length === 0 ? (
          <div className="text-center text-neutral-400 pt-8">No sessions found.</div>
        ) : (
          <table className="w-full text-left bg-neutral-900 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-neutral-800">
                <th className="p-2 text-white">Movie</th>
                <th className="p-2 text-white">Date</th>
                <th className="p-2 text-white">Time</th>
                <th className="p-2 text-white">Price</th>
                <th className="p-2 text-white">Hall</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(session => {
                const film = films.find(f=>f.id===session.filmId);
                return (
                  <tr key={session.id} className="border-t border-neutral-800 hover:bg-neutral-800">
                    <td className="p-2">{film ? (
                        <span className="font-semibold text-white">{film.title}</span>
                      ) : (
                        <span className="italic text-neutral-500">Movie deleted</span>
                      )}
                    </td>
                    <td className="p-2 text-neutral-200">{session.date}</td>
                    <td className="p-2 text-neutral-200">{session.time}</td>
                    <td className="p-2 text-neutral-200">{session.price}</td>
                    <td className="p-2 text-neutral-200">{session.hall||'-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
