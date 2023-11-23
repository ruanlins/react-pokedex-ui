import React from 'react';
import styles from './Header.module.css';
import Logo from '../assets/pokemon.svg?react';
import pokeballLogo from '../assets/pokeball.svg';
import favoriteLogo from '../assets/heart.svg';
import { Link, NavLink } from 'react-router-dom';
import useMedia from '../Hooks/useMedia';
import Button from './Forms/Button';

const Header = () => {
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const mobile = useMedia('(max-width:40rem)');
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          <Logo className={styles.logo} />{' '}
        </Link>
        {mobile && (
          <Button
            className={`${styles.mobileButton} ${mobileMenu && styles.active}`}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <span id={styles.hamburger}></span>
          </Button>
        )}
        <div
          className={`${styles.iconContainer} ${mobile && styles.mobile} ${
            mobile && mobileMenu && styles.active
          } `}
        >
          <NavLink to="/">
            <div
              onClick={() => setMobileMenu(false)}
              className={`${styles.icon} ${mobile && styles.mobile} `}
            >
              <img src={pokeballLogo} width={30} />
              <p>Pokedex</p>
            </div>
          </NavLink>
          <NavLink to={'/favorites'}>
            <div
              onClick={() => setMobileMenu(false)}
              className={`${styles.icon} ${mobile && styles.mobile} `}
            >
              <img src={favoriteLogo} width={30} />
              <p>Favorites</p>
            </div>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
