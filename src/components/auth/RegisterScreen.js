import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { Error } from '../ui/Error';
import { registerWithEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
export const RegisterScreen = () => {
  const { error, message } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(removeError());
  }, [dispatch]);

  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = values;
  const handleRegister = (e) => {
    e.preventDefault();
    if (validation()) {
      dispatch(registerWithEmailPassword(email, password, name));
    }
  };
  const validation = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError('El email debe ser valido'));
      return false;
    } else if (name.trim().length < 2) {
      dispatch(setError('El name debe ser valido'));
      return false;
    } else if (password.trim().length <= 7) {
      dispatch(setError('La contraseña debe tener como mínimo 8 caracteres'));
      return false;
    } else if (password !== confirmPassword || password.length <= 5) {
      dispatch(setError('Las contraseñas deben coincidir'));
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <div className="auth__fade">
      <h1 className="title mb-5">Register</h1>
      {error && <Error message={message} />}

      <form onSubmit={handleRegister}>
        <input
          className="auth__input "
          type="text"
          placeholder="Name"
          autoComplete="off"
          name="name"
          value={name}
          onChange={handleChange}
        />
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
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary btn-block mt-1">
          Signup
        </button>
      </form>
    </div>
  );
};
