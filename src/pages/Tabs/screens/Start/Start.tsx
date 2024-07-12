import { RightHeaderHome } from "@components/atoms/RightHeaderStart";
import { TabIcon } from "@components/atoms/TabIcon";
import { Page, MyHeader, Section } from "@components/molecules/Page";
import { Text, VStack, HStack, Button, View, Box } from "@gluestack-ui/themed";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

//[PH]
const mockData = [
  
  {
    "id": 1,
    "name": "Shell Gas",
    "bgImage": "shellGas",
    "transactions": [
      {
        "note": "Slack Technologies",
        "amount": "123",
        "currency": "$",
        "date": "Friday"
      },
      {
        "note": "Uber",
        "amount": "123",
        "currency": "$",
        "date": "Today"
      },
      {
        "note": "Uber",
        "amount": "123",
        "currency": "$",
        "date": "Today"
      }
    ]
  },
  {
    "id": 52,
    "name": "Apple",
    "bgImage": "apple",
    "transactions": [
      {
        "note": "Slack Technologies",
        "amount": "123",
        "currency": "$",
        "date": "Friday"
      },
      {
        "note": "Uber",
        "amount": "123",
        "currency": "$",
        "date": "Today"
      },
      {
        "note": "Uber",
        "amount": "123",
        "currency": "$",
        "date": "Today"
      }
    ]
  },
  {
    "id": 0,
    "name": "Starbucks",
    "bgImage": "starbucks",
    "transactions": [
      {
        "note": "Slack Technologies",
        "amount": "123",
        "currency": "$",
        "date": "Today"
      },
      {
        "note": "Uber",
        "amount": "123",
        "currency": "$",
        "date": "Today"
      },
      {
        "note": "Uber",
        "amount": "123",
        "currency": "$",
        "date": "Today"
      },
      {
        "note": "Uber",
        "amount": "123",
        "currency": "$",
        "date": "Today"
      }
    ]
  },
]

function GiftCard(){
return(
  <>
  Hello World
  </>
)
}

export function Start({ navigation }) {
  
  const [cardData, setCardData] = useState(mockData);  
  
  return ( 
    <Page 
    fullWidth
    >  
        <MyHeader
        title="Welcome"
        userName="Marcos"
        isHomePage={true}
        rightHeaderComponent={RightHeaderHome}
        />
        <Section
        isHigherOpacity={true}
        >
          <MyHeader 
          title="My Wallet" 
          rightHeaderComponent={() => (<Text>See all</Text> )}
          isSubsectionHeader={true}
          />
          {/* TODO Implement GiftCards */}
           {/* <Box h={100} w={100} bg="$primary100">
            <VStack>
              <HStack>

              </HStack>
              <Text>

              </Text>
           </VStack>
           </Box> */}

        </Section>
      
    </Page>
  );
}