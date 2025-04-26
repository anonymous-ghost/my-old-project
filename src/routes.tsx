import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import FavoritesPage from './pages/Favorites';
import SessionsPage from './pages/Sessions';
import MovieDetails from './pages/MovieDetails';
import SearchPage from './pages/Search';
import CartPage from './pages/Cart';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sessions" element={<SessionsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
    </Routes>
  );
}
