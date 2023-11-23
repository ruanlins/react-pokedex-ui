import Header from './components/Header';
import Pokedex from './Pages/Pokedex';
import SearchBar from './components/SearchBar';
import Pokemon from './Pages/Pokemon';
import Favorites from './Pages/Favorites';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavContextProvider } from './Contexts/FavContext';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <FavContextProvider>
        <Header />
        <main>
          <SearchBar />
          <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/pokemon/:name" element={<Pokemon />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </FavContextProvider>
    </BrowserRouter>
  );
}

export default App;
