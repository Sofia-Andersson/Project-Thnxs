import React, { useState, useEffect } from 'react'; 
import { API_URL } from '../utils/urls';
import { Link, useNavigate } from "react-router-dom";

import { Button } from '../styledComponents/Button';

export const CalendarViewPage = () => {
    const [thnxList, setThnxList] = useState ([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // gets all the thnxs for each user and puts them in the list
    const fetchThnx = () => {
        setLoading(true);
        fetch(API_URL('thnxs'))
            .then((res) => res.json())
            .then((data) => setThnxList(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    // calls for the fetchThnx function everytime the page is reloaded
    useEffect(() => {
        fetchThnx();
    }, []);

    if (loading) {
        return <h1>Loading in progress</h1>
    }

    return (
        <>
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
