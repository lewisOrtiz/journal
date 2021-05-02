import React from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { loginWithGoogle, loginWithEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

import logo from '../../assets/Google__Logo.svg';
export const LoginScreen = () => {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const dispatch = useDispatch();

  const handleLoginWithEmailAndPassword = (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      dispatch(loginWithEmailPassword(email, password));
    }
  };

  const handleLongin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <div className="auth__fade">
      <h1 className="title mb-5">Login</h1>
      <form onSubmit={handleLoginWithEmailAndPassword}>
        <input
          className="auth__input "
          type="text"
          placeholder="Email"
          autoComplete="off"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary btn-block mt-1">
          Login
        </button>
        <p className="text-center text-primary bold mt-5 mb-1">
          Login with social networks
        </p>
        <div className="google-btn" onClick={handleLongin}>
          <div className="google-icon-wrapper">
            <img className="google-icon" src={logo} alt="google button" />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
      </form>
    </div>
  );
};
