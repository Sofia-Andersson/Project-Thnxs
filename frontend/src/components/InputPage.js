import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components/macro';
import swal from 'sweetalert';

import { API_URL } from '../utils/urls';
import { user } from '../reducers/user';
import { Footer } from '../components/Footer';
import { MainWrapper } from '../styledComponents/MainWrapper';
import { Button } from '../styledComponents/Button';
import { SmallButton } from '../styledComponents/SmallButton';
import { ButtonContainer } from '../styledComponents/ButtonContainer';

export const InputPage = () => { 
  const [newThnx1, setNewThnx1] = useState('');
  const [newThnx2, setNewThnx2] = useState('');
  const [newThnx3, setNewThnx3] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onNewThnxChange1 = (event) => {
    setNewThnx1(event.target.value);
  }

  const onNewThnxChange2 = (event) => {
    setNewThnx2(event.target.value);
  }

  const onNewThnxChange3 = (event) => {
    setNewThnx3(event.target.value);
  }

  // Logout btn, deletes accessToken and send the user to LoginPage
  const onLogoutClick = () => {
    dispatch(user.actions.setAccessToken(null));
    navigate("/");
  };

  // Prevents the page from reloading when submitting form
  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({
        text1: newThnx1,
        text2: newThnx2,
        text3: newThnx3
      })
    };

    // Posts new thnx if the user have not committed one thnx today 
    fetch(API_URL('thnxs'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Sweet alert is fired 
          swal({
            icon: 'success',
            title: 'Great job!',
            text: '',
            button: 'OK',
          }); 
          navigate('/previous-thnx');
        } else {
          swal({
            icon: 'warning',
            title: 'Oops...',
            text: 'You already submitted your thanks for today!',
            button: 'OK'
          });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setNewThnx1(''), setNewThnx2(''), setNewThnx3(''));
  }

  if (!accessToken) {
    return (
      <>
        <h1>You are logged out</h1>
        <Link to="/">
        <Button>Go to Login-page
        </Button>
        </Link>
      </>
      )};

    return (
      <>
        <MainWrapper>
          <form onSubmit={onFormSubmit}>
            <h1>HI {username.toUpperCase()}, WHAT ARE YOU GRATEFUL FOR TODAY?</h1>
            <TextAreaContainer>
              <Textarea value={newThnx1} placeholder="I'm grateful for..." onChange={onNewThnxChange1} />
              <Textarea value={newThnx2} placeholder="I'm also grateful for..." onChange={onNewThnxChange2} />
              <Textarea value={newThnx3} placeholder="And I'm grateful for..." onChange={onNewThnxChange3} />
            </TextAreaContainer>
            <Button type="submit">SUBMIT</Button>
          </form>
            <ButtonContainer>
              <SmallButton onClick={() => {
                navigate('/previous-thnx')
                }}>PREVIOUS THNX</SmallButton>
              <SmallButton onClick={onLogoutClick}>LOG OUT</SmallButton>
            </ButtonContainer>
        </MainWrapper>
        
        <Footer/>
      </>
    )
};

// STYLING 
const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 25px;
`; 

const Textarea = styled.textarea`
  margin: 10px 0;
  font-size: 16px;
  resize: none;
  font-family: 'Akshar', sans-serif;
  height: 3rem; 
  border-radius: 5px;
  padding: 5px;
  outline-color: var(--color-lightBrown);
`;
