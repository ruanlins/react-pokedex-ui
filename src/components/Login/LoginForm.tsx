import React from 'react';
import Button from '../Forms/Button';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../../api/api';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  return (
    <div className={`${styles.loginForm} animeLeft`}>
      <h1>Log in</h1>
      <form>
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
