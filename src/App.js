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

const StyledWrapper = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 25px;
    min-width: 100vw;
    min-height: 100vh;
    background-color: rgba(16, 37, 66, 1);
  }
`;

const StyledHeader = styled(Typography)`
  && {
    color: white;
    font-weight: 700;
    width: 100%;
  }
`;

const InputWithStyles = styled(Input)`
  && {
    background-color: #fff;
    border: none;
    width: 180px;
    padding: 0 25px;
    border-radius: 25px 0 0 25px;
    height: 40px;
    margin-right: 2px;
    @media screen and (min-width: 600px) {
      width: 250px;
    }
    @media screen and (min-width: 1200px) {
      width: 400px;
    }
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

const StyledInfo = styled(Typography)`
  && {
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
    @media screen and (min-width: 1200px) {
      font-size: 17px;
    }
  }
`;

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchedCity, setSearchedCity] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = 'd08b723901098e3b21a5256e152368b1';
  const API = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}&units=metric`;

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
    <StyledWrapper>
      <StyledHeader variant="h5">weather app</StyledHeader>
      {displayInput(setInputValue, handleQuery, inputValue, errorMessage)}
      {!isLoading && searchedCity.city !== undefined ? (
        <DisplayWeather weather={searchedCity} />
      ) : null}
      {isLoading && <CircularStyle />}
      {searchedCity.length === 0 && (
        <StyledInfo>
          Write your city name above to check the weather.
        </StyledInfo>
      )}
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
