import React from 'react';
import styles from './PokemonInfo.module.css';

type PokemonInfo = {
  weight: number;
  height: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
};

const PokemonInfo = ({ weight, height, abilities }: PokemonInfo) => {
  return (
    <div className={styles.infoContainer}>
      <h2>Pokemon Info</h2>
      <div className={styles.infoData}>
        <div>
          <p>Weight</p>
          <span>{(weight / 10).toFixed(1)}</span>
          <p>Height</p>
          <span>{(height / 10).toFixed(1)}</span>
        </div>
        <div>
          <p>Abilities</p>
          {abilities.map((ability) => (
            <span key={ability.ability.name}>{ability.ability.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;
