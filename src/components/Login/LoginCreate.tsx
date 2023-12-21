import React from 'react';
import styles from './LoginCreate.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { Link } from 'react-router-dom';
import { SignUpCredentials } from '../../api/api';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../Contexts/UserContext';

const LoginCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  const { error, userSignup } = useUserContext();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      userSignup(credentials);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`${styles.loginCreate} animeLeft`}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="username"
          label="Username"
          placeholder="Username"
          register={register}
          registerOptions={{
            required: { value: true, message: 'Username is required' },
            minLength: { value: 4, message: 'Username must contain at least 4 characters' },
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
            pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email format not valid' },
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
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: 'Password must contain at least 8 characters, 1 uppercase and lowercase letter and 1 number',
            },
          }}
        />
        {errors && <span className={styles.error}>{errors.password?.message}</span>}
        <Button disabled={isSubmitting} type="submit">
          Create
        </Button>
        <p className={styles.error}>{error}</p>
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
