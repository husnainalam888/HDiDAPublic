import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectLanguage from '../Screens/SelectLanguage';
import Welcome from '../Screens/Welcome';
import SignIn from '../Screens/SignIn';
import OtpScreen from '../Screens/OtpScreen';
import LoginWithPassword from '../Screens/LoginWithPassword';
import CreateNewPassword from '../Screens/CreateNewPassword';
import Congrats from '../Screens/Congrats';
import BottomTabs from './Bottom/BottomTabs';
import CarDetails from '../Screens/CarDetails/CarDetails';
import ChatScreen from '../Screens/ChatScreen';
import Sell from '../Screens/Tabs/Sell';
import SellStep2 from '../Screens/SellStep2';
import SellStep3 from '../Screens/SellStep3';
import SellStep4 from '../Screens/SellStep4';
import CustomPackage from '../Screens/CustomPackage';
import ProfileSettings from '../Screens/ProfileSettings';
import EditProfile from '../Screens/EditProfile';
import ChangePassword from '../Screens/ChangePassword';
import Address from '../Screens/Address';
import SearchScreen from '../Screens/SearchScreen';
import SeeOffersOnMap from '../Screens/SeeOffersOnMap';
import About_us from '../Screens/About_us';
import ChangeLanguage from '../Screens/ChangeLanguage';
import ReferAFriend from '../Screens/ReferAFriend';
import Contacts from '../Screens/Contacts.js';
import Following from '../Screens/Following';
import Followers from '../Screens/Followers';
import HelpAndSupport from './Top/HelpAndSupportNav';
import Cart from '../Screens/Cart';
import BuyPackageAndMyOrders from '../Screens/BuyPackageAndMyOrder/BuyPackages&MyOrders';
import MyOrders from '../Screens/Orders/MyOrders';
import MyPaymentMethods from '../Screens/MyPaymentMethods/MyPaymentMethods';
import AddNewCard from '../Screens/AddNewCard';
import Profile from '../Screens/Tabs/Profile';
import Favorites from '../Screens/Favorites';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {arrayToObj} from '../Utils/Utils';
import PrivacyScreen from '../Screens/PrivacyScreen';
import SeeAll from '../Screens/SeeAll';
import MyDrawer from './Drawer/DrawerNav';
const Stack = createNativeStackNavigator();
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';
import GetVerifiedScreen from '../Screens/GetVerifiedScreen';
import NotificationScreen from '../Screens/NotificationScreen';

function MyStack() {
  const navigation = useNavigation();
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  React.useEffect(() => {
    const unscribeMessage = messaging().onMessage(async remoteMessage => {
      handleReceivedNotification(remoteMessage);
    });
    const unscribeMessageOpenedApp = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        console.warn(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
        const parsedData = JSON.parse(remoteMessage.data.data);
        const item = parsedData.post;
        navigation.navigate('CarDetails', {item, info: arrayToObj(item.info)});
      },
    );
    return () => {
      unscribeMessage();
      unscribeMessageOpenedApp();
    };
  });
  const handleReceivedNotification = remoteMessage => {
    console.log('Notification handled in the background!', remoteMessage);
  };

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="SelectLanguage" component={SelectLanguage} /> */}
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="LoginWithPassword" component={LoginWithPassword} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
      <Stack.Screen name="Congrats" component={Congrats} />
      <Stack.Screen
        name="BottomTabs"
        component={user?.id == 'guest' ? MyDrawer : BottomTabs}
      />
      <Stack.Screen name="CarDetails" component={CarDetails} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="SellStep1" component={Sell} />
      <Stack.Screen name="SellStep2" component={SellStep2} />
      <Stack.Screen name="SellStep3" component={SellStep3} />
      <Stack.Screen name="SellStep4" component={SellStep4} />

      <Stack.Screen name="CustomPackage" component={CustomPackage} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
      <Stack.Screen name="About_us" component={About_us} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="SeeAll" component={SeeAll} />
      <Stack.Screen name="SeeOffersOnMap" component={SeeOffersOnMap} />
      <Stack.Screen name="ReferAFriend" component={ReferAFriend} />
      <Stack.Screen name="Following" component={Following} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="HelpAndSupportNav" component={HelpAndSupport} />
      <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="MyPaymentMethods" component={MyPaymentMethods} />
      <Stack.Screen name="AddNewCard" component={AddNewCard} />
      <Stack.Screen name="GetVerified" component={GetVerifiedScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen
        name="BuyPackagesAndMyOrders"
        component={BuyPackageAndMyOrders}
      />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
}

export default MyStack;
