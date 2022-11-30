import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import {
  VStack,
  Image,
  Heading
} from 'native-base';

import { Button } from '@components/Button';

import FineshidImg from '@assets/fineshid.png';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Fineshid() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleInspectionOpList() {
    navigation.navigate('inspectionOpList')
  }

  function handleHome() {
    navigation.navigate('home')
  }

  return(
    <VStack
      bg="white"
      justifyContent="center"
      alignItems="center"
      flex={1}
      px={6}
    >
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      /> 
      <Image 
        source={FineshidImg}
        defaultSource={FineshidImg}
        alt="OP Finalizada"
        resizeMode='contain'
      />

      <Heading
        color="darkText"
        fontFamily="heading"
        fontSize="lg"
        mt={8}
      >
        Inspeção Realizada com Sucesso!
      </Heading>

      <Button 
        title="Voltar para as Inspeções Realizadas"
        onPress={handleInspectionOpList}
        mt={10}
        mb={5}
      />

      <Button 
        title="Voltar para Home"
        variant='outline'
        onPress={handleHome}
      />
    </VStack>
  )
}