import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, VStack, HStack, Button, View } from "@gluestack-ui/themed";
import { TabIcon } from "@components/atoms/TabIcon";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';

// export const CircularButton = ({name, as})  => {
//   return (
//     <TouchableOpacity>
//       <View bg="$inputbackground" padding={15} borderRadius="$full">
//         <TabIcon name={name} as={as} />
//       </View>
//     </TouchableOpacity>
//   );
// }

export const CircularButton = ({name, as, radius})  => {
  return (
    <TouchableOpacity>
      <View bg="$inputbackground" padding={15} borderRadius={radius}>
        <TabIcon name={name} as={as} />
      </View>
    </TouchableOpacity>
  );
}

export const CircularColoredButton = ({name, as, gradientColor, size})  => {
  return (
    <TouchableOpacity
    style={styles.circle}
    >
      <LinearGradient
        colors={gradientColor} // Customize the gradient colors here
        style={[styles.gradient, {borderRadius:size}]}
      >
        <TabIcon name={name} as={as} color="white" />
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