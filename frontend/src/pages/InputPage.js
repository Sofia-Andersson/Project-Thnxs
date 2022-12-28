import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils/urls';
import { Link, useNavigate } from "react-router-dom";
import { user } from '../reducers/user';

import { Button } from '../styledComponents/Button'

// importera komponenterna

export const InputPage = () => { 
  const [newThnx1, setNewThnx1] = useState('');
  // const [newThnx2, setNewThnx2] = useState('');
  // const [newThnx3, setNewThnx3] = useState('');
  // const accessToken = useState(localStorage.getItem('accessToken'));
  const accessToken = useSelector((store) => store.user.accessToken);
  // const textOne = useSelector((store) => store.input.textOne);
  // console.log(textOne)

  const navigate = useNavigate();

  const onNewThnxChange1 = (event) => {
    setNewThnx1(event.target.value);
    console.log(newThnx1)
  }

  // const onNewThnxChange2 = (event) => {
  //   setNewThnx2(event.target.value);
  // }

  // const onNewThnxChange3 = (event) => {
  //   setNewThnx3(event.target.value);
  // }

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({
        text1: newThnx1
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
      .finally(() => setNewThnx1(''));
}

// if (!accessToken) {
//  return <h1>You need to log in</h1>
// }; 

 return (
    <form onSubmit= {onFormSubmit}>
        <div>
          <p>TESTAR INPUT PAGE</p>
          <textarea value={newThnx1} placeholder= "I'm grateful for..." onChange={onNewThnxChange1} />
          {/* <textarea value={newThnx2} placeholder= "I'm grateful for..." onChange={onNewThnxChange2} />
          <textarea value={newThnx3} placeholder= "I'm grateful for..." onChange={onNewThnxChange3} /> */}
          <Button type="submit">Submit</Button>
          <Link to="/calendar">
          <Button>Go to calendarview</Button>
          </Link>
          <Button
                type="button"
                onClick={() => {
                navigate('/');
                localStorage.removeItem('accessToken');
                }}
            >
              Logout
            </Button>
        </div>
    </form>
 )
};
