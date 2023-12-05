import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavbarMobile.module.css';
import Button from '../Forms/Button';
import pokeball from '../../assets/pokeball.svg';
import favorite from '../../assets/favorite.svg';

const NavbarMobile = () => {
  const [mobileMenu, setMobileMenu] = React.useState(false);
  return (
    <>
      <Button className={`${styles.mobileButton} ${mobileMenu && styles.active}`} onClick={() => setMobileMenu(!mobileMenu)}>
        <span id={styles.hamburger}></span>
      </Button>
      <div className={`${styles.iconContainer} ${styles.mobile} ${mobileMenu && styles.active} `}>
        <NavLink to="/">
          <div onClick={() => setMobileMenu(false)} className={`${styles.icon} ${styles.mobile} `}>
            <img src={pokeball} width={30} />
            <p>Pokedex</p>
          </div>
        </NavLink>
        <NavLink to={'/favorites'}>
          <div onClick={() => setMobileMenu(false)} className={`${styles.icon} ${styles.mobile} `}>
            <img src={favorite} width={30} />
            <p>Favorites</p>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default NavbarMobile;
