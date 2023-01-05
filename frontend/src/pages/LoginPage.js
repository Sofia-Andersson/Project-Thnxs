import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { MainWrapper } from '../styledComponents/MainWrapper';
import { API_URL } from '../utils/urls';
import { user } from '../reducers/user';
import { Footer } from '../components/Footer';

// import { AboutPage } from './AboutPage';
import { Link } from "react-router-dom";
import { Button } from '../styledComponents/Button';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modeChange, setModeChange] = useState('login');
  const [errorMessage, setErrorMessage] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onToggleClick = () => {
    setErrorMessage('');
    setUsername('');
    setPassword('');
    if (modeChange === 'login') {
      setModeChange('register');
    } else {
      setModeChange('login');
    }
  };
  
  // if there is an accessToken the user will be directed to the inputPage. 
  useEffect(() => {
    if (accessToken) {
      navigate('/input');
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
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

   fetch(API_URL(modeChange), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          })
        } else {
        setErrorMessage(data.response);
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

// Test log in section
return (
	<MainWrapper>
    <nav role='navigation'>
		<div id="menuToggle">
			<input type="checkbox" />
			<span></span>
			<span></span>
			<span></span>
			<ul id="menu">
          <Link to="/calendar">
					<li>How to</li>
          </Link>
          <Link to="/about">
					<li>About</li>
          </Link>
			</ul>
		</div>
	</nav>  	
      <input type="checkbox" id="chk" aria-hidden="true" />
			<div class="login">
          <form onSubmit={onFormSubmit}>
					<label for="chk" aria-hidden="true" onClick={onToggleClick}>Login </label>
					<input 
              type="text" 
              name="txt" 
            placeholder="User name" 
              required="" 
              value={username}
              onChange={(event) => setUsername(event.target.value)} />
					<input 
              type="password" 
              name="pswd" 
              placeholder="Password"
            required="" value={password}
              onChange={(event) => setPassword(event.target.value)} />
					<Button>Login</Button>
          </form>
        </div>

        <div className="register">
          <form onSubmit={onFormSubmit}>
					<label for="chk" aria-hidden="true" onClick={onToggleClick}> Register </label>
          <input 
              type="text" 
              name="txt" 
            placeholder="User name" 
            required="" value={username}
              onChange={(event) => setUsername(event.target.value)} />
					<input 
              type="password" 
              name="pswd" 
              placeholder="Password" 
            required="" value={password}
              onChange={(event) => setPassword(event.target.value)} />
					<Button> Register </Button>
          </form>
        </div>
      <Footer/>
	</MainWrapper>
  )
}

// Former log in section:
/* return (
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
            value={username}
            onChange={(event) => setUsername(event.target.value)} /> />
        </label>
        <Button type="submit">Submit</Button>
      </form>
   </>
  );
}; */