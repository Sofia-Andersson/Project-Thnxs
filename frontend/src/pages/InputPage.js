import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils/urls';
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
// import { user } from '../reducers/user';

import { Button } from '../styledComponents/Button'

// importera komponenterna
export const InputPage = () => { 
  const [newThnx1, setNewThnx1] = useState('');
  const [newThnx2, setNewThnx2] = useState('');
  const [newThnx3, setNewThnx3] = useState('');
  const accessToken = useSelector((store) => store.user.accessToken);
  // const textOne = useSelector((store) => store.input.textOne);
  // console.log(textOne)

  const navigate = useNavigate();

  const onNewThnxChange1 = (event) => {
    setNewThnx1(event.target.value);
  }

  const onNewThnxChange2 = (event) => {
    setNewThnx2(event.target.value);
  }

  const onNewThnxChange3 = (event) => {
    setNewThnx3(event.target.value);
  }

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

    fetch(API_URL('thnxs'), options)
      .then((res) => res.json())
      // .then((data) => {
      //   if (data.success) {
      //     batch(() => {
      //       dispatch(input.actions.text1(data.response.text1))
      //       dispatch(user.actions.setError(null));
      //     })
      //   } else {
      //   // setErrorMessage(data.response);
      //     batch(() => {
      //       dispatch(input.actions.text1(null));
      //       dispatch(input.actions.setError(data.response));
      //     });
      //   }
      // })
      .catch((error) => console.error(error))
      .finally(() => setNewThnx1(''), setNewThnx2(''), setNewThnx3(''));

      alert("Great job!");
}

if (!accessToken) {
 return (
    <>
      <h1>You need to log in</h1>
      <Link to="/">
      <Button>Go to Login-page
      </Button>
      </Link>
    </>
    )}; 

 return (
    <form onSubmit= {onFormSubmit}>
        <div className="main">
          <h1>WHAT ARE YOU GREATFUL FOR TODAY?</h1>
          <TextAreaContainer>
            <Textarea value={newThnx1} placeholder= "I'm grateful for..." onChange={onNewThnxChange1} />
            <Textarea value={newThnx2} placeholder= "I'm also grateful for..." onChange={onNewThnxChange2} />
            <Textarea value={newThnx3} placeholder= "And I'm grateful for..." onChange={onNewThnxChange3} />
          </TextAreaContainer>
          <Button type="submit">SUBMIT</Button>
          <Link to="/calendar">
          <Button>Go to calendarview</Button>
          </Link>

          <Button
                type="button"
                onClick={() => {
                  location.reload()
                }}
            >
              Logout
              </Button>
        </div>
    </form>
 )
};

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`; 

const Textarea = styled.textarea`
  margin: 10px 0;
  resize: none;
  font-family: 'Akshar', sans-serif;
  height: 3rem; 
  border-radius: 5px;
  padding: 5px;
  outline-color: var(--color-lightBrown);
`;