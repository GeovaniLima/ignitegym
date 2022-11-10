import {
  Heading,
  HStack,
  VStack,
  Text,
  Icon
} from 'native-base';

import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { UserPhoto } from './UserPhoto';

export function HomeHeader() {
  return(
    <HStack
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
      alignItems="center"
    >
      <UserPhoto 
        source={{ uri: 'https://github.com/GeovaniLima.png' }}
        size={16}
        alt="Imagem do usuario"
        mr={4}
      />

      <VStack
        flex={1}
      >
        <Text
          color="gray.100"
          fontSize="md"
        >
          Olá,
        </Text>

        <Heading
          color="gray.100"
          fontSize="md"
        >
          Geovani Lima
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon 
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}