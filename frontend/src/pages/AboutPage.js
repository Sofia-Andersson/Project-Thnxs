import React from 'react'
import { Link } from "react-router-dom";
import { Button } from '../styledComponents/Button';

export const AboutPage = () => {
    return (
 <>
    <h1>About the Thnxs app.....LOREM IPSUM</h1>
    <Link to="/">
        <Button>Ok, lets go to the startpage</Button>
    </Link>
 </>
 );
};