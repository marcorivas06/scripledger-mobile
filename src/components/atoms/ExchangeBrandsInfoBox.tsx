import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Box, VStack, HStack} from '@gluestack-ui/themed';
import { TabIcon } from './TabIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ExchangeBrandsInfoBox = ({ icon, name, dollar, percentRate, ...props }) => {
  const iconColor = percentRate >= 0 ? ['#07F8B5','#2A4037'] : ['#FF6767','#402A2A'];
  const iconName = percentRate >= 0 ? 'trending-up' : 'trending-down';

  return (
    <Box width={360} style={styles.infoBox}>
      <View style={styles.innerShadowBoxExchange}>
        <TabIcon as='MaterialCommunityIcons' name={icon} size={20} style={styles.storeIcon} />
        <Text style={styles.storeName}>{name} Store</Text>
        <VStack alignItems='flex-end' marginRight={10} >
          <Text style={styles.storeDollar}>{`$${dollar.toFixed(1)}`}</Text>
          <HStack borderRadius={20} alignItems='center' bgColor={iconColor[1]} padding={5}>
            <TabIcon as='MaterialCommunityIcons' name={iconName}  size={15} color={iconColor[0]} style={styles.trendIcon} />  
            <Text style={[styles.percentRate, { color: iconColor[0] }]}>{`${Math.abs(percentRate)}%`}</Text>
          </HStack>
        </VStack>
      </View>
    </Box>
  );
};

export const MailBox = ({ icon, name, onPress  }) => {
  return (
    <View width='90%' borderRadius={20}>
      <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.infoBox,
        { backgroundColor: pressed ? 'rgba(128, 128, 128, 0.5)' : '#000' }
      ]}
      >
        <MailBoxContent icon={icon} name={name} />
      </Pressable>
    </View>
  );
};

export const MailBoxContent = ({ icon, name, iconColor, fontColor, ...props }) => {
  return (  
    <View style={styles.innerShadowBox}>
      <TabIcon as='Feather' name={icon} size={20} color={iconColor || 'white'} style={styles.storeIcon} />
      <Text style={[styles.email, {color: fontColor || 'white' }]}>{name}</Text>
    </View>
  );
};

const styles = {
  infoBox: {
    borderRadius: 10,
    marginBottom: 10,
  },
  innerShadowBox: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // iOS Shadow Properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Shadow Property
    elevation: 5,
  },
  innerShadowBoxExchange: {
    padding: 15,

    backgroundColor: '#FFFFFF', // Solid white background
    borderRadius: 5,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // iOS Shadow Properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Shadow Property
    elevation: 5,
  },
  storeIcon: {
    width: 30,
    textAlign: 'center',
  },
  storeName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  email: {
    flex: 1,
    fontSize: 20,
    marginLeft: 10,
    color:'white',
    fontFamily: "DarkerGrotesque-Medium",
  },
  storeDollar: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trendIcon: {
    marginLeft: 5,
  },
  percentRate: {
    fontSize: 14,
  },
};
