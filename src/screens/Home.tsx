import { useNavigation } from '@react-navigation/native';
import {
  VStack,
  Text,
  ScrollView,
  HStack
} from 'native-base';

import { HomeHeader } from '@components/HomeHeader';
import { ModuleCard } from '@components/ModuleCard';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Home(){
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleModuleListQuality() {
    navigation.navigate('moduleListQuality')
  }

  return(
    <VStack
      bg="white"
      flex={1}
    >
      <HomeHeader />

      <VStack
        px={6} 
        mt={10}
        mb={5}
      >
        <Text
          color="darkText"
          fontFamily="body"
          fontSize="md"
        >
          Escolha um módulo para continuar 
        </Text>
      </VStack>

      <ScrollView
        mx={6}
        mb={10}
        showsVerticalScrollIndicator={false}
      >
        <HStack
          flex={1}
          flexWrap='wrap'
        >
          <ModuleCard 
            title="Qualidade"
            onPress={handleModuleListQuality}
            p={10}
          />
        </HStack>
        
      </ScrollView>
    </VStack>
  )
}