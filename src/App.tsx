import { BrowserRouter, Routes, Route } from 'react-router-dom';

// contextos
import { ThemeProvider } from './context/ThemeContext';
import { LibraryProvider } from './context/LibraryContext';

// layout
import { Layout } from './components/layout/Layout';

// páginas
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { LibraryPage } from './pages/LibraryPage';
import { WishlistPage } from './pages/WishlistPage';
import { GameDetailPage } from './pages/GameDetailPage';
import { AddGamePage } from './pages/AddGamePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <LibraryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              
              {/* rutas principales */}
              <Route index element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="library" element={<LibraryPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              
              {/* rutas secundarias / dinámicas */}
              <Route path="library/add" element={<AddGamePage />} />
              <Route path="game/:id" element={<GameDetailPage />} /> 

              {/* ruta comodín (404) */}
              <Route path="*" element={<NotFoundPage />} />
              
            </Route>
          </Routes>
        </BrowserRouter>
      </LibraryProvider>
    </ThemeProvider>
  );
}