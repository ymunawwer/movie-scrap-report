import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import Login from './Auth/Login';
import Dashboard from './Dashboard';
import Info from './Info';
import TokenContext from '../context/TokenContext';
import tokenReducer from '../reducer/tokenReducer';
import userReducer from '../reducer/userReducer';
import axios from '../Axios/axios.js';

function Main() {
  const token = JSON.parse(localStorage.getItem('authToken'));
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token);
  const [user, userDispatch] = useReducer(userReducer, {})
  useEffect(() => {
    console.log('App.js');
    const fetchMovie = async () => {
      try {
        console.log('fetchUser');
        const res = await axios.get('/v1/movie/getAll', {
          headers: {
            Authorization: `${userToken}`,
          },
        });
        tokenDispatch({type: "SET_TOKEN", payload: res.token})
        console.log('res.data: ', res);
        userDispatch({ type: 'SET_USER', payload: res.data });
      } catch (error) {
        console.log(error);
      }
    };
    if (userToken) {
      fetchMovie();
    }
  }, [userToken]);
  return (
    <div>
      <Router>
        <TokenContext.Provider value={{ userToken, tokenDispatch,user, userDispatch }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tableinfo/:id" element={<Info />} />
          </Routes>
        </TokenContext.Provider>
      </Router>
    </div>
  );
}

export default Main;
