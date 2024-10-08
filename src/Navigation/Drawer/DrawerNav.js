import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../../Screens/Tabs/Home';
import CustomDrawerContent from './CustomDrawerContent';
import {DarkColors} from '../../Utils/Colors';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="DrawerHome" component={Home} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
