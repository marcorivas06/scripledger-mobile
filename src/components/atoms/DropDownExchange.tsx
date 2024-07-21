import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from "react-native";
import { TabIcon } from './TabIcon';
import { Text, VStack, HStack, Button, View, Box, Input,InputField } from "@gluestack-ui/themed";
import { TouchableOpacity } from 'react-native-gesture-handler';

export const DropDownExchange = ({ data,...props  }) => {
  return (
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <HStack alignItems='center'>
              {selectedItem && (
                <TabIcon marginRight={10} as='MaterialCommunityIcons' name={selectedItem.icon}/>
              )}
              
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Select brand'}
              </Text>
                <TabIcon size='sm' marginRight={10} as='MaterialCommunityIcons' name={isOpened ? 'chevron-up' : 'chevron-down'} />
              </HStack>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
              <TabIcon as='MaterialCommunityIcons' name={item.icon} style={styles.dropdownItemIconStyle} />
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
    width: 140,
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
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
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
    
  },
  dropdownItemIconStyle: {
    fontSize: 16, // Adjust icon size to fit item height
    marginRight: 8,
    
  },
});