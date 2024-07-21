import React from 'react';
import { View, Text } from 'react-native';
import { Box, VStack, HStack} from '@gluestack-ui/themed';
import { TabIcon } from './TabIcon';

export const ExchangeBrandsInfoBox = ({ icon, name, dollar, percentRate, ...props }) => {
  const iconColor = percentRate >= 0 ? ['#07F8B5','#2A4037'] : ['#FF6767','#402A2A'];
  const iconName = percentRate >= 0 ? 'trending-up' : 'trending-down';

  return (
    <Box width={360} style={styles.infoBox}>
      <View style={styles.innerShadowBox}>
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

const styles = {
  infoBox: {
    borderRadius: 10,
    marginBottom: 10,
  },
  innerShadowBox: {
    backgroundColor: '#FFFFFF', // Solid white background
    borderRadius: 5,
    padding: 10,
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
