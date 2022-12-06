import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { ModuleList } from '@screens/ModuleList';
import { InspectionOpList } from '@screens/InspectionOpList';
import { Fineshid } from '@screens/Fineshid';
import { InspectionOp } from '@screens/InspectionOp';
import { InspectionOpNew } from '@screens/InspectionOpNew';

type AppRoutes = {
  home: undefined;
  moduleList: { codModulo: string };
  inspectionOpList: undefined;
  inspectionOp: { dataInspecao: string, codOrdemProducao: string};
  inspectionOpNew: undefined;
  fineshid: undefined;
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return(
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen 
        name="home"
        component={Home}
      />
      <Screen 
        name="moduleList"
        component={ModuleList}
      />
      <Screen 
        name="inspectionOpList"
        component={InspectionOpList}
      />
      <Screen 
        name="inspectionOp"
        component={InspectionOp}
      />
      <Screen 
        name="inspectionOpNew"
        component={InspectionOpNew}
      />
      <Screen 
        name="fineshid"
        component={Fineshid}
      />
    </Navigator>
  )
}