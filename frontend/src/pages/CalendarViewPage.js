import React, { useState, useEffect, useCallback } from 'react'; 
import { API_URL } from '../utils/urls';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { LoadingPage } from '../pages/LoadingPage';
import { Button } from '../styledComponents/Button';
import { user } from '../reducers/user';
import styled from 'styled-components/macro';
import { MainWrapper } from '../styledComponents/MainWrapper';
import { Footer } from '../components/Footer';

export const CalendarViewPage = () => {
  const [thnxList, setThnxList] = useState([]);
  const [limit, setLimit] = useState(2)
  const isLoading = useSelector((store) => store.user.isLoading);
  const accessToken = useSelector((store) => store.user.accessToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onLogoutClick = () => {
    dispatch(user.actions.setAccessToken(null));
    navigate("/");
  };

  useEffect(() => {
      if (!accessToken) {
        navigate('/');
        }
      }, [accessToken, navigate]);

  // gets all the thnxs for each user and puts them in the list
  const fetchThnx = useCallback(() => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': accessToken
      },
    };

      dispatch(user.actions.setLoading(true));
      fetch(API_URL('thnxs?limit=' + limit), options)
        .then(async (res) => {
          const json = await res.json();
          console.log(json);
          // {success: ..., thnxFrom...}
          console.log(json.success);
          setThnxList(json.thnxFromSpecificDate.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
        })
        // .then((data) => setThnxList(data.response))  
        .catch((error) => console.error(error))
        .finally(() => dispatch(user.actions.setLoading(false)));
  }, [limit]);

    // calls for the fetchThnx function everytime the page is reloaded
  useEffect(() => {
      fetchThnx();
  }, [limit]);

  const loadMore = () => {
    setLimit(limit+5)
  };

  return (
    <>
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

        <Button type="button" onClick={loadMore}>LOAD MORE</Button>

        </OuterThnxWrapper>
        
        <Button onClick={() => {navigate('/input')}}>
          Add todays thnx
        </Button>

        <Button onClick={onLogoutClick}>
          LOG OUT
        </Button>
        
      </MainTextWrapper>

    <Footer/>
    </>
  )
}

const MainTextWrapper = styled(MainWrapper)`
    height: 70vh;
    color: var(--color-black);
    padding: 35px 20px;
    overflow: scroll;
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
    text-align:center;
    
`;

const ThnxDate = styled.p`
    text-align: center;
    font-weight: bold;
    margin: 3px 0px;
`;