import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

import { API_URL } from '../utils/urls';
import { user } from '../reducers/user';

// import { AboutPage } from './AboutPage';
import { Link } from "react-router-dom";
import { Button } from '../styledComponents/Button';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modeChange, setModeChange] = useState('login');
  const [inUse, setInUse] = useState('');
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
      setInUse(true)
    } else {
      setModeChange('login');
      setInUse(false);
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

  return (
    <OuterWrapper>
      <div className={`container ${inUse ? "right-panel-active" : ""}`}>
        <div className="register-container register-1-container">
          <FormContainer onFormSubmit={onFormSubmit}>
            <MobileContainer>
              <FormPMobile>Log in</FormPMobile>
              <ButtonMobile
                type="button"
                onClick={onToggleClick}
                id="login"
                Mode
              >
                Log in
              </ButtonMobile>
            </MobileContainer>

            <h1>Create account</h1>

            <div className='input-container'>
              <label htmlFor="username">Username
                <input
                  className='login'
                  type="text"
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)} 
                  required
                />
              </label>
            </div>

            <div className='input-container'>
                <label htmlFor="password">Password
                  <input
                    className="login"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} 
                    required
                  />
                </label>
              </div>
              
              <Button type="submit" Mode>Submit</Button>

            <ErrorMessageContainer>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </ErrorMessageContainer>
          </FormContainer>
          
        </div>

        <div className='register-container login-container'>
        <FormContainer onFormSubmit={onFormSubmit}>
          <MobileContainer>
            <FormPMobile>Creat a new account</FormPMobile>
            <ButtonMobile
              type="button"
              onClick={onToggleClick}
              id="register"
              Mode
            >
              Register
            </ButtonMobile>
          </MobileContainer>
          <h1>Login</h1>
          <div className="input-container">
            <label htmlFor="username">Username
              <input
                className="input"
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)} 
                required
              />
            </label>
            <label htmlFor="password">Password
              <input
                className="login"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} 
                required
              />
            </label>
          </div>
          <Button type="submit" Mode>
            Login
          </Button>
          <ErrorMessageContainer>
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </ErrorMessageContainer>
        </FormContainer>
      </div>

      <div className="overlay-container">
          <div className="overlay">
            <div className="panel panel-left">
              <h2>Already a user?</h2>
              <InfoP>Please go to login page</InfoP>
              <Button type="button" onClick={onToggleClick} id="login">
                Login
              </Button>
            </div>
            <div className="panel panel-right">
              <h2>Create a new account?</h2>
              <InfoP>Click signup to create one</InfoP>
              <Button type="button" onClick={onToggleClick} id="register">
                signup
              </Button>
            </div>
          </div>
        </div>
    </div>
  </OuterWrapper>


  );
};

export const OuterWrapper = styled.section`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 100vh;
margin: -20px 0 50px;
`;

export const FormContainer = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 50px;
height: 100%;
text-align: center;
`;

export const MobileContainer = styled.div`
display: flex;
width: 100%;
justify-content: center;
align-items: center;
margin: 20px;

@media (min-width: 769px) {
  display: none;
} 
`;

export const FormPMobile = styled.p `
color: #a7a7a7;
font-size: 14px;
`;

export const InfoP = styled.p `
color: #fff;
  margin: 16px 0;
`;

export const ButtonMobile = styled.button`
  display: block;
  cursor: pointer;
  color: #4b5b7c;
  font-size: 12px;
  border: none;
  background-color: #fff;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

@media (min-width: 769px) {
    display: none }
`;

export const ErrorMessageContainer = styled.div`

position: absolute;
bottom: 30px;
padding: 0;

@media (min-width: 769px) {
  bottom: 40px;
padding: 20px;
}
`;

export const ErrorMessage = styled.p`
color: red;
align-self: center;
`;


{/* Former log in section:
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
      </form> */}