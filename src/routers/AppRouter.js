import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PrivateRoutes } from '../routers/PrivateRoutes';
import { PublicRoutes } from '../routers/PublicRoutes';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';

import { firebase } from '../firebase/config';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.email));
        dispatch(startLoadingNotes(user.uid));
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
      setIsChecking(false);
    });
  }, [dispatch, setIsChecking, setIsLogged]);
  if (isChecking) {
    return <h1>ESpera...(hacer loader bacano)</h1>;
  }
  return (
    <Router>
      <div className="fade">
        <Switch>
          <PublicRoutes
            path="/auth"
            isAuthenticated={isLogged}
            component={AuthRouter}
          />
          <PrivateRoutes
            path="/"
            isAuthenticated={isLogged}
            component={JournalScreen}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
