import styled from "styled-components/macro";

export const MainWrapper = styled.div`
    width: 350px;
    height: 500px;
    overflow hidden;
    border-radius: 10px;
    box-shadow: 5px 20px 50px #000;
    margin-top: 40px;

    @media (min-width: 600px) {
        margin-top: 230px;
    }

    @media (min-width: 800px) {
        margin-top: 175px;
    }
`;
