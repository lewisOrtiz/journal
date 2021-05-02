import React, { useState } from 'react';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
  const [ckeck, setCkeck] = useState(false);
  const handleChange = (e) => {
    setCkeck(!ckeck);
  };
  return (
    <div className="auth__main">
      <div>
        <div class="slideThree">
          <input
            type="checkbox"
            value={ckeck}
            id="slideThree"
            name="check"
            onChange={handleChange}
          />
          <label for="slideThree"></label>
        </div>
        <div className="auth__container">
          {ckeck ? <RegisterScreen /> : <LoginScreen />}
        </div>
      </div>
    </div>
  );
};
