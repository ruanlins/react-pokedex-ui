import React from 'react';
import styles from './NavbarDesktop.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import pokeball from '../../assets/pokeball.svg';
import favorite from '../../assets/favorite.svg';
import login from '../../assets/userLogin.svg';
import logout from '../../assets/userLogout.svg';
import { useUserContext } from '../../Contexts/UserContext';

const NavbarDesktop = () => {
  const { user, userLogout } = useUserContext();

  const navigate = useNavigate();

  async function handleClick() {
    try {
      userLogout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

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
      {user ? (
        <div className={styles.logout} onClick={handleClick}>
          <div className={`${styles.icon} ${styles.mobile} `}>
            <img src={logout} width={30} />
            <p>Logout</p>
          </div>
        </div>
      ) : (
        <NavLink to={'/login'}>
          <div className={`${styles.icon} ${styles.mobile} `}>
            <img src={login} width={30} />
            <p>Login</p>
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default NavbarDesktop;
