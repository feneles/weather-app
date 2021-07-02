import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Container,
  Input,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import DisplayWeather from './components/DisplayWeather';
import DisplayFooter from './components/DisplayFooter';

import './App.css';

const StyledWrapper = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    padding-bottom: 25px;
    background-color: rgba(16, 37, 66, 1);
    min-height: 100vh;
  }
`;

const StyledHeader = styled(Typography)`
  && {
    color: white;
    font-weight: 700;
  }
`;

const InputWithStyles = styled(Input)`
  && {
    background-color: #fff;
    border: none;
    width: 180px;
    min-width: 40vw;
    padding: 0 25px;
    border-radius: 25px 0 0 25px;
    height: 40px;
    margin-right: 2px;
  }
`;

const StyledQueryContainer = styled(Container)`
  && {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    justify-content: center;
    margin: 15px 0;
    position: relative;
  }
`;

const ButtonStyled = styled(Button)`
  && {
    background-color: rgba(248, 112, 96, 1);
    color: white;
    text-transform: none;
    width: 65px;
    height: 40px;
    border-radius: 0 25px 25px 0;
    font-weight: 600;
    :hover {
      background-color: rgba(248, 112, 96, 0.8);
    }
  }
`;

const StyledError = styled(Typography)`
  && {
    position: absolute;
    top: 43px;
    left: 50%;
    transform: translateX(-50%);
    color: red;
  }
`;

const CircularStyle = styled(CircularProgress)`
  && {
    position: fixed;
    top: 35%;
    left: calc(50% - 20px);
    color: rgba(248, 112, 96, 1);
  }
`;

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchedCity, setSearchedCity] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = 'd08b723901098e3b21a5256e152368b1';
  const API = `http://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}&units=metric`;

  async function handleQuery(event) {
    event.preventDefault();
    setIsLoading(true);

    if (inputValue === '') {
      setErrorMessage(true);
      setIsLoading(false);
    } else {
      setErrorMessage(false);
      const data = await fetch(API)
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.error(error));
      setSearchedCity(data);
      setInputValue('');
      setIsLoading(false);
    }
  }

  return (
    <StyledWrapper maxWidth="lg">
      <StyledHeader variant="h5">weather app</StyledHeader>
      {displayInput(setInputValue, handleQuery, inputValue, errorMessage)}
      {!isLoading && searchedCity.city !== undefined ? (
        <DisplayWeather weather={searchedCity} />
      ) : null}
      {isLoading && <CircularStyle />}
      <DisplayFooter />
    </StyledWrapper>
  );
};

const displayInput = (setInputValue, handleQuery, inputValue, errorMessage) => {
  const handleChange = event => {
    setInputValue(event.target.value);
  };
  return (
    <StyledQueryContainer>
      <form>
        <InputWithStyles
          error={true}
          onChange={handleChange}
          value={inputValue}
          disableUnderline={true}
        />
        <ButtonStyled
          type="submit"
          variant="contained"
          onClick={event => handleQuery(event)}
        >
          search
        </ButtonStyled>
      </form>
      {errorMessage && (
        <StyledError variant="caption">please enter city name</StyledError>
      )}
    </StyledQueryContainer>
  );
};

export default App;
