import React from 'react';
import styles from './LoginCreate.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { Link } from 'react-router-dom';

const LoginCreate = () => {
  return (
    <div className={`${styles.loginCreate} animeLeft`}>
      <h1>Register</h1>
      <form>
        <Input label="Username" />
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        <Button>Create</Button>
      </form>
      <div className={styles.registerLogin}>
        <h1>Log in</h1>
        <p>Already have an account? Enter here!</p>
        <Link to={'/login'}>
          <Button>Log in</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginCreate;
