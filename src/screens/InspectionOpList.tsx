import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  Box,
  VStack,
  FlatList,
  useToast
} from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { ScreenHeader } from "@components/ScreenHeader";
import { Input } from "@components/Input";
import { CardOp } from "@components/CardOp";
import { Button } from "@components/Button";
import { Loading } from '@components/Loading';

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';
import { InspectionOpDTO } from '@dtos/InspectionOpDTO';

export function InspectionOpList() {

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [inspectionOpList, setInspectionOpList] = useState<InspectionOpDTO[]>([]);
  const toast = useToast();
  const empresa = 50;
  const token = 'eyJhbGciOiJFUzI1NiJ9.eyJzdWIiOiJjeC5kaGllZ28uc2FudG9zIiwiaXNzIjoiY3N3U2VydmVyIiwiaWF0IjoxNjY4Nzc5NjU3LCJhdWQiOiJjc3dWaWV3IiwiY3N3VG9rZW4iOiJ0WHJQY0xzN1o0UmNvdnY2VGo2a3h3IiwiZGJOYW1lU3BhY2UiOiJzaXN0ZW1hcyJ9.Z6usyCyYXDl8yAQbfkDbritv-bCHvgqL7Ehu9FtCGMpBB4FC2SY9v4qOCZGswjTf6qKVotmbgZCARxx_FmfWMw';

  function handleInspectionOp(dataInspecao: string, codOrdemProducao: string) {
    navigation.navigate('inspectionOp', {dataInspecao, codOrdemProducao})
  }

  function handleInspectionOpNew() {
    navigation.navigate('inspectionOpNew');
  }

  async function fetchInspectionOpList() {
    try {
      setIsLoading(true);

      const response = await api.get(`/custom/v10/inspecaoQualidade?empresa=${empresa}`, {
        headers: {
          'Authorization': `${token}`
        }
      });

      const data = response.data.data;
      setInspectionOpList(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? "Não foi possivel carregar. Tente mais tarde" : 'Não foi possível carregar as Inspeções de OPs. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchInspectionOpList();
  },[]);

  return(
    <VStack
      flex={1}
      bg="white"
    >
      <HomeHeader />

      <ScreenHeader 
        title="Inspeção de OP"
      />

      <Box 
        px={6}
      >
        <Input 
          placeholder="Pesquisar Ordem de Produção"
        />
      </Box>

      {
        isLoading ? <Loading /> :
        
        <FlatList 
          data={inspectionOpList}
          keyExtractor={item => item.codOrdemProducao}
          renderItem={({ item }) => (
            <CardOp 
              date={item.dataInspecao} //Data
              op={item.codOrdemProducao} // Ordem de Produção
              situation={item.descStatus} // Status
              typeOp={item.descTipoOrdemProducao} // Tipo
              faction={item.descFacccaoCostura} // Facção
              amount={item.qtdOrdemProducao} // Quantidade de peças 
              onPress={() => handleInspectionOp(item.dataInspecao, item.codOrdemProducao)}
            />
          )}
          mx={6}
          showsVerticalScrollIndicator={false}
        />
      }

      

      <Box
        px={6}
        my={5}
      >
        <Button 
          title="Inspecionar Nova OP"
          onPress={handleInspectionOpNew}
        />
      </Box>
      
    </VStack>
  )
}