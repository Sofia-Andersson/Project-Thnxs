import styled from 'styled-components/macro';

export const Button = styled.button `
  width: 70%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: var(--color-ligthBlack);
  font-size: 1em;
  font-weight: bold;
  letter-spacing: 2px;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: .2s ease-in;
  cursor: pointer;
  font-family: 'Akshar', sans-serif;
  
  &:hover { background-color: var(--color-black) }

  a {
    color: #0d0807; 
    text-decoration:none;
  }
`;