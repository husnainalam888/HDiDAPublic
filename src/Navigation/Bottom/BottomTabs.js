import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar'; // Import your custom tab bar component
import Home from '../../Screens/Tabs/Home';
import MyDrawer from '../Drawer/DrawerNav';
import Ads from '../../Screens/Tabs/Ads';
import Sell from '../../Screens/Tabs/Sell';
import Chat from '../../Screens/Tabs/Chat';
import Profile from '../../Screens/Tabs/Profile';
import {useLanguage} from '../../Provider/LanguageProvider';
import {LOCALIZED_STRINGS} from '../../Utils/Strings';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />} // Use your custom tab bar component
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        keyboardHidesTabBar: true,
        tabBarStyle: {position: 'absolute'},
        // Hide the header for all screens
      }}>
      <Tab.Screen name={'Home'} component={MyDrawer} />
      {user?.id != 'guest' && <Tab.Screen name={'Ads'} component={Ads} />}
      <Tab.Screen name={'Sell'} component={Sell} />
      <Tab.Screen name={'Chat'} component={Chat} />
      {user?.id != 'guest' && (
        <Tab.Screen name={'MyProfile'} component={Profile} />
      )}
    </Tab.Navigator>
  );
};

export default BottomTabs;
