import React from 'react';

import sun from '../icons/sun.gif';
import cloud from '../icons/cloud.gif';
import rain from '../icons/rain.gif';

const DisplayWeatherIcon = ({ weather, size }) => {
  let icon;
  const iconColor = 'rgba(248, 112, 96, 1)';
  let iconSize;
  if (size === 'large') {
    iconSize = '100px';
  } else {
    iconSize = '50px';
  }
  if (weather === 'Sun' || weather === 'Clear') {
    icon = (
      <img
        src={sun}
        alt="sunIcon"
        style={{ color: iconColor, width: iconSize, height: iconSize }}
      />
    );
  } else if (weather === 'Rain') {
    icon = (
      <img
        src={rain}
        alt="sunIcon"
        style={{ color: iconColor, width: iconSize, height: iconSize }}
      />
    );
  } else {
    icon = (
      <img
        src={cloud}
        alt="sunIcon"
        style={{ color: iconColor, width: iconSize, height: iconSize }}
      />
    );
  }
  return icon;
};

export default DisplayWeatherIcon;
