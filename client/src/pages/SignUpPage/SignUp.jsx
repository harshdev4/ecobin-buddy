import React, { useRef, useState } from 'react';
import styles from './Signup.module.css';
import { Link } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import {axiosInstance} from '../../utils/axiosInstance'

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isPassVisible, setIsPassVisible] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/signup', formData);
      console.log(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>EcoBin <span>Buddy</span></h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
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
          {isPassVisible ? <IoIosEyeOff className={styles.eyeIcon} onClick={()=> setIsPassVisible(false)}/> : <IoIosEye className={styles.eyeIcon} onClick={()=> setIsPassVisible(true)}/> }
        </div>
        <button type="submit">Sign Up</button>
        <p className={styles.redirect}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
