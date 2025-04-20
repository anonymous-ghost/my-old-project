import { useCart } from '@/hooks/useSessions';
import { useFilms } from '@/hooks/useFilms';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cartSessions, removeFromCart, clearCart } = useCart();
  const { films } = useFilms();
  const total = cartSessions.reduce((sum, s) => sum + (s.price || 0), 0);

  return (
    <div className="min-h-screen bg-neutral-950 pb-12">
      <header className="text-center py-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Cart</h1>
        <p className="text-neutral-400">Your selected sessions</p>
      </header>
      <div className="max-w-3xl mx-auto px-4">
        {cartSessions.length === 0 ? (
          <div className="text-center text-neutral-400 pt-8">Your cart is empty!</div>
        ) : (
          <>
            <table className="w-full text-left bg-neutral-900 rounded-lg overflow-hidden mb-4">
              <thead>
                <tr className="bg-neutral-800">
                  <th className="p-2">Movie</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Hall</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartSessions.map(s => {
                  const film = films.find(f => f.id === s.filmId);
                  return (
                    <tr key={s.id} className="border-t border-neutral-800 hover:bg-neutral-800">
                      <td className="p-2">
                        {film ? (
                          <Link to={`/movie/${film.id}`} className="text-blue-300 underline hover:text-blue-400">{film.title}</Link>
                        ) : (
                          <span className="italic text-neutral-500">Movie deleted</span>
                        )}
                      </td>
                      <td className="p-2">{s.date}</td>
                      <td className="p-2">{s.time}</td>
                      <td className="p-2">{s.hall || '-'}</td>
                      <td className="p-2">{s.price}₴</td>
                      <td className="p-2"><button className="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-900" onClick={()=>removeFromCart(s.id)}>Remove</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between items-center bg-neutral-800 rounded-lg px-4 py-3 mb-3">
              <span className="text-lg text-white font-bold">Total: {total}₴</span>
              <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-800" onClick={clearCart}>Place Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
