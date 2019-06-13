import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main'
import NavBar from './components/NavBar'

import { verifyToken } from './services/users'

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await verifyToken();
        if (user) {
          setUser(user.attributes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [])

  return (
    <div className="App">
      <NavBar
        user={user}
      />
      <Main
        user={user}
      />
    </div>
  );
}

export default App;
