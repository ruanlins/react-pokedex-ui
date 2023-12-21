import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './NavbarMobile.module.css';
import Button from '../Forms/Button';
import pokeball from '../../assets/pokeball.svg';
import favorite from '../../assets/favorite.svg';
import login from '../../assets/userLogin.svg';
import logout from '../../assets/userLogout.svg';
import { useUserContext } from '../../Contexts/UserContext';

const NavbarMobile = () => {
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { user, userLogout } = useUserContext();

  const navigate = useNavigate();

  async function handleClick() {
    setMobileMenu(false);
    try {
      userLogout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

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
        {user ? (
          <div>
            <div onClick={handleClick} className={`${styles.icon} ${styles.mobile} `}>
              <img src={logout} width={30} />
              <p>Logout</p>
            </div>
          </div>
        ) : (
          <NavLink to={'/login'}>
            <div onClick={() => setMobileMenu(false)} className={`${styles.icon} ${styles.mobile} `}>
              <img src={login} width={30} />
              <p>Login</p>
            </div>
          </NavLink>
        )}
      </div>
    </>
  );
};

export default NavbarMobile;
