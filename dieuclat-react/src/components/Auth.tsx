import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

interface AuthProps {
  onAuthSuccess?: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToSignup = () => setIsLogin(false);
  const handleSwitchToLogin = () => setIsLogin(true);

  return (
    <>
      {isLogin ? (
        <Login
          onSwitchToSignup={handleSwitchToSignup}
          onLoginSuccess={onAuthSuccess}
        />
      ) : (
        <Signup
          onSwitchToLogin={handleSwitchToLogin}
          onSignupSuccess={onAuthSuccess}
        />
      )}
    </>
  );
};

export default Auth;