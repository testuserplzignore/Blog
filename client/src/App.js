import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main'
import NavBar from './components/NavBar'
import { withRouter } from 'react-router-dom'

import { updateToken } from './services/apiHelper'

import {
  verifyToken,
  createUser,
  loginUser,
  updateUser,
} from './services/users'

function App(props) {
  const [user, setUser] = useState({})

  const handleRegister = async (userData) => {
    try {
      const resp = createUser(userData)
      setUser(resp.attributes)
      props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async (userData) => {
    try {
      const resp = await updateUser(userData, user.id)
      setUser(resp.attributes)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogin = async (userData) => {
    try {
      const resp = await loginUser(userData);
      setUser(resp.attributes)
      props.history.push('/blog')
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    setUser({})
    localStorage.removeItem('authToken')
    updateToken()
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
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default withRouter(App);
