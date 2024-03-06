import About from "@/components/Home/About";
import { Landing } from "@/components/Home/Landing";
import Container from "@/components/shared/Container";
import React, { Fragment } from "react";

const Home = () => {
  return (
    <Fragment>
      <Container>
        <Landing />
      </Container>
      <About />
    </Fragment>
  );
};

export default Home;
