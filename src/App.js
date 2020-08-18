import React, { useState } from "react";

import "normalize.css";
import styled from "styled-components";

import "./styles.css";
import { timezones as tz } from "./data/timezones";

import LocationDisplay from "./components/LocationDisplay";
import PlaceInput from "./components/PlaceInput";

const Title = styled.h1`
  color: #e3e3e3;
  font-weight: lighter;
  font-size: 2em;
  text-align: center;
`;

const Footer = styled.footer`
  color: lightgray;
  font-size: 0.8em;
  /* background: black; */
  margin-top: 1em;
  text-align: center;
  padding: 1em;
`;

const Container = styled.section`
  margin: 0 auto;
  max-width: 800px;
  padding: 2em;
`;

const FooterLink = styled.a`
  color: lightgray;
  text-decoration: none;

  &:hover {
    color: white;
  }
`;

export default function App() {
  const [clocks, setClocks] = useState([]);

  const addClock = (timezone) => {
    setClocks([tz.indexOf(timezone), ...clocks]);
  };

  const removeClock = (timezone) => {
    setClocks(clocks.filter((zone) => zone !== tz.indexOf(timezone)));
  };

  return (
    <div className="App">
      <Container>
        <Title>World Clock</Title>
        <PlaceInput addClock={addClock} />
        {clocks &&
          clocks.map((tzIndex) => (
            <LocationDisplay
              key={tz[tzIndex]}
              removeClock={removeClock}
              timezone={tz[tzIndex]}
            />
          ))}
      </Container>
      <Footer>
        World Clock by{" "}
        <FooterLink href="https://github.com/rhgrieve" target="_blank">
          @rhgrieve
        </FooterLink>{" "}
      </Footer>
    </div>
  );
}
