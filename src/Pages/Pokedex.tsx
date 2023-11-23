import React from 'react';
import useFetch from '../Hooks/useFetch';
import PokedexCard from '../components/Pokedex/PokedexCard';
import styles from './Pokedex.module.css';
import Button from '../components/Forms/Button';

type Data = {
  results: Pokemon[];
};

type Pokemon = {
  name: string;
  url: string;
};

export type PokemonObj = {
  name: string;
  id: number;
};

const Pokedex = () => {
  const [pokemons, setPokemons] = React.useState<PokemonObj[]>([]);
  const [offset, setOffset] = React.useState(0);
  const [infinite, setInfinite] = React.useState(false);

  // 1017
  const { data } = useFetch<Data>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.9 && !wait) {
          setOffset((prev) => prev + 20);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }

    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite]);

  React.useEffect(() => {
    const pokeObj = async () => {
      if (data) {
        const promises = data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return await response.json();
        });
        const pokemonObj: PokemonObj[] = await Promise.all(promises);
        setPokemons((prev) => [...prev, ...pokemonObj]);
      }
    };
    pokeObj();
  }, [data]);

  return (
    <div className={styles.pokedex}>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <PokedexCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
      {!infinite && (
        <div className={styles.buttonContainer}>
          <Button onClick={() => setInfinite(true)}>LOAD MORE</Button>
        </div>
      )}
    </div>
  );
};
export default Pokedex;
