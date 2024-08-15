import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "@gluestack-ui/themed";
import { TabIcon } from "@components/atoms/TabIcon";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';

export const CircularButton = ({name, as, radius, onPress, iconSize, ...props})  => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View bg="rgba(0, 0, 0,0.04)" padding={15} borderRadius={radius}>
        <TabIcon name={name} as={as} size={iconSize} />
      </View>
    </TouchableOpacity>
  );
}

export const CircularColoredButton = ({name, as, gradientColor, size, onPress})  => {
  return (
    <TouchableOpacity
    style={styles.circle}
    onPress={onPress}
    >
      <LinearGradient
        colors={gradientColor} // Customize the gradient colors here
        style={[styles.gradient, {borderRadius:size, width:size, height:size}]}
      >
        <TabIcon name={name} as={as} color="white" size='lg' />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    padding: 15,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
  },
  circle: {
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
  }
});