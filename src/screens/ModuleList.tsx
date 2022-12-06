import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  ScrollView,
  VStack,
  FlatList
} from "native-base"

import { useAuth } from '@hooks/useAuth';

import { HomeHeader } from "@components/HomeHeader"
import { ScreenHeader } from "@components/ScreenHeader"
import { ModuleCard } from "@components/ModuleCard"

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { UserDTO } from '@dtos/UserDTO';

type RouteParamsProps = {
  codModulo: string;
}

export function ModuleList() {
  const { user } = useAuth();
  const route = useRoute();
  const [funcao, setFuncao] = useState<UserDTO[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { codModulo } = route.params as RouteParamsProps;

  function handleInspectionOpList() {
    navigation.navigate('inspectionOpList')
  }

  function fetchModuleList() {
    const funcoes = user.dadosCustomizados[0].aplicativos[0].modulos[0].funcoes;

    setFuncao(funcoes);
  }

  useEffect(() => {
    fetchModuleList();
  }, [])

  return(
    <VStack
      bg="white"
      flex={1}
    >
      <HomeHeader />

      <ScreenHeader 
        title="Qualidade"
      />

      <FlatList 
        data={funcao}
        keyExtractor={item => item.codFuncao}
        renderItem={({ item }) => (
          <ModuleCard 
            h={75}
            title={item.descFuncao}
            onPress={handleInspectionOpList}
          />
        )}
        mx={6}
        mb={10}
        showsVerticalScrollIndicator={false}
      />
      
    </VStack>
  ) 
}