import { useNavigation } from '@react-navigation/native';
import {
  Center,
  Heading,
  HStack,
  Icon
} from 'native-base';

import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  title: string;
  bg?: string;
  color?: string;
}

export function ScreenHeader({ title, bg="white", color="darkText" }: Props) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }


  return(
    <HStack
      bg={bg}
      pb={6}
      pt={16}
      px={6}
    >
      <TouchableOpacity
        onPress={handleGoBack}
      >
        <Icon 
          as={Feather}
          name="arrow-left"
          color={color}
          size={7}
        />
      </TouchableOpacity>

      <Center
        flex={1}
      >
        <Heading
          color={color}
          fontSize="lg"
          fontFamily="body"
        >
          {title}
        </Heading>
      </Center>
    </HStack>
  )
}