import React from "react";
import {
  siSimpleicons,
  siReact,
  siSteam,
  siHuawei,
  siGoogleplay,
  siApplemusic,
  siAirbnb,
  siAmazon,
  siAmericanairlines,
} from "simple-icons";
import Svg, { Path } from 'react-native-svg';

const icons = {
  "0": siSteam,
  "1": siHuawei,
  "2": siGoogleplay,
  "3": siAmericanairlines,
  "4": siSimpleicons,
  "5": siReact,
  "6": siApplemusic,
  "7": siAirbnb,
  "8": siAmazon,
};

export const SvgComponent = ({ id }) => {
  const icon = icons[id];
  if (!icon) return null;
  return (
    <Svg
      role="img"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill={`#${icon.hex}`}
    >
      <Path d={icon.path} />
    </Svg>
  );
};