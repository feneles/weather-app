import React from 'react';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import BeachAccessOutlinedIcon from '@material-ui/icons/BeachAccessOutlined';

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
      <WbSunnyOutlinedIcon
        style={{ color: iconColor, width: iconSize, height: iconSize }}
        large="true"
      />
    );
  } else if (weather === 'Rain') {
    icon = (
      <BeachAccessOutlinedIcon
        style={{ color: iconColor, width: iconSize, height: iconSize }}
        large="true"
      />
    );
  } else {
    icon = (
      <CloudOutlinedIcon
        style={{ color: iconColor, width: iconSize, height: iconSize }}
        large="true"
      />
    );
  }
  return icon;
};

export default DisplayWeatherIcon;
