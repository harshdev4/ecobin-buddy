import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import {axiosInstance} from '../../utils/axiosInstance'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isPassVisible, setIsPassVisible] = useState(false);
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/login', formData);
      console.log(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>EcoBin <span>Buddy</span></h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <div className={styles.passwordWrapper}>
          <input
            type={isPassVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`${styles.input} ${styles.password}`}
            autoComplete='off'
          />
          {isPassVisible ? <IoIosEyeOff className={styles.eyeIcon} onClick={() => setIsPassVisible(false)} /> : <IoIosEye className={styles.eyeIcon} onClick={() => setIsPassVisible(true)} />}
        </div>
        <button type="submit">Log In</button>
        <p className={styles.redirect}>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
