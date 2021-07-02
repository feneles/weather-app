import React from 'react';
import styled from 'styled-components';
import { Container, Typography } from '@material-ui/core';

const StyledContainer = styled(Container)`
  && {
    margin-top: auto;
    width: 100%;
    text-align: center;
  }
`;

const StyledText = styled(Typography)`
  && {
    font-size: 11px;
    color: #fff;
    @media screen and (min-width: 600px) {
      font-size: 14px;
    }
  }
`;

const DisplayFooter = () => {
  return (
    <StyledContainer>
      <StyledText>© 2021 Design & Developed by Marek Rogala.</StyledText>
    </StyledContainer>
  );
};

export default DisplayFooter;
