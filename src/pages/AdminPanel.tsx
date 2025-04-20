import { useState, useEffect } from 'react';
import { useFilms, type Film } from '@/hooks/useFilms';
import { useSessions, type Session } from '@/hooks/useSessions';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { importFilmsFromExcel } from '@/utils/importFilms';

const GENRES = [
  'Action','Adventure','Animation','Comedy','Crime','Documentary','Drama','Family',
  'Fantasy','History','Horror','Music','Mystery','Romance','Science Fiction','Thriller','War','Western'
];

function getEmptyFilm(): Omit<Film, 'id'> {
  return {
    title: '',
    description: '',
    genres: [],
    year: new Date().getFullYear(),
    rating: 7.5,
    poster: '',
    trailer: '',
    cast: [],
  };
}

function getEmptySession(films: Film[]): Omit<Session,'id'> {
  return {
    filmId: films[0]?.id||'',
    date: new Date().toISOString().slice(0,10),
    time: '19:00',
    price: 200,
    hall: ''
  };
}

async function savePosterFile(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload file');
    }
    
    const data = await response.json();
    return data.filename;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

function FilmForm({initial, onSave, onClose}:{initial?:Partial<Omit<Film,'id'>>,onSave:(data:Omit<Film,'id'>)=>Promise<void>,onClose:()=>void}) {
  const [form, setForm] = useState<Omit<Film,'id'>>(initial ? {...getEmptyFilm(), ...initial} : getEmptyFilm());
  const [posterFile, setPosterFile] = useState<File|null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  // ... handle upload
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPosterFile(file);
      setForm(f => ({ ...f, poster: file.name }));
    }
  }
  return (
    <form className="space-y-4 bg-neutral-900 p-4 rounded-lg" onSubmit={e=>{e.preventDefault();onSave(form);}}>
      <div>
        <label className="block text-white font-semibold mb-1">Title</label>
        <input required className="w-full p-2 rounded bg-neutral-800 text-white" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
      </div>
      <div>
        <label className="block text-white font-semibold mb-1">Description</label>
        <textarea required className="w-full p-2 rounded bg-neutral-800 text-white" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
      </div>
      <div>
        <label className="block text-white font-semibold mb-1">Genres</label>
        <select multiple className="w-full p-2 rounded bg-neutral-800 text-white" value={form.genres} onChange={e=>setForm(f=>({...f, genres: Array.from(e.target.selectedOptions,opt=>opt.value)}))}>
          {GENRES.map(g=><option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-white font-semibold mb-1">Year</label>
          <input type="number" min="1900" max={new Date().getFullYear()} required className="w-full p-2 rounded bg-neutral-800 text-white" value={form.year} onChange={e=>setForm(f=>({...f, year: +e.target.value}))}/>
        </div>
        <div className="w-1/2">
          <label className="block text-white font-semibold mb-1">Rating</label>
          <input type="number" step="0.1" min="0" max="10" required className="w-full p-2 rounded bg-neutral-800 text-white" value={form.rating} onChange={e=>setForm(f=>({...f, rating: +e.target.value}))}/>
        </div>
      </div>
      <div>
        <label className="block text-white font-semibold mb-1">Poster URL</label>
        <input className="w-full p-2 rounded bg-neutral-800 text-white" placeholder="https://..." value={posterFile? undefined : form.poster} onChange={e=>setForm(f=>({...f, poster:e.target.value}))}/>
      </div>
      <div>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFile} 
          className="text-white"
          disabled={isUploading}
        />
        {isUploading && <div className="text-blue-400 mt-2">Uploading poster...</div>}
        {uploadError && <div className="text-red-400 mt-2">{uploadError}</div>}
        {form.poster && (
          <img src={form.poster} className="mt-2 max-h-[120px] rounded" alt="preview" />
        )}
      </div>
      <div>
        <label className="block text-white font-semibold mb-1">Trailer (YouTube link)</label>
        <input className="w-full p-2 rounded bg-neutral-800 text-white" value={form.trailer} onChange={e=>setForm(f=>({...f,trailer:e.target.value}))}/>
      </div>
      <div>
        <label className="block text-white font-semibold mb-1">Cast (comma separated)</label>
        <input className="w-full p-2 rounded bg-neutral-800 text-white" value={form.cast?.join(', ')||''} onChange={e=>setForm(f=>({...f,cast: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)}))}/>
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

function SessionForm({ films, initial, onSave, onClose }:{films:Film[],initial?:Partial<Omit<Session,'id'>>,onSave:(data:Omit<Session,'id'>)=>void,onClose:()=>void}) {
  const [form,setForm]=useState<Omit<Session,'id'>>(initial?{...getEmptySession(films),...initial}:getEmptySession(films));

  if (films.length === 0) {
    return (
      <div className="space-y-4 bg-neutral-900 p-4 rounded-lg text-white">
        <p>Please add some movies first before creating a session.</p>
        <div className="flex justify-end">
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-4 bg-neutral-900 p-4 rounded-lg" onSubmit={e=>{e.preventDefault();onSave(form);}}>
      <div>
        <label className="block text-white font-semibold mb-1">Movie</label>
        <select required className="w-full p-2 rounded bg-neutral-800 text-white" value={form.filmId} onChange={e=>setForm(f=>({...f, filmId:e.target.value}))}>
          {films.map(f=><option key={f.id} value={f.id}>{f.title}</option>)}
        </select>
      </div>
      <div className="flex gap-3">
        <div>
          <label className="block text-white font-semibold mb-1">Date</label>
          <input type="date" className="p-2 rounded bg-neutral-800 text-white" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/>
        </div>
        <div>
          <label className="block text-white font-semibold mb-1">Time</label>
          <input type="time" className="p-2 rounded bg-neutral-800 text-white" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))}/>
        </div>
        <div>
          <label className="block text-white font-semibold mb-1">Price</label>
          <input type="number" min="0" className="w-20 p-2 rounded bg-neutral-800 text-white" value={form.price} onChange={e=>setForm(f=>({...f,price:+e.target.value}))}/>
        </div>
      </div>
      <div>
        <label className="block text-white font-semibold mb-1">Hall (optional)</label>
        <input className="w-full p-2 rounded bg-neutral-800 text-white" value={form.hall||''} onChange={e=>setForm(f=>({...f,hall:e.target.value}))}/>
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

export default function AdminPanel() {
  const { films, addFilm, editFilm, deleteFilm } = useFilms();
  const { sessions, addSession, editSession, deleteSession } = useSessions();
  const [isAddingFilm, setIsAddingFilm] = useState(false);
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [editingFilm, setEditingFilm] = useState<Film | null>(null);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionSearchQuery, setSessionSearchQuery] = useState('');
  
  // Закриваємо всі форми при першому завантаженні
  useEffect(() => {
    setIsAddingFilm(false);
    setIsAddingSession(false);
    setEditingFilm(null);
    setEditingSession(null);
  }, []);
  const filmToEdit = films.find(f=>f.id===editingFilm?.id);
  const sessionToEdit = sessions.find(s=>s.id===editingSession?.id);
  return (
    <div className="min-h-screen bg-neutral-950 text-white py-8 px-2 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Movies</h1>
          <p className="text-neutral-400 text-sm mt-1">Manage your movie catalog</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddingFilm(true)}>Add Movie</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-neutral-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-neutral-800">
              <th className="p-2">Poster</th>
              <th className="p-2">Title</th>
              <th className="p-2">Year</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Genres</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {films
              .filter(film => 
                film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                film.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
              )
              .map(film => (
              <tr key={film.id} className="border-t border-neutral-800 hover:bg-neutral-800">
                <td className="p-2 w-20">
                  <img src={film.poster||'https://same-assets.com/placeholder-movie.png'} className="h-16 rounded bg-neutral-700 object-cover" style={{maxHeight:64}} alt="poster" />
                </td>
                <td className="p-2">{film.title}</td>
                <td className="p-2">{film.year}</td>
                <td className="p-2">{film.rating}</td>
                <td className="p-2 max-w-[120px] truncate">{film.genres.join(', ')}</td>
                <td className="p-2 flex gap-1">
                  <Button size="sm" variant="secondary" onClick={()=>{setEditingFilm(film);setIsAddingFilm(true);}}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={()=>{if(confirm('Delete this movie?'))deleteFilm(film.id);}}>Delete</Button>
                </td>
              </tr>
            ))}
            {films.length === 0 && (
              <tr><td colSpan={6} className="text-center text-neutral-400 p-6">No movies</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Sessions</h2>
          <p className="text-neutral-400 text-sm mt-1">Manage movie sessions and schedules</p>
        </div>
        <Button onClick={() => setIsAddingSession(true)}>Add Session</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-neutral-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-neutral-800">
              <th className="p-2">Movie</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Price</th>
              <th className="p-2">Hall</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions
              .filter(session => {
                const film = films.find(f => f.id === session.filmId);
                return (
                  film?.title.toLowerCase().includes(sessionSearchQuery.toLowerCase()) ||
                  session.hall?.toLowerCase().includes(sessionSearchQuery.toLowerCase())
                );
              })
              .map(session => {
              const film = films.find(f => f.id === session.filmId);
              return (
                <tr key={session.id} className="border-t border-neutral-800 hover:bg-neutral-800">
                  <td className="p-2">{film?.title || 'Unknown Movie'}</td>
                  <td className="p-2">{session.date}</td>
                  <td className="p-2">{session.time}</td>
                  <td className="p-2">{session.price} UAH</td>
                  <td className="p-2">{session.hall || '-'}</td>
                  <td className="p-2 flex gap-1">
                    <Button size="sm" variant="secondary" onClick={()=>{setEditingSession(session);setIsAddingSession(true);}}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={()=>{if(confirm('Delete this session?'))deleteSession(session.id);}}>Delete</Button>
                  </td>
                </tr>
              );
            })}
            {sessions.length === 0 && (
              <tr><td colSpan={6} className="text-center text-neutral-400 p-6">No sessions</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {isAddingFilm && (
        <Dialog open={true} onOpenChange={setIsAddingFilm}>
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="w-full max-w-lg mx-auto">
              <FilmForm
                initial={filmToEdit}
                onSave={async (data) => {
                  if (filmToEdit) {
                    await editFilm(filmToEdit.id, data);
                  } else {
                    await addFilm(data);
                  }
                  setIsAddingFilm(false);
                  setEditingFilm(null);
                }}
                onClose={() => {
                  setIsAddingFilm(false);
                  setEditingFilm(null);
                }}
              />
            </div>
          </div>
        </Dialog>
      )}
      {isAddingSession && (
        <Dialog open={true} onOpenChange={setIsAddingSession}>
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="w-full max-w-lg mx-auto">
              <SessionForm
                films={films}
                initial={sessionToEdit}
                onSave={async (data) => {
                  if (sessionToEdit) {
                    await editSession(sessionToEdit.id, data);
                  } else {
                    await addSession(data);
                  }
                  setIsAddingSession(false);
                  setEditingSession(null);
                }}
                onClose={() => {
                  setIsAddingSession(false);
                  setEditingSession(null);
                }}
              />
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
