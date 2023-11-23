import React from 'react';
import styles from './PokedexCard.module.css';
import Image from '../Helper/Image';
import { Link } from 'react-router-dom';

type PokemonCard = {
  pokemon: {
    name: string;
    id: number;
    sprites?: {
      other: {
        ['official-artwork']: {
          front_default: string;
        };
      };
    };
    types?: [{ type: { name: string } }, { type: { name: string } }?];
  };
};

const PokedexCard = ({ pokemon }: PokemonCard) => {
  return (
    <div className={styles.pokedexCard}>
      <div className={styles.pokedexImg}>
        <Link to={`/pokemon/${pokemon.name}`}>
          <Image src={pokemon.sprites?.other['official-artwork'].front_default} />
        </Link>
      </div>
      <div className={styles.pokedexContainer}>
        <span>N° {pokemon.id.toString().padStart(4, '0')}</span>
        <div className={styles.pokedexName}>
          <p>{pokemon.name}</p>
          <div className={styles.pokedexType}>
            <Image src={`/src/assets/${pokemon.types?.[0].type.name}.ico`} alt="Pokemon Type" title={pokemon.types?.[0].type.name} />
            {pokemon.types?.[1]?.type.name && (
              <Image src={`./src/assets/${pokemon.types?.[1]?.type.name}.ico`} alt="Pokemon Type" title={pokemon.types?.[1]?.type.name} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokedexCard;
