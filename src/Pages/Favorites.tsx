import React from 'react';
import styles from './Favorites.module.css';
import PokedexCard from '../components/Pokedex/PokedexCard';
import { useFav } from '../Contexts/FavContext';
import Loading from '../components/Helper/Loading';
import Image from '../components/Helper/Image';

export type PokemonObj = {
  name: string;
  id: number;
};

const Favorites = () => {
  const [pokemons, setPokemons] = React.useState<PokemonObj[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { favorites } = useFav();

  React.useEffect(() => {
    const pokeObj = async () => {
      if (favorites) {
        setLoading(true);
        const promises = favorites.map(async (pokemon) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
          return await response.json();
        });
        const pokemonObj: PokemonObj[] = await Promise.all(promises);
        setPokemons((prev) => [...prev, ...pokemonObj]);
        setLoading(false);
      }
    };
    pokeObj();
  }, [favorites]);

  if (loading) return <Loading />;
  if (favorites?.length === 0 || favorites === null)
    return (
      <div className={styles.wrapper}>
        <p>It seems you don't have any favorites Pokemons yet!</p>
        <Image src="./src/assets/sadpikachu.png" />
        <p>Add them to your favorites by clicking on the heart icon on the side of their name!</p>
      </div>
    );
  if (favorites)
    return (
      <div className={styles.favorites}>
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <PokedexCard pokemon={pokemon} />
            </li>
          ))}
        </ul>
      </div>
    );
};

export default Favorites;
