import React from 'react';
import { User } from '../types/types';
import * as UserApi from '../api/api';

type IUserContext = {
  userSignup: (credentials: UserApi.SignUpCredentials) => void;
  userLogin: (credentials: UserApi.LoginCredentials) => void;
  userLogout: () => void;
  addPokemon: (name: string) => void;
  removePokemon: (name: string) => void;
  error: string | null;
  loading: boolean;
  user: User | null;
  favorites: string[];
};

const UserContext = React.createContext<IUserContext | null>(null);

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) throw new Error('useUserCOntext must be in FavContextProvider');
  return context;
};

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [favorites, setFavorites] = React.useState([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  //get the logged user
  React.useEffect(() => {
    async function fetchLoggedUser() {
      try {
        const loggedUser = await UserApi.getLoggedInUser();
        setUser(loggedUser);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedUser();
  }, []);

  //get logged user favorites pokemons
  React.useEffect(() => {
    async function getFavorites() {
      if (user) {
        try {
          const userFavorites = await UserApi.getFavorites();
          setFavorites(userFavorites);
        } catch (error) {
          console.error(error);
        }
      }
    }
    getFavorites();
  }, [user]);

  async function userLogin(credentials: UserApi.LoginCredentials) {
    try {
      setLoading(true);
      const user = await UserApi.login(credentials);
      setUser(user);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function userSignup(credentials: UserApi.SignUpCredentials) {
    try {
      setLoading(true);
      const newUser = await UserApi.signUp(credentials);
      setUser(newUser);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function userLogout() {
    try {
      setLoading(true);
      await UserApi.logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addPokemon(name: string) {
    try {
      setLoading(true);
      await UserApi.addPokemon(name);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function removePokemon(name: string) {
    try {
      setLoading(true);
      await UserApi.removePokemon(name);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider value={{ userSignup, userLogin, userLogout, addPokemon, removePokemon, user, favorites, error, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
