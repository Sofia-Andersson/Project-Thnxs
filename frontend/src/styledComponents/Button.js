import React from 'react'
import styled from 'styled-components/macro';

export const Button = styled.button `
cursor: pointer;
  background-color: ${(props) => (props.Mode ? "rgb(126,100,63)" : "transparent")};
  color: black;
  border: 3px solid ${(props) => (props.Mode ? "rgb(126,100,63)" : "#fff")};
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 20px;
  border: 2px dotted black;
  padding: 12px 20px;
`;
