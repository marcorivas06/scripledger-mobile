import React, { useEffect, useState } from "react";
import { CircularButton } from "@components/atoms/CircularButton";
import { TabIcon } from "@components/atoms/TabIcon";
import { Page, MyHeader, Section } from "@components/molecules/Page";
import {
  Button,
  ButtonText,
  ButtonIcon,
} from "@gluestack-ui/themed";

export const ActionButton = ({buttonName, width, onPress, bg}) => (
  <Button
    width={width}
    margin={17}
    marginBottom={67}
    borderRadius="$full"
    size="lg"
    variant="solid"
    bgColor={ bg || "black"}
    action="primary"
    onPress={onPress}
  >
    <ButtonText style={{fontSize:14}}> {buttonName} </ButtonText>
  </Button>
)