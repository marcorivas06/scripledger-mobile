import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from "react-native";
import { TabIcon } from './TabIcon';
import { Text, VStack, HStack, Button, View, Box, Input,InputField } from "@gluestack-ui/themed";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetBrandsTitleForId, SvgComponent } from "@assets/BrandsSvgs/BrandsSvgs";
import { useEffect, useState } from 'react';

export const DropDownExchange = ({ data,...props  }) => {

  const [selectedBrand, setSelectedBrand] = useState(0)
  
  return (
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          setSelectedBrand(selectedItem)
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <HStack alignItems='center'>
              {selectedItem && (
                <SvgComponent id={selectedBrand.id} style={styles.svgIcon} />
              )}
                <TabIcon size='sm' marginRight={10} as='MaterialCommunityIcons' name={isOpened ? 'chevron-up' : 'chevron-down'} />
              </HStack>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
              <SvgComponent id={item.id} style={styles.svgIcon} />
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width:'50%',
    height: 33,
    backgroundColor: '#E9ECEF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent:'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 12, // Adjust font size to fit height
    fontWeight: '500',
    color: '#151E26',
    
  },
  svgIcon: {
    marginRight: 0,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    width:150
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 12, // Adjust font size to fit item height
    fontWeight: '500',
    color: '#151E26',
    marginHorizontal:5,
  },
  dropdownItemIconStyle: {
    fontSize: 16, // Adjust icon size to fit item height
    marginRight: 8,
    
  },
});