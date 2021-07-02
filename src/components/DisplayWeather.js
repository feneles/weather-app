import React from 'react';
import styled, { css } from 'styled-components';
import { Paper, Container, Typography } from '@material-ui/core';
import DisplayWeatherIcon from './DisplayWeatherIcon';

const StyledPaper = styled(Paper)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
    margin: 8px 5px;
    width: calc(50% - 10px);
    height: 100%;
    @media screen and (min-width: 600px) {
      padding: 8px;
    }
    @media screen and (min-width: 1200px) {
      width: calc(25% - 10px);
    }
    ${props =>
      props.primary &&
      css`
        width: 100%;
        @media screen and (min-width: 1200px) {
          width: 100%;
        }
      `}
  }
`;

const StyledCityName = styled(Typography)`
  && {
    text-align: center;
    color: #fff;
  }
`;

const StyledContainer = styled(Container)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0;
  }
`;

const StyledTemp = styled(Typography)`
  && {
    color: rgba(16, 37, 66, 1);
    font-weight: 600;
    font-size: 14px;
    margin: 3px 0;
    @media screen and (min-width: 600px) {
      font-size: 20px;
    }
    ${props =>
      props.primary &&
      css`
        font-size: 20px;
        @media screen and (min-width: 600px) {
          font-size: 25px;
        }
      `}
  }
`;

const StyledTextContainer = styled.div`
  && {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 98%;
    margin: 7px 0;
  }
`;

const DisplayWeather = props => {
  const { weather } = props;
  const days = [
    { day: weather.list[0], primary: 'true', size: 'large' },
    { day: weather.list[8] },
    { day: weather.list[16] },
    { day: weather.list[24] },
    { day: weather.list[32] }
  ];

  const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  const displayDays = days.map(el => {
    const temp = Math.round(el.day.main.temp);
    const date = el.day.dt_txt.split(' ')[0];
    const pressure = el.day.main.pressure;
    const sky = el.day.weather[0].main;

    const d = new Date(date);
    const n = d.getDay();

    return (
      <StyledPaper primary={el.primary} key={el.day.dt}>
        <DisplayWeatherIcon weather={sky} size={el.size} />
        {displayWeatherInfo('Day:', `${day[n]}`, el.primary)}
        {displayWeatherInfo('Temp:', `${temp}℃`, el.primary)}
        {displayWeatherInfo('Date:', date, el.primary)}
        {displayWeatherInfo('Weather:', `${sky}`, el.primary)}
        {el.primary &&
          displayWeatherInfo('Pressure:', `${pressure}hPa`, el.primary)}
      </StyledPaper>
    );
  });

  return (
    <Container>
      <StyledCityName variant="h5">{weather.city.name}</StyledCityName>
      <StyledContainer>{displayDays}</StyledContainer>
    </Container>
  );
};

const displayWeatherInfo = (name, value, primary) => (
  <StyledTextContainer>
    <StyledTemp primary={primary}>{name}</StyledTemp>
    <StyledTemp primary={primary}>{value}</StyledTemp>
  </StyledTextContainer>
);

export default DisplayWeather;
