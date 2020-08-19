import React, { useState, useEffect } from "react";

import "normalize.css";
import styled from "styled-components";

import "./styles.css";
import { timezones as tz } from "./data/timezones";

import LocationDisplay from "./components/LocationDisplay";
import PlaceInput from "./components/PlaceInput";

function lsTest() {
  var test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

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

const Header = styled.header`
  opacity: ${(props) => (props.showHeader ? 1 : 0)};
  transition: opacity 1s ease-in;
`;

export default function App() {
  const [clocks, setClocks] = useState([]);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    if (lsTest() === true) {
      const hasClocksInStorage =
        localStorage.getItem("clocks") &&
        JSON.parse(localStorage.getItem("clocks")).length > 0;
      const storedClocks = hasClocksInStorage
        ? JSON.parse(localStorage.getItem("clocks"))
        : null;
      if (hasClocksInStorage) {
        setClocks(storedClocks);
      }
    } else {
      console.log("localStorage not available");
    }
  }, []);

  useEffect(() => {
    if (lsTest() === true) {
      localStorage.setItem("clocks", JSON.stringify(clocks));
    } else {
      console.log("localStorage not available");
    }
  }, [clocks]);

  const addClock = (city) => {
    setClocks([city, ...clocks]);
  };

  const removeClock = (id) => {
    setClocks(
      clocks.filter((city) => city.fields.geonameid !== parseInt(id, 10))
    );
  };

  return (
    <div className="App">
      <Container>
        <Header showHeader={showHeader}>
          <Title>World Clock</Title>
          <PlaceInput addClock={addClock} />
        </Header>
        {clocks &&
          clocks.map((city) => (
            <LocationDisplay
              key={city.id}
              removeClock={removeClock}
              city={city}
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
