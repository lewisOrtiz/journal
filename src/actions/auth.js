import { types } from '../types/types';
import { GoogleProvider, firebase } from '../firebase/config';

// import { setError, removeError } from './ui';

import swal from 'sweetalert2';
import { cleanLogout } from './notes';

export const loginWithEmailPassword = (email, password) => {
  return async (dispatch) => {
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(login(user.uid, user.displayName, user.email));
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ocurrio un error inesperado, vueve a intentarlo. (${error.message})`,
      });
    }
  };
};

export const registerWithEmailPassword = (email, password, name) => {
  return async (dispatch) => {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ displayName: name });
      dispatch(login(user.uid, user.displayName, user.email));
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ocurrio un error inesperado, vueve a intentarlo. (${error.message})`,
      });
    }
  };
};

export const loginWithGoogle = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(GoogleProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName, user.email));
      })
      .catch((error) => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Ocurrio un error inesperado, vueve a intentarlo. (${error.message})`,
        });
      });
  };
};
export const login = (uid, displayName, email) => ({
  type: types.login,
  payload: {
    displayName,
    uid,
    email,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch(logout());
      dispatch(cleanLogout());
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => ({
  type: types.logout,
});
