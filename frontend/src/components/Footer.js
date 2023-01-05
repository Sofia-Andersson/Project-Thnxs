import React from "react";
import styled from 'styled-components/macro';
import ThnxLogo from '../assets/ThnxLogo.png'

export const Footer = () => {
    return (
        <FooterWrapper>
        <Img src={ThnxLogo} alt="thnxlogo" />
        </FooterWrapper>
    )
};

const Img = styled.img`
    height: 30px;
    width: auto;
    z-index: 28;
`;

const FooterWrapper = styled.div`
    width: 100%;
    background-color: red;
    padding: 25px;
    margin: 0 auto; 
    display: flex;
    
`;