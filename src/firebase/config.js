import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCVZ_6h4cdsryrutgGkMbM_t2tCgMfriPw',
  authDomain: 'journal-app-8f805.firebaseapp.com',
  projectId: 'journal-app-8f805',
  storageBucket: 'journal-app-8f805.appspot.com',
  messagingSenderId: '974816076821',
  appId: '1:974816076821:web:39f661d05d8812e4c11a1c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

export { firebase, GoogleProvider, db };
