import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main'
import NavBar from './components/NavBar'
import { withRouter } from 'react-router-dom'

import {
  verifyToken,
  createUser,
  loginUser,
} from './services/users'

function App(props) {
  const [user, setUser] = useState({})

  const handleRegister = async (user) => {
    try {
      const resp = createUser(user)
      setUser(resp.attributes)
      props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = async (user) => {
    try {
      const resp = await loginUser(user);
      setUser(resp.attributes)
      props.history.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    setUser({})
    localStorage.removeItem('authToken')
    props.history.push('/');
  }

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
        handleLogout={handleLogout}
      />
      <Main
        user={user}
        handleRegister={handleRegister}
        handleLogin={handleLogin}
      />
    </div>
  );
}

export default withRouter(App);
