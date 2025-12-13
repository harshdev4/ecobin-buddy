import React, { useRef, useState } from 'react';
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import {axiosInstance} from '../../utils/axiosInstance'
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader'
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isPassVisible, setIsPassVisible] = useState(false);

  const {setUser, loading, setLoading} = useAuth();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post('/signup', formData);
      setUser(res.data.user);
      toast.success("Signed in successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loader></Loader>}
      <img className={styles.logo} src='/images/logo-icon.png'/>
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
