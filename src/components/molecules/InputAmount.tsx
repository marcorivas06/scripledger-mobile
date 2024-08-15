import React from "react";
import {
  Text,
  VStack,
  HStack,
  View,
  Box,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { DropDownExchange } from "@components/atoms/DropDownExchange";

export const InputAmount = ({
  typeOfInput,
  data,
  isDropdown,
  customRightComponent,
  borderColor,
  width,
  height,
  fontSize,
  ...props
}) => {
  return (
    <Box
      style={[
        styles.transparentBox,
        {
          borderColor: borderColor || "#9AC8C8",
          height: height || 100,
          width: width || 300,
        },
      ]}
    >
      <HStack flex={3}>
        <VStack flex={1}>
          <Text height={20} padding={4} fontSize={9}>
            {typeOfInput}
          </Text>
          <View height={80} width={160}>
            <Input
              variant="outline"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              borderWidth={0}
              marginTop={-10}
              marginLeft={-5}
              style={[styles.input, {width: (width-100) || 160}]}
            >
              <InputField
                placeholder="0"
                selectTextOnFocus={false}
                $focus-color="black"
                style={[styles.inputField, {fontSize: fontSize || 38}]}
                keyboardType="numeric"
              />
            </Input>
          </View>
        </VStack>
        {isDropdown && (
          <View flex={2} alignItems="center" justifyContent="center">
            <DropDownExchange data={data} />
          </View>
        )}
        {customRightComponent && (
          <View alignItems="center" justifyContent="center">
            {customRightComponent}
          </View>
        )}
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  transparentBox: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#9AC8C8",
    marginVertical: 5,
  },
  input: {
    fontFamily: "Josefin Sans",
    fontWeight: "bold",
    color: "black",
    fontSize: 34,
    padding: 10,
    height: 80,
  },
  inputField: {
    fontFamily: "Josefin Sans",
    fontWeight: "bold",
    height: 50,
  },
});

export default InputAmount;
