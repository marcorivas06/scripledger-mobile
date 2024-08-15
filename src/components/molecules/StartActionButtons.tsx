import { CircularColoredButton } from "@components/atoms/CircularButton";
import { Text, VStack, HStack } from "@gluestack-ui/themed";


export const StartActionButtons = ({actionArray}) => {
  
  return (
    <HStack style={{marginVertical:20}}>
            {actionArray.map((action, index) => 
              (
              <VStack style={{marginHorizontal:15, alignItems:'center'}} key={`${index}-${action.name}`}>
                <CircularColoredButton 
                name={action.iconName}
                as={action.iconAs}
                gradientColor = {action.gradientColor} 
                size={45}
                onPress={action.action}
                />
                <Text style={{marginTop:5, fontFamily:'DarkerGrotesque-SemiBold', color:'#51382F'}}>{action.name}</Text>
              </VStack>
            ))}
          </HStack>
  )
}