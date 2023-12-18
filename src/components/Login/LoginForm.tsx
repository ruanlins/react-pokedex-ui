import React from 'react';
import Button from '../Forms/Button';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../../api/api';
import { useUserContext } from '../../Contexts/UserContext';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const { userLogin, error } = useUserContext();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      userLogin(credentials);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`${styles.loginForm} animeLeft`}>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="username"
          label="Username"
          placeholder="Username"
          register={register}
          registerOptions={{ required: { value: true, message: 'Username is required' } }}
        />
        {errors && <span className={styles.error}>{errors.username?.message}</span>}
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          register={register}
          registerOptions={{ required: { value: true, message: 'Password is required' } }}
        />
        {errors && <span className={styles.error}>{errors.password?.message}</span>}
        <Button disabled={isSubmitting}>Log in</Button>
        <p className={styles.error}>{error}</p>
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
