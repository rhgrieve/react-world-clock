import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled.div`
  /* background-color: #161616; */
  /* border-radius: 1rem; */
  border: 1px solid black;
  width: 100%;
  padding: 2em;
  margin: 1em 0;
  /* box-shadow: 0.1em 0.1em; */
  backdrop-filter: blur(10px) opacity(100) brightness(0.2);
`;

const Close = styled.button`
  float: right;
  color: #c44747;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  ${Container}:hover & {
    opacity: 1;
  }
`;

const TimeString = styled.p`
  color: white;
  font-size: 4rem;
  font-weight: 100;
  margin: 1rem 0;
  /* letter-spacing: 0.5rem; */
`;

const PlaceString = styled.p`
  display: inline-block;
  font-size: 2em;
  color: white;
  margin: 0;
`;

const TimezoneAbbreviation = styled.span`
  display: inline-block;
  font-size: 1em;
  margin: 0 1em;
  color: gray;
  font-weight: bold;
`;

const SC = styled.span`
  font-size: 2rem;
`;

const LocationDisplay = ({ city, removeClock }) => {
  const startTime = new Date(Date.now()).toLocaleTimeString("en-US", {
    timeZone: city.fields.timezone
  });
  const [time, setTime] = useState(startTime);
  const [view, setView] = useState("digital");

  const timezoneAbbreviation = new Date(Date.now())
    .toLocaleTimeString("en-US", {
      timeZone: city.fields.timezone,
      timeZoneName: "short"
    })
    .split(" ")[2];
  //
  var n = useRef(null);
  var t = useRef(null);

  useEffect(() => {
    // console.log(city.fields.timezone);
  }, [city]);

  useEffect(() => {
    const timeOffset = 1000 - new Date(Date.now()).getMilliseconds();
    n.current = setTimeout(() => {
      t.current = setInterval(() => {
        setTime(
          new Date(Date.now()).toLocaleTimeString("en-US", {
            timeZone: city.fields.timezone
          })
        );
      });
    }, timeOffset);

    return function cleanup() {
      n.current = null;
      clearInterval(t.current);
    };
  }, [city.fields.timezone]);

  const [timeDig, timeOfDay] = time.split(" ");
  const [hours, minutes, seconds] = timeDig.split(":");

  const closeHandler = (e) => {
    removeClock(e.currentTarget.name);
  };

  return (
    <Container>
      <div style={{ display: "inline" }}>
        <PlaceString>{city.fields.asciiname}</PlaceString>
        <TimezoneAbbreviation>{timezoneAbbreviation}</TimezoneAbbreviation>
      </div>
      <Close name={city.fields.geonameid} onClick={closeHandler}>
        <FontAwesomeIcon style={{ float: "right" }} icon={faTimes} />
      </Close>
      {view === "digital" && (
        <TimeString>
          {hours} <SC>:</SC> {minutes} <SC>:</SC> {seconds} {timeOfDay}
        </TimeString>
      )}
    </Container>
  );
};

export default LocationDisplay;
