import React from 'react'
import { Link } from "react-router-dom";

//DOES NOT SHOW IN BROWSER
export const AboutPage = () => {
    return (
 <>
    <h1>About the Thnxs app.....LOREM IPSUM</h1>
    <Link to="/">
        <button>Ok, lets go to the startpage</button>
    </Link>
 </>
 );
};