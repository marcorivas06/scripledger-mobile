import { Text, View, VStack, Box } from "@gluestack-ui/themed";
import { VerticalGiftCardTile } from "@components/molecules/GiftCardTile";
import { MyHeader, Page } from "@components/molecules/Page";
import { CircularButton } from "@components/atoms/CircularButton";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { HStack } from "@gluestack-ui/themed";
import { TabIcon } from "@components/atoms/TabIcon";
import { ActionButton } from "@components/atoms/ActionButton";

export const Settings = ({navigation}) => {
  return (
    <Page fullWidth>
      <ScrollView style={{ flex: 1 }} >
        <MyHeader
          title="Settings"
          marginBottom={30}
          marginTop={30}
          rightHeaderComponent={
            <CircularButton name="close-a" as="Fontisto" iconSize='md' radius="$full" onPress={navigation.goBack}/>
          }
        />
        
        <Box marginTop={10} width='100%' alignItems="center" >
          <View width='90%' backgroundColor="rgba(0,0,0,0.06 )" padding={15} borderRadius={5}>
          <TouchableOpacity>
            <HStack justifyContent="space-between"> 
              <Text>
                Marcos Rivas
              </Text>
              <TabIcon as="Entypo" name="chevron-right"/>
            </HStack>
          </TouchableOpacity>
          </View>
        </Box>
        
        <SettingActionForCategory categoryTitle='General' data={general} />
        <SettingActionForCategory categoryTitle='Help Us' data={helpUs} />
        <View marginTop={20} alignItems="flex-start">
          <ActionButton buttonName='Log Out' width={120} />
        </View>
        </ScrollView>
    </Page>
  )
}

const SettingActionForCategory = ({categoryTitle, data}) => (
  <>
    <MyHeader
      title={categoryTitle}
      isSubsectionHeader={true}
      marginTop={40}
    />
    <Box marginTop={10} width='100%' alignItems="center" >
      {
        data.map((item, index) => (
        <SettingAction key={`${index}-${item.title}`} item={item} index={index} />
      ))
      }
    </Box>
  </>
)


const SettingAction = ({item,index}) => (
  <View  width='90%'  borderBottomWidth={index === general.length - 1 ? 0 : 1} borderBottomColor="rgba(0,0,0,0.26 )" padding={15} borderRadius={5}>
      <TouchableOpacity>
        <HStack justifyContent="space-between"> 
          <Text>
            {item.title}
          </Text>
          <TabIcon as="Entypo" name="chevron-right"/>
        </HStack>
      </TouchableOpacity>
    </View>
)

const general = [
  {
    title:"Contact Information",
  },
  {
    title:"Language",
  },
  {
    title:"Notifications",
  },
]

const helpUs = [
  {
    title:"Submit feedback",
  },
]

const settingActions = {
  general: general,
  helpUs: helpUs
}


export default Settings