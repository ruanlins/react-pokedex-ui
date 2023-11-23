import React from 'react';
import styles from './PokemonText.module.css';

type PokemonText = {
  text: string;
};

const PokemonText = ({ text }: PokemonText) => {
  return (
    <div className={styles.pokemonText}>
      <p>{text}</p>
    </div>
  );
};

export default PokemonText;
