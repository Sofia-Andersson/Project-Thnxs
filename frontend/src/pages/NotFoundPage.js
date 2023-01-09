import React from "react";
import { Link } from "react-router-dom";
import { Button } from '../styledComponents/Button'

export const NotFoundPage = () => {
    return (
      <> 
          <h1>404. Sorry, this page can't be found</h1>
          <Link to="/">
            <Button>GO BACK TO STARTPAGE</Button>
          </Link>
      </>
    );
  };