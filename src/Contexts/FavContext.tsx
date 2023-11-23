import React from 'react';

type IFavContext = {
  favorites: string[] | null;
  handleStorage: (pokemon: string) => void;
};

const FavContext = React.createContext<IFavContext | null>(null);

export const useFav = () => {
  const context = React.useContext(FavContext);
  if (!context) throw new Error('useFav context must be in FavContextProvider');
  return context;
};

export const FavContextProvider = ({ children }: React.PropsWithChildren) => {
  const [favorites, setFavorites] = React.useState<string[] | null>(null);

  React.useEffect(() => {
    const localStorage = window.localStorage.getItem('favorites');
    if (localStorage) {
      setFavorites(localStorage.split(','));
    }
  }, []);

  const handleStorage = (pokemon: string) => {
    const localStorage = window.localStorage.getItem('favorites');
    if (!localStorage) {
      window.localStorage.setItem('favorites', pokemon);
      setFavorites([pokemon]);
    } else {
      handleFavorite(pokemon);
    }
  };

  const handleFavorite = (pokemon: string) => {
    const local = window.localStorage.getItem('favorites');
    if (local) {
      if (!local.includes(pokemon)) {
        const newFav = local.split(',');
        newFav.push(pokemon);
        window.localStorage.setItem('favorites', String(newFav));
        setFavorites([...newFav]);
      } else {
        const newFav = local.split(',');
        const index = newFav.indexOf(pokemon);
        newFav.splice(index, 1);
        window.localStorage.setItem('favorites', String(newFav));
        setFavorites([...newFav]);
      }
    }
  };

  return (
    <FavContext.Provider value={{ favorites, handleStorage }}>
      {children}
    </FavContext.Provider>
  );
};

export default FavContext;
