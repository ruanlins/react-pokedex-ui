import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  return (
    <div className={`${styles.loginForm} animeLeft`}>
      <h1>Log in</h1>
      <form>
        <Input label="Username" />
        <Input label="Password" type="password" />
        <Button>Log in</Button>
      </form>
      <div className={styles.loginRegister}>
        <h1>Register</h1>
        <p>Don't have an account? Register here!</p>
        <Link to={'/login/register'}>
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
