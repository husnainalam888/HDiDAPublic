import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Profile from '../../Screens/Tabs/Profile';
import AdsTopTab from '../../Screens/Tabs/TopTabs/AdsTopTab';
import {SafeAreaView, Text} from 'react-native';
import {Colors, DarkColors} from '../../Utils/Colors';
import FAQ from '../../Screens/FAQ';
import ContactUs from '../../Screens/ContactUs';
import Header from '../../Components/Header';
import {SVG, svgWithColor} from '../../SVGS/SVG';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';
import {useLanguage} from '../../Provider/LanguageProvider';
const Tab = createMaterialTopTabNavigator();
const CustomTabBarLabel = ({route, focused}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const {localized} = useLanguage();
  const labelText = route.name;

  return (
    <Text
      style={[
        {
          color: focused ? Colors.Black : Colors.GrayDarker,
          textTransform: 'none',
        },
        theme == 'dark' && {color: focused ? 'white' : DarkColors.GrayDarkest},
      ]}>
      {localized[labelText]}
    </Text>
  );
};

const HelpAndSupportNav = () => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
      }}>
      <Header
        startIcon={
          theme == 'dark' ? svgWithColor('back', false, 'white') : SVG.back
        }
        title={'Help and Support'}
        titleStyle={{fontSize: 16}}
        style={{marginHorizontal: 16}}
      />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: ({focused}) => (
            <CustomTabBarLabel route={route} focused={focused} />
          ),
          tabBarStyle: [
            theme == 'dark' && {
              backgroundColor:
                theme == 'dark' ? DarkColors.GrayLighter : 'white',
            },
          ],
          tabBarIndicatorStyle: {
            backgroundColor: theme == 'dark' ? 'white' : Colors.Black,
          },
        })}>
        <Tab.Screen name="FAQ" component={FAQ} />
        <Tab.Screen name="Contact Us" component={ContactUs} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
export default HelpAndSupportNav;
