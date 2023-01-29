import styled from "styled-components/macro";

export const MainWrapper = styled.div`
    width: 350px;
    height: 510px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 5px 20px 50px #000;

    @media (max-width: 576px) {
        margin-top: 10%;
    }

    @media (min-width: 577px) and (max-width: 1440px) {
        height: 460px;
    }
`;


    