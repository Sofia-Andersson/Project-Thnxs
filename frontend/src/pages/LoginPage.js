import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../utils/urls';
import { user } from '../reducers/user';

import { AboutPage } from './AboutPage';
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  // if there is an accessToken the user will be directed to the inputPage. 
  useEffect(() => {
    if (accessToken) {
      //localStorage.setItem('accessToken', accessToken);
      navigate('/input');
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    console.log(accessToken)
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        username: username,
        password: password 
      })
    };

    fetch(API_URL('login'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
            // navigate("/input");
          })
        } else {
        // setErrorMessage(data.response);
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
            console.log(data.response);
          });
        }
      });
  };

  return (
    <>
      <h1>Please log in</h1>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label htmlFor="password">Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <Link to="/about">
        <button type="button">
          What is this app?
        </button>
      </Link>
    </>
  )
}

