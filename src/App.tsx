import { BrowserRouter as Router } from 'react-router-dom';
import { FilmsProvider } from '@/hooks/useFilms';
import { SessionsProvider } from '@/hooks/useSessions';
import { Navigation } from '@/components/Navigation';
import AppRoutes from './routes';
import './styles/animations.css';
import Footer from './components/Footer';


export default function App() {
  return (
    <Router>
      <FilmsProvider>
        <SessionsProvider>
          <div className="min-h-screen bg-neutral-950">
            <Navigation />
            <main className="p-4">
              <AppRoutes />
            </main>

            <Footer />
          </div>
        </SessionsProvider>
      </FilmsProvider>
    </Router>
  );
}
