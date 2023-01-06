import React from "react";
import styled from 'styled-components/macro';
import ThnxLogo from '../assets/ThnxLogo.png';
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <FooterWrapper>
            <Img src={ThnxLogo} alt="thnxlogo" />
            <LinkAbout to="/about">
                ABOUT
            </LinkAbout>
        </FooterWrapper>
    )
};

// const FooterWrapper = styled.div`
//     width: 100%;
//     margin: 0 auto; 
//     display: flex;
//     justify-content: center;
//     position: relative;
// `;

// const Img = styled.img`
//     height: 30px;
//     width: auto;
//     position: absolute;
//     bottom: -50px;
// `;

const LinkAbout = styled(Link)`
    color: var(--color-nougat);
    position: absolute;
    bottom: 15px;
`;

const Img = styled.img`
    height: 30px;
    width: auto;
    position: absolute;
    bottom: 40px;
`;

const FooterWrapper = styled.div`
    width: 100%;
    margin: 0 auto; 
    display: flex;
    justify-content: center;
    
`;