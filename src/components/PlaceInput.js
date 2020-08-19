import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { timezones } from "../data/timezones";

const StyledInput = styled.input`
  outline: none;
  box-sizing: border-box;
  background-color: rgba(125, 125, 125, 0.1);
  border: none;
  border-bottom: 2px solid #282828;
  transition: border-bottom-color 0.2s ease-in;
  padding: 1rem;
  width: 100%;
  font-size: 2rem;
  color: white;
  font-weight: 400;

  &:focus {
    /* background: rgba(255, 255, 255, 0.2); */
    border-bottom-color: #4179a6;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    transition: opacity 0.2s ease-in;
    color: #303030;
  }
`;

const StyledDropdown = styled.div`
  background: none;
  margin-bottom: 1em;
  height: ${(props) => (props.dropdownActive ? props.dropdownHeight : "1px")};
  transition: height 0.1s ease-in-out;
  width: 100%;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  backdrop-filter: blur(10px) opacity(100) brightness(0.2);
  width: 100%;
`;

const StyledButton = styled.button`
  outline: none;
  border: none;
  background: none;
  /* background-color: #282828; */
  font-size: 1.5rem;
  padding: 1rem;
  color: lightgray;
  border-bottom: 1px solid #282828;
  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const PlaceInput = ({ addClock }) => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [dropdownActive, setDropdownActive] = useState(false);

  const dropdownHeight = `${results.length * 50}px`;

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };

  useEffect(() => {
    setDropdownActive(searchValue.length !== 0);
  }, [searchValue]);

  useEffect(() => {
    async function fetchData() {
      const get = await fetch(
        `https://rough-night-99a5.alkmt.workers.dev/cities?fields%5B%5D=geonameid&fields%5B%5D=asciiname&fields%5B%5D=timezone&filterByFormula=SEARCH(%22${searchValue.toLowerCase()}%22%2C+LOWER(asciiname))&maxRecords=3&sort%5B0%5D%5Bfield%5D=population&sort%5B0%5D%5Bdirection%5D=desc`
      );
      const res = await get.json();
      console.log(res.records);
      setResults(res.records);
    }
    if (searchValue.length > 0) {
      fetchData();
      // console.log(time);
      // const time = fetchData();
      // setResults(
      //   timezones.map((timezone) => {
      //     return timezone;
      //   })
      // );
      // console.log(timezones);
    } else {
      setResults([]);
    }
  }, [searchValue]);

  const addClockHandler = (value) => {
    setSearchValue("");
    addClock(value);
  };

  const clickHandler = (e) => {
    addClockHandler(
      results.filter(
        (city) => city.fields.geonameid === parseInt(e.target.value, 10)
      )[0]
    );
  };

  return (
    <>
      <StyledInput
        onChange={handleChange}
        placeholder="Add city..."
        value={searchValue}
        type="text"
      />
      <StyledDropdown
        dropdownHeight={dropdownHeight}
        dropdownActive={dropdownActive}
      >
        <StyledList>
          {results &&
            results.map((city) => (
              <StyledListItem key={city.id}>
                <StyledButton
                  value={city.fields.geonameid}
                  onClick={clickHandler}
                >
                  {city.fields.asciiname}
                </StyledButton>
              </StyledListItem>
            ))}
        </StyledList>
      </StyledDropdown>
    </>
  );
};

export default PlaceInput;
