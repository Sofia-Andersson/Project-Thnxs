import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components/macro';

import ThnxLogo from '../assets/ThnxLogo.png';

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

// STYLE
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