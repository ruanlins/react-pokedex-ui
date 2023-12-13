import React from 'react';
import styles from './LoginCreate.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { Link } from 'react-router-dom';
import { SignUpCredentials } from '../../api/api';
import { useForm } from 'react-hook-form';

const LoginCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  return (
    <div className={`${styles.loginCreate} animeLeft`}>
      <h1>Register</h1>
      <form>
        <Input
          name="username"
          label="Username"
          placeholder="Username"
          register={register}
          registerOptions={{
            required: { value: true, message: 'Username is required' },
            minLength: { value: 8, message: 'Username must contain at least 8 characters' },
          }}
        />
        {errors && <span className={styles.error}>{errors.username?.message}</span>}
        <Input
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          register={register}
          registerOptions={{
            required: { value: true, message: 'Email is required' },
          }}
        />
        {errors && <span className={styles.error}>{errors.email?.message}</span>}
        <Input
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          register={register}
          registerOptions={{
            required: { value: true, message: 'Password is required' },
            minLength: { value: 8, message: 'Password must contain at least 8 characters' },
          }}
        />
        {errors && <span className={styles.error}>{errors.password?.message}</span>}
        <Button type="submit">Create</Button>
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
