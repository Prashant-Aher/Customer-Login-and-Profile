import './App.css';
import React, { useState } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  const [loggedInCustomer, setLoggedInCustomer] = useState(null);

  const handleLogin = (customer) => {
    setLoggedInCustomer(customer);
  };

  return (
    <div>
      {!loggedInCustomer ? <Login onLogin={handleLogin} /> : <Profile customer={loggedInCustomer} />}
    </div>
  );
};

export default App;
