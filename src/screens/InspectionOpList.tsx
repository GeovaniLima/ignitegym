import { useNavigation } from '@react-navigation/native';
import { 
  Box,
  ScrollView,
  VStack 
} from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { ScreenHeader } from "@components/ScreenHeader";
import { Input } from "@components/Input";
import { CardOp } from "@components/CardOp";
import { Button } from "@components/Button";

import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function InspectionOpList() {

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleInspectionNewOp() {
    navigation.navigate('inspectionOpNewOp')
  }

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

      <ScrollView
        px={6}
        showsVerticalScrollIndicator={false}
      >
        <CardOp 
          date="21/01/2022"
          op="Op: 1323872"
          situation="Situação da op: Gerada"
          typeOp="Tipo: Produção"
          faction="Facção: 18578 - MD FACÇÃO"
          amount="Quantidade de peças: 86"
          onPress={handleInspectionNewOp}
        />
        <CardOp 
          date="21/01/2022"
          op="Op: 1323872"
          situation="Situação da op: Gerada"
          typeOp="Tipo: Produção"
          faction="Facção: 18578 - MD FACÇÃO"
          amount="Quantidade de peças: 86"
          onPress={handleInspectionNewOp}
        />
        <CardOp 
          date="21/01/2022"
          op="Op: 1323872"
          situation="Situação da op: Gerada"
          typeOp="Tipo: Produção"
          faction="Facção: 18578 - MD FACÇÃO"
          amount="Quantidade de peças: 86"
          onPress={handleInspectionNewOp}
        />
        <CardOp 
          date="21/01/2022"
          op="Op: 1323872"
          situation="Situação da op: Gerada"
          typeOp="Tipo: Produção"
          faction="Facção: 18578 - MD FACÇÃO"
          amount="Quantidade de peças: 86"
          onPress={handleInspectionNewOp}
        />
      </ScrollView>

      <Box
        px={6}
        my={5}
      >
        <Button 
          title="Inspecionar Nova OP"
          onPress={handleInspectionNewOp}
        />
      </Box>
      
    </VStack>
  )
}