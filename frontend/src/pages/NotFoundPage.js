import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
    return (
      <Main>
          <Title>404</Title>
          <SubTitle>Sorry, this page can't be found</SubTitle>
          <Link to="/">
            <Button>Go back to startpage</Button>
          </Link>
      </Main>
    );
  };