import styles from './Login.module.css';
import { Route, Routes } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import LoginCreate from '../components/Login/LoginCreate';
import NotFound from './NotFound';

const Login = () => {
  return (
    <section className={styles.login}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<LoginCreate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default Login;
