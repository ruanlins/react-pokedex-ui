import Header from './components/Header';
import Pokedex from './Pages/Pokedex';
import SearchBar from './components/SearchBar';
import Pokemon from './Pages/Pokemon';
import Favorites from './Pages/Favorites';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import { UserContextProvider } from './Contexts/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
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
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
