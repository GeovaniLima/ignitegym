import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  VStack,
  HStack,
  Text,
  FlatList
} from 'native-base';

import { useAuth } from '@hooks/useAuth';

import { HomeHeader } from '@components/HomeHeader';
import { ModuleCard } from '@components/ModuleCard';

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { UserDTO } from '@dtos/UserDTO';


export function Home(){
  const [descModule, setDescModule] = useState<UserDTO[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { user } = useAuth();

  function handleModuleList(codModulo: string) {
    navigation.navigate('moduleList', { codModulo })
  }

  function fetchModule() {
    const codAplicativo = user.dadosCustomizados[0].aplicativos[0].codAplicativo;

    if(codAplicativo == 1) {
      const modulos = user.dadosCustomizados[0].aplicativos[0].modulos;
      setDescModule(modulos);
    }
  }

  useEffect(() => {
    fetchModule();
  }, [])

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

      <FlatList 
        data={descModule}
        keyExtractor={item => item.codModulo}
        renderItem={({ item }) => (
          <HStack>
            <ModuleCard 
              w={120}
              title={item.descModulo}
              onPress={() => handleModuleList(item.codModulo)}
            />
          </HStack>
        )}
        mx={6}
        mb={10}
        showsVerticalScrollIndicator={false}
    />
    </VStack>
  )
}