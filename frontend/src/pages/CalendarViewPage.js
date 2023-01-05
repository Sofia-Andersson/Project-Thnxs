import React, { useState, useEffect } from 'react'; 
import { API_URL } from '../utils/urls';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { LoadingPage } from '../pages/LoadingPage';
import { Button } from '../styledComponents/Button';
import { user } from '../reducers/user';
import styled from 'styled-components/macro';
import { MainWrapper } from '../styledComponents/MainWrapper';

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
        .then((data) => setThnxList(data.response))  
        .catch((error) => console.error(error))
        .finally(() => dispatch(user.actions.setLoading(false)));
  };

    // calls for the fetchThnx function everytime the page is reloaded
  useEffect(() => {
      fetchThnx();
  }, []);

    return (
        
        <MainTextWrapper>
            <OuterThnxWrapper>
          
                
            {isLoading && <LoadingPage />}

         
         
        {thnxList.map((singleThnx) => {
          return (
            <ThnxWrapper>
              <div key={singleThnx._id}>
                <ThnxDate>{new Date(singleThnx.createdAt).toLocaleDateString()}</ThnxDate>
                <ThnxText>{singleThnx.text1}</ThnxText>
                <ThnxText>{singleThnx.text2}</ThnxText>
                <ThnxText>{singleThnx.text3}</ThnxText>
              </div>
            </ThnxWrapper>
                
          )
        })}
        <Button type="button" onClick={() => {}}>
          LOAD MORE
        </Button>
        <Button type="button" onClick={() => {location.reload()}}>
          LOGOUT
        </Button>
        <Link to="/input">
          <Button>Go to input-page</Button>
        </Link>
      </OuterThnxWrapper>
      <Button onClick={() => {
                location.reload()
                }}>LOG OUT</Button>
                <Button onClick={() => {
                  navigate('/input')
                }}>Add todays thnx</Button>
    </MainTextWrapper>
  )
}

const MainTextWrapper = styled(MainWrapper)`
    height: 80vh;
    color: var(--color-black);
    padding: 35px 20px;
`;

const ThnxWrapper = styled.div`
    background-color: var(--color-whiteTransp);
    heigth: 40%;
    width: 60%;
    margin: 10px 10px;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 0 20px var(--color-orange);
`; 

const OuterThnxWrapper = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
    
`;

const ThnxText = styled.p `
    margin: 5px;
    font-size: 0.7rem;
    font-family: 'Inter', sans-serif;
    padding: 3px;
    
`;

const ThnxDate = styled.p`
    text-align: center;
    font-weight: bold;
    margin: 3px 0px;
`;