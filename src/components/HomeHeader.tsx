import {
  Heading,
  HStack,
  VStack,
  Text,
  Icon
} from 'native-base';

import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { UserPhoto } from './UserPhoto';
import { useAuth } from '@hooks/useAuth';

export function HomeHeader() {
  const { user, signOut } = useAuth();
  
  return(
    <HStack
      bg="green.700"
      pt={16}
      pb={5}
      px={6}
      alignItems="center"
    >
      <UserPhoto 
        source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
        size={16}
        alt="Imagem do usuario"
        mr={2}
      />

      <VStack
        flex={1}
      >
        <Heading
          color="gray.100"
          fontSize="md"
          fontFamily="heading"
        >
          Olá, {user.nome}
        </Heading>

        <Text
          color="gray.100"
          fontSize="xs"
        >
          Seja bem vindo a empresa {user.empresaPadrao}
        </Text>
      </VStack>

      <TouchableOpacity>
        <Icon 
          as={Feather}
          name="settings"
          color="gray.200"
          size={7}
          mr={14}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={signOut}
      >
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