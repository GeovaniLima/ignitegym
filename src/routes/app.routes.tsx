import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { ModuleListQuality } from '@screens/ModuleListQuality';
import { InspectionOpList } from '@screens/InspectionOpList';
import { Fineshid } from '@screens/Fineshid';
import { InspectionNewOp } from '@screens/InspectionNewOp';

type AppRoutes = {
  home: undefined;
  moduleListQuality: undefined;
  inspectionOpList: undefined;
  inspectionOpNewOp: undefined;
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
        name="moduleListQuality"
        component={ModuleListQuality}
      />
      <Screen 
        name="inspectionOpList"
        component={InspectionOpList}
      />
      <Screen 
        name="inspectionOpNewOp"
        component={InspectionNewOp}
      />
      <Screen 
        name="fineshid"
        component={Fineshid}
      />
    </Navigator>
  )
}