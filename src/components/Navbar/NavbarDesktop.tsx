import React from 'react';
import styles from './NavbarDesktop.module.css';
import { NavLink } from 'react-router-dom';
import pokeball from '../../assets/pokeball.svg';
import favorite from '../../assets/favorite.svg';

const NavbarDesktop = () => {
  return (
    <div className={`${styles.iconContainer}`}>
      <NavLink to="/">
        <div className={`${styles.icon}`}>
          <img src={pokeball} width={30} />
          <p>Pokedex</p>
        </div>
      </NavLink>
      <NavLink to={'/favorites'}>
        <div className={`${styles.icon}`}>
          <img src={favorite} width={30} />
          <p>Favorites</p>
        </div>
      </NavLink>
    </div>
  );
};

export default NavbarDesktop;
