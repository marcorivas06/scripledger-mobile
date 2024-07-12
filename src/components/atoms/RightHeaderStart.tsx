import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, VStack, HStack, Button, View } from "@gluestack-ui/themed";
import { TabIcon } from "@components/atoms/TabIcon";

export function RightHeaderHome() {
  return (
    <TouchableOpacity>
      <View bg="$inputbackground" padding={15} borderRadius="$full">
        <TabIcon name="settings" as="Feather" />
      </View>
    </TouchableOpacity>
  );
}
