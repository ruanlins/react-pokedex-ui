import React from 'react';
import styles from './PokemonStats.module.css';

type PokemonStats = {
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
};

const PokemonStats = ({ stats }: PokemonStats) => {
  return (
    <div className={styles.statsContainer}>
      <h2>Base Stats</h2>
      <div className={styles.statsData}>
        {stats.map((stat) => (
          <div key={stat.stat.name}>
            <p>{stat.stat.name}</p>
            <div className={styles.dataContainer}>
              <span>{stat.base_stat}</span>
              <img src={`/src/assets/${stat.stat.name}.png`} height="25px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;
