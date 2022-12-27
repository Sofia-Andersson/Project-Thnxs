import React, { useState, useEffect } from 'react';
import { API_URL } from '../utils/urls';
import { Link, useNavigate } from "react-router-dom";
// import { user } from '../reducers/user';

// importera komponenterna

export const InputPage = () => { 
  const [newThnx1, setNewThnx1] = useState('');
  const [newThnx2, setNewThnx2] = useState('');
  const [newThnx3, setNewThnx3] = useState('');
  const [accessToken] = useState(localStorage.getItem('accessToken'));

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
    }

    fetch(API_URL('thnxs'), options)
      .then((res) => res.json())
      // .then((data) => {
      //   if (data.success) {
      //     batch(() => {
      //       dispatch(user.actions.text1(data.response.text1));
      //       dispatch(user.actions.text2(data.response.text2));
      //       dispatch(user.actions.text3(data.response.text3));
      //       dispatch(user.actions.setError(null));
      //     })
      //   } else {
      //   // setErrorMessage(data.response);
      //     batch(() => {
      //       dispatch(user.actions.text1(null));
      //       dispatch(user.actions.text2(null));
      //       dispatch(user.actions.text3(null));
      //       dispatch(user.actions.setError(data.response));
      //     });
      //   }
      // })
      .catch((error) => console.error(error))
      .finally(() => setNewThnx1(''), setNewThnx2(''), setNewThnx3(''));

}

// if (!accessToken) {
//  return <h1>You need to log in</h1>
// }; 

 return (
    <form onSubmit= {onFormSubmit}>
        <div>
          <p>TESTAR INPUT PAGE</p>
          <textarea value={newThnx1} placeholder= "I'm grateful for..." onChange={onNewThnxChange1} />
          <textarea value={newThnx2} placeholder= "I'm grateful for..." onChange={onNewThnxChange2} />
          <textarea value={newThnx3} placeholder= "I'm grateful for..." onChange={onNewThnxChange3} />
          <button type="submit">Submit</button>
          <Link to="/calendar">
          <button>Go to calendarview</button>
          </Link>
          <button
                type="button"
                onClick={() => {
                navigate('/');
                localStorage.removeItem('accessToken');
                }}
            >
              Logout
            </button>
        </div>
    </form>
 )
};
