import React from 'react';
import styles from './Pokemon.module.css';
import useFetch from '../Hooks/useFetch';
import PokemonInfo from '../components/Pokemon/PokemonInfo';
import PokemonText from '../components/Pokemon/PokemonText';
import PokemonStats from '../components/Pokemon/PokemonStats';
import Button from '../components/Forms/Button';
import Image from '../components/Helper/Image';
import { useParams } from 'react-router-dom';
import { useFav } from '../Contexts/FavContext';
import Loading from '../components/Helper/Loading';
import Error from '../components/Helper/Error';

type Pokemon = {
  name: string;
  id: number;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types?: [{ type: { name: string } }, { type: { name: string } }?];
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
};

type PokemonSpecies = {
  flavor_text_entries: Array<{
    flavor_text: string;
  }>;
};

const Pokemon = () => {
  const [shiny, setShiny] = React.useState(false);
  const { name } = useParams();
  const pokemonSpecies = useFetch<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

  const pokemon = useFetch<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);

  const { favorites } = useFav();

  React.useEffect(() => {
    setShiny(false);
  }, [name]);

  function handleClick() {
    setShiny((shiny) => !shiny);
  }

  const { handleStorage } = useFav();

  if (pokemon.error || pokemonSpecies.error) return <Error />;
  if (pokemon.loading && pokemonSpecies.loading) return <Loading />;
  if (pokemon.data && pokemonSpecies.data)
    return (
      <div className={styles.pokemon}>
        <div className={styles.title}>
          <h1>
            {pokemon.data.name} <span>N°{pokemon.data.id.toString().padStart(4, '0')}</span>
          </h1>
          {favorites?.includes(pokemon.data.name) ? (
            <p onClick={() => handleStorage(pokemon.data!.name)}>&#128151;</p>
          ) : (
            <p onClick={() => handleStorage(pokemon.data!.name)}>&#128420;</p>
          )}
        </div>
        <div className={styles.pokemonData}>
          <div>
            {shiny ? (
              <Image src={pokemon.data.sprites.other['official-artwork'].front_shiny} alt={`${pokemon.data.name} official shiny artwork`} />
            ) : (
              <Image src={pokemon.data.sprites.other['official-artwork'].front_default} alt={`${pokemon.data.name} official artwork`} />
            )}
            <div className={styles.imageButtons}>
              <Button className={`${shiny && 'active'}`} onClick={handleClick}>
                <img src="/src/assets/shiny.png" height={65} />
              </Button>
            </div>
          </div>
          <div className={styles.pokemonContainers}>
            <PokemonText text={pokemonSpecies.data.flavor_text_entries[1].flavor_text} />
            <PokemonInfo weight={pokemon.data.weight} height={pokemon.data.height} abilities={pokemon.data.abilities} />
            <PokemonStats stats={pokemon.data.stats} />
          </div>
        </div>
      </div>
    );
};

export default Pokemon;
