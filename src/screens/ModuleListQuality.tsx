import { useNavigation } from '@react-navigation/native';
import { 
  ScrollView,
  VStack 
} from "native-base"

import { HomeHeader } from "@components/HomeHeader"
import { ScreenHeader } from "@components/ScreenHeader"
import { ModuleCard } from "@components/ModuleCard"

import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function ModuleListQuality() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleInspectionOpList() {
    navigation.navigate('inspectionOpList')
  }

  return(
    <VStack
      bg="white"
      flex={1}
    >
      <HomeHeader />

      <ScreenHeader 
        title="Qualidade"
      />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        px={6}
      >
        <ModuleCard 
          title="Inspeção de OP"
          onPress={handleInspectionOpList}
          p={5}
        />
        <ModuleCard 
          title="Inspeção de OP"
          onPress={handleInspectionOpList}
          p={5}
        />
        <ModuleCard 
          title="Inspeção de OP"
          onPress={handleInspectionOpList}
          p={5}
        />
        <ModuleCard 
          title="Inspeção de OP"
          onPress={handleInspectionOpList}
          p={5}
        />
      </ScrollView>
      
    </VStack>
  ) 
}