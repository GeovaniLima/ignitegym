import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { 
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Icon
} from 'native-base';


type Props = TouchableOpacityProps & {

}

export function ExerciseCard({ ...rest}: Props ) {
  return(
    <TouchableOpacity
      {...rest}
    >
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        mb={3}
        rounded="md"
      >
        <Image 
          source={{ uri: 'https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-2.jpg' }}
          alt="Remanda Unilateral"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="center"
        />

        <VStack
          flex={1}
        >
          <Heading
            color="white"
            fontSize="lg"
          >
            Remanda unilateral
          </Heading>
          <Text
            color="gray.200"
            fontSize="sm"
            mt={1}
            numberOfLines={2}
          >
            3 series x 12 repetições
          </Text>
        </VStack>

        <Icon 
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  )
}