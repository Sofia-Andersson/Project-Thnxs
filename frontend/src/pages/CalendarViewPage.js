import React, { useState, useEffect } from 'react'; 
import { API_URL } from '../utils/urls';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { LoadingPage } from '../pages/LoadingPage';
import { Button } from '../styledComponents/Button';
import { user } from '../reducers/user';

export const CalendarViewPage = () => {
    const [thnxList, setThnxList] = useState ([]);
    const isLoading = useSelector((store) => store.user.isLoading);
    const accessToken = useSelector((store) => store.user.accessToken);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!accessToken) {
          navigate('/');
        }
      }, [accessToken, navigate]);

    // gets all the thnxs for each user and puts them in the list
    const fetchThnx = () => {

        const options = {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            },
          };

        dispatch(user.actions.setLoading(true));
        fetch(API_URL('thnxs'), options)
            .then((res) => res.json())
            .then((data) => setThnxList(data))
            .catch((error) => console.error(error))
            .finally(() => dispatch(user.actions.setLoading(false)));
    }

    // calls for the fetchThnx function everytime the page is reloaded
    useEffect(() => {
        fetchThnx();
    }, []);

    return (
        <>
            {isLoading && <LoadingPage />}
            <p>här ska listan vara</p>
            <Button
                type="button"
                onClick={() => {
                navigate('/');
                localStorage.removeItem('accessToken');
                }}
            >Logout</Button>
            <Link to="/input">
            <button>Go to input-page
            </button>
            </Link>
        </>
    )
}
