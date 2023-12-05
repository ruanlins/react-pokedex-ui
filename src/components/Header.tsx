import React from 'react';
import styles from './Header.module.css';
import Logo from '../assets/pokemon.svg?react';
import { Link } from 'react-router-dom';
import useMedia from '../Hooks/useMedia';
import NavbarDesktop from './Navbar/NavbarDesktop';
import NavbarMobile from './Navbar/NavbarMobile';

const Header = () => {
  const mobile = useMedia('(max-width:40rem)');
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          <Logo className={styles.logo} />{' '}
        </Link>
        {mobile ? <NavbarMobile /> : <NavbarDesktop />}
      </nav>
    </header>
  );
};

export default Header;
