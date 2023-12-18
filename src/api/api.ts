import { User } from '../types/types';

export async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function getLoggedInUser() {
  const response = await fetchData('/', { method: 'GET' });
  return response.json();
}

export type SignUpCredentials = {
  username: string;
  email: string;
  password: string;
};

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export type LoginCredentials = {
  username: string;
  password: string;
};

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData('/logout', { method: 'POST' });
}

export async function addPokemon(pokeName: string) {
  await fetchData('/favorites/add', { method: 'POST', body: JSON.stringify(pokeName) });
}

export async function removePokemon(pokeName: string) {
  await fetchData('/favorites/remove', { method: 'POST', body: JSON.stringify(pokeName) });
}

export async function getFavorites() {
  const reponse = await fetchData('/favorites', { method: 'GET' });
  return reponse.json();
}
