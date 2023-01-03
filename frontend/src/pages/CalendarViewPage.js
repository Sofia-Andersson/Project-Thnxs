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
    }

    // calls for the fetchThnx function everytime the page is reloaded
    useEffect(() => {
        fetchThnx();
    }, []);

    // Thnx-list is an object, we need to map an array. HOW?

    // console.log(thnxList.response)
    // console.log(thnxList)

    // const abba = Date.now();
    // const today = new Date(abba)
    // console.log(today)

    return (
        
        <MainWrapper>
            <OuterThnxWrapper>
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
                        <ThnxDate>{singleThnx.createdAt}</ThnxDate>
                        <ThnxText>1: {singleThnx.text1}</ThnxText>
                        <ThnxText>2: {singleThnx.text2}</ThnxText>
                        <ThnxText>3: {singleThnx.text3}</ThnxText>
                    </div>
                    </ThnxWrapper>
                
                )
            })}


            <Button
                type="button"
                onClick={() => {
                location.reload()
                }}
            >Logout</Button>
            <Link to="/input">
            <Button>Go to input-page
            </Button>
            </Link>
            </OuterThnxWrapper>
        </MainWrapper>
    )
}

const ThnxWrapper = styled.div`
    background-color: red;
    heigth: 40%;
    width: 70%;
    margin: 5px 10px;
  
`; 

const OuterThnxWrapper = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
    
`;

const ThnxText = styled.p `
    margin: 0px;
    font-size: 16px;
`;

const ThnxDate = styled(ThnxText)`

`;