import React from "react";
import {
  siSteam as Steam,
  siHuawei as Huawei,
  siGoogleplay as GooglePlay,
  siAmericanairlines as AmericanAirlines,
  siApplemusic as AppleMusic,
  siAirbnb as Airbnb,
  siAmazon as Amazon,
  siStarbucks as Starbucks,
  siTarget as Target,

} from "simple-icons";
import Svg, { Path } from 'react-native-svg';

const BRAND_ICONS = {
  "0": {title:"Steam", svg: Steam},
  "1": {title:"Huawei", svg: Huawei},
  "2": {title:"Google Play", svg: GooglePlay},
  "3": {title:"American Airlines", svg: AmericanAirlines},
  "4": {title:"Apple Music", svg: AppleMusic},
  "5": {title:"Airbnb", svg: Airbnb},
  "6": {title:"Amazon", svg: Amazon},
  "Starbucks": {title:"Starbucks", svg: Starbucks},
  "Target": {title:"Target", svg: Target},
};

export function GetBrandsTitleForId(id):string{  
  const icon = BRAND_ICONS[id];
  if (icon) {
    return icon.title;       // Return the title
  }
  return ''; // Return an empty string if no icon is found
}

export const SvgComponent = ({ id, ...props }) => {
  const icon = BRAND_ICONS[id]?.svg;
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