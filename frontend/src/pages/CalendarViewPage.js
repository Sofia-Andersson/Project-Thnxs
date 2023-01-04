import React, { useState, useEffect } from 'react'; 
import { API_URL } from '../utils/urls';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { LoadingPage } from '../pages/LoadingPage';
import { Button } from '../styledComponents/Button';
import { user } from '../reducers/user';
import styled from 'styled-components';
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
            <nav role='navigation'>
		<div id="menuToggle">
			<input type="checkbox" />
			<span></span>
			<span></span>
			<span></span>
			<ul id="menu">
          <Link to="/input">
					<li>Write new thnx</li>
          </Link>
          <Link to="/about">
					<li>About</li>
          </Link>
				  <Link onClick={() => {
                location.reload()
                }}>
					<li>Logout</li>
          </Link>
			</ul>
		</div>
	</nav>
            {isLoading && <LoadingPage />}

            {/* <div>todays date is: {today}</div> */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         
         
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
    box-shadow: 0 0 15px lightgreen;
    border: 2px solid var(--color-darkBrown);
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