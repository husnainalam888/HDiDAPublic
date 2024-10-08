import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Profile from '../../Screens/Tabs/Profile';
import AdsTopTab from '../../Screens/Tabs/TopTabs/AdsTopTab';
import {Text} from 'react-native';
import {Colors, DarkColors} from '../../Utils/Colors';
import {useLanguage} from '../../Provider/LanguageProvider';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';
import {styling} from '../../Screens/CarDetails/CarDetails';
const Tab = createMaterialTopTabNavigator();
const CustomTabBarLabel = ({route, focused}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const labelText = route.name; // You can customize the label as needed
  const {localized} = useLanguage();

  return (
    <Text
      style={{
        color:
          focused && theme != 'dark'
            ? Colors.Secondary
            : focused && theme == 'dark'
            ? 'white'
            : !focused && theme == 'dark'
            ? DarkColors.abadb4
            : Colors.GrayDarker,
        textTransform: 'none',
      }}>
      {localized[labelText.toLowerCase()]}
    </Text>
  );
};

const TopNav = () => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => (
          <CustomTabBarLabel route={route} focused={focused} />
        ),
        tabBarIndicatorStyle: {
          backgroundColor:
            theme == 'dark' ? DarkColors.Primary : Colors.Secondary,
        },
        tabBarStyle: {
          backgroundColor: theme == 'dark' ? '#0e0e0e' : 'white',
        },
      })}>
      <Tab.Screen
        name="Active"
        component={AdsTopTab}
        initialParams={{id: 'Active'}}
      />
      <Tab.Screen
        name="Removed"
        component={AdsTopTab}
        initialParams={{id: 'Removed'}}
      />
    </Tab.Navigator>
  );
};
export default TopNav;
