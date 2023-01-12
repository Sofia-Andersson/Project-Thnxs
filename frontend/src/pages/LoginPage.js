import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro'

import { API_URL } from '../utils/urls';
import { user } from '../reducers/user';
import { Footer } from '../components/Footer';
import { LoadingPage } from './LoadingPage';
import { MainWrapper } from '../styledComponents/MainWrapper';
import { Button } from '../styledComponents/Button';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modeChange, setModeChange] = useState('login');
  
  const isLoading = useSelector((store) => store.user.isLoading);
  const errorMessage = useSelector((store) => store.user.error);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onToggleClick = () => {
    // Clear input fields
    setUsername('');
    setPassword('');
    // Switch beteween login/register for the fetch URL
    if (modeChange === 'login') {
      setModeChange('register');
    } else {
      setModeChange('login');
    }
  };
  
  // If there is an accessToken the user will be directed to the inputPage 
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

    // Starts the loading 
    dispatch(user.actions.setLoading(true));  

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
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
            console.log(data.response);
          })
        }
        // Ends the loading 
        dispatch(user.actions.setLoading(false));
      });
    
  };

  return (
    <>
	    <MainWrapper>
        {/* If loading show loadingPage */}
        {isLoading && <LoadingPage />}

        <input type="checkbox" id="chk" aria-hidden="true" />

        {/* Login-block */}
			  <div className="login">
          <form onSubmit={onFormSubmit}>
            <label htmlFor="chk" aria-hidden="true" onClick={onToggleClick}>Login </label>

            {/* Show error message if credentials did not match */}
            {errorMessage && <ErrorP>{errorMessage}</ErrorP>}

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
            <Button>LOGIN</Button>
          </form>
        </div>

        {/* Register-block */}
        <div className="register">
          <form onSubmit={onFormSubmit}>
            <label htmlFor="chk" aria-hidden="true" onClick={onToggleClick}>Register </label>
            <Input 
              type="text" 
              name="txt" 
              placeholder="User name" 
              required="" value={username}
              onChange={(event) => setUsername(event.target.value)} />
            <Input 
              type="password" 
              name="pswd" 
              placeholder="Password" 
              required="" value={password}
              onChange={(event) => setPassword(event.target.value)} />

            {/* Shows checkmark when password is more than 7 charachters (8 is minimum according to backend) */}
            <PasswordRequirements>
              <PasswordRequirementsP>Password minimum 8 charachters</PasswordRequirementsP>    
              {password.length > 7 ? (<PasswordRequirementsP><b>✓</b></PasswordRequirementsP>) : ""}
            </PasswordRequirements>

            <Button>REGISTER</Button>
          </form>
        </div>   
	    </MainWrapper>
      <Footer/>
    </>
  )
}

// STYLING 
const PasswordRequirementsP = styled.p`
  margin: 0 3px;
`;

const PasswordRequirements = styled.div`
  display: flex; 
  font-size: 12px;
  margin: 0 60px;
  color: var(--color-darkgrey);
`;

const Input = styled.input`
  margin: 20px 60px 5px 60px;
`;

const ErrorP = styled.p`
  margin: 0 60px;
  color: var(	--color-orange);
  
`;
