// CustomDrawerContent.js

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {SvgFromXml} from 'react-native-svg';
import {SVG, svgWithColor} from '../../SVGS/SVG';
import {Colors, DarkColors} from '../../Utils/Colors';
import OtpScreen from '../../Screens/OtpScreen';
import {useNavigation} from '@react-navigation/native';
import {LOCALIZED_STRINGS} from '../../Utils/Strings';
import {global_storage} from '../../Utils/Utils';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {useLanguage} from '../../Provider/LanguageProvider';
import PackageButton from '../../Screens/BuyPackageAndMyOrder/Comps/PackageButton';
import LoginModal from '../../Components/LoginModal';

export const PreferenceBtn = item => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  return (
    <TouchableOpacity
      onPress={item.onPress}
      style={[styles.PreferenceBtn, item.style]}>
      <SvgFromXml
        xml={item.startIcon}
        height={item.startIconSize || 18}
        width={item.startIconSize || 18}
      />
      <View style={styles.PreferenceBtnRow}>
        <Text
          style={[
            {color: theme == 'dark' ? 'white' : Colors.GrayDarker},
            item.titleStyle,
          ]}>{`${item.title}`}</Text>
        {item.badge && (
          <View style={styles.badge}>
            <Text style={[styles.badgeText]}>{item.badge}</Text>
          </View>
        )}
      </View>
      <SvgFromXml
        style={item?.endIconStyle || {}}
        xml={
          item.endIcon
            ? item.endIcon
            : theme == 'dark'
            ? SVG.arrow_right_dark
            : SVG.arrow_right
        }
        height={18}
        width={18}
      />
    </TouchableOpacity>
  );
};

const CustomDrawerContent = props => {
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  const [theme, setTheme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const {localized, selectedLanguage, changeLanguage} = useLanguage();
  const [selected, setSelected] = React.useState(
    selectedLanguage == 'en' ? 'En' : 'العربية',
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigation = props.navigation;
  const Header = () => {
    return (
      <View style={styles.row}>
        <SvgFromXml
          xml={theme == 'dark' ? SVG.darkLogo : SVG.logo}
          height={34}
          width={34}
        />
        <Text style={styles.heading}>{'HDIDA'}</Text>
        <SvgFromXml
          onPress={() => navigation.toggleDrawer()}
          xml={theme == 'dark' ? SVG.crossDark : SVG.cross}
          height={34}
          width={34}
        />
      </View>
    );
  };
  const navigate = item => {
    navigation.closeDrawer();
    navigation.navigate(item);
  };
  const LangBtn = ({item}) => {
    const [theme] = useMMKVStorage('theme', global_storage, 'light');
    const styles = styling(theme);
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(item);
          changeLanguage(item == 'En' ? 'en' : item == 'Fr' ? 'fr' : 'ar');
        }}
        style={[
          styles.langBtn,
          item == selected && theme != 'dark'
            ? {borderColor: Colors.Black}
            : theme == 'dark' &&
              item == selected && {
                backgroundColor: DarkColors.GrayMedium,
              },
        ]}>
        <Text
          style={[
            styles.langBtnText,
            selected == item && theme != 'dark'
              ? {color: 'gray'}
              : theme == 'dark' && selected == item && {color: 'white'},
          ]}>{`${item}`}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header />
        <View style={styles.divider} />
        <View style={styles.simpleRow}>
          <LangBtn item={'En'} />
          <LangBtn item={'Fr'} />
          <LangBtn item={'العربية'} />
        </View>
        <Text style={styles.text}>{localized?.preferences}</Text>
        <PreferenceBtn
          // badge={'Beta'}
          startIcon={theme == 'dark' ? SVG.darkMoonMode : SVG.moon}
          onPress={() => {
            setTheme(theme == 'light' ? 'dark' : 'light');
          }}
          title={localized.darkMode}
          endIcon={theme == 'dark' ? SVG.darkSwitch : SVG.lightSwitch}
        />
        <PackageButton
          onPress={() => {
            if (user?.id == 'guest') {
              setShowLoginModal(true);
              return;
            }
            navigation.navigate('SellStep4', {
              hideCount: true,
            });
          }}
          fixLayout={true}
          style={{
            borderColor: Colors.Primary,
            borderWidth: 1,
            marginTop: 5,
            marginBottom: 5,
          }}
          titleStyle={{
            color: theme == 'dark' ? 'white' : Colors.GrayDarker,
            fontWeight: '400',
          }}
          startIcon={theme == 'dark' ? SVG.grayWalletDark : SVG.grayWallet}
          title={localized.buy_packages}
          endIcon={svgWithColor('arrow_right', false, Colors.Primary)}
        />
        <PreferenceBtn
          // badge={'Beta'}
          startIcon={theme == 'dark' ? SVG.locatonFillDark : SVG.locatonFill}
          onPress={() => {
            navigate('SeeOffersOnMap');
          }}
          title={localized.see_offers_on_map}
        />
        <PreferenceBtn
          onPress={() => {
            navigate('SearchScreen', {
              data: [],
            });
          }}
          startIcon={theme == 'dark' ? SVG.filterFillDark : SVG.filterFill}
          title={localized.apply_filters}
        />
        <PreferenceBtn
          onPress={() => {
            if (user?.id == 'guest') {
              setShowLoginModal(true);
              return;
            }
            navigate('ProfileSettings');
          }}
          startIcon={theme == 'dark' ? SVG.settingFillDark : SVG.settingFill}
          title={localized.settings}
        />
        {!user?.vendorVerified && (
          <PreferenceBtn
            onPress={() => {
              if (user?.id == 'guest') {
                setShowLoginModal(true);
                return;
              }
              navigate('GetVerified');
            }}
            startIcon={
              theme == 'dark' ? SVG.verifiyDrawerDark : SVG.verifiyDrawer
            }
            title={localized.get_verified}
          />
        )}
        {user?.id == 'guest' && (
          <PreferenceBtn
            onPress={() => {
              global_storage.clearStore();
              navigation.reset({index: 0, routes: [{name: 'Welcome'}]});
            }}
            startIcon={SVG.logout}
            title={localized.logout}
          />
        )}
        {/* <Text style={[styles.text, {marginTop: 16}]}>
          {localized.categories}
        </Text>
        <PreferenceBtn
          badge={'Promoted'}
          title={'Featured Cars'}
          onPress={() => {
            navigate('SearchScreen');
          }}
        />
        <PreferenceBtn
          title={'Used Cars'}
          onPress={() => {
            navigate('SearchScreen');
          }}
        />
        <PreferenceBtn
          title={'Bikes'}
          onPress={() => {
            navigate('SearchScreen');
          }}
        /> */}
        <Text style={[styles.text, {marginTop: 16}]}>
          {localized.useful_links}
        </Text>
        <PreferenceBtn
          startIcon={theme == 'dark' ? SVG.privacyFillDark : SVG.privacyFill}
          title={localized.privacy_policy_and_terms}
          onPress={() => {
            navigate('PrivacyScreen');
          }}
        />
        <PreferenceBtn
          title={localized.help_and_support}
          startIcon={theme == 'dark' ? SVG.darkHelp : SVG.Help}
          onPress={() => {
            navigate('HelpAndSupportNav', {Screen: 'ContactUs'});
          }}
        />
        {/* <PreferenceBtn
          title={localized.refer_a_friend}
          startIcon={SVG.heartFillGray}
          onPress={() => {
            navigate('ReferAFriend');
          }}
        /> */}
        <PreferenceBtn
          title={localized.about_us}
          startIcon={theme == 'dark' ? SVG.darkAboutUs : SVG.aboutUs}
          onPress={() => navigate('About_us')}
        />
        <View style={[styles.socialIconContainer]}>
          <SvgFromXml
            style={styles.socialIcon}
            onPress={() => {
              if (Linking.canOpenURL('https://www.instagram.com/hdidauto/'))
                Linking.openURL('https://www.instagram.com/hdidauto/');
            }}
            xml={theme == 'dark' ? SVG.instaDark : SVG.insta}
            height={27}
            width={27}
          />
          <SvgFromXml
            style={styles.socialIcon}
            onPress={() => {
              if (Linking.canOpenURL('https://twitter.com/hdida_app'))
                Linking.openURL('https://twitter.com/hdida_app');
            }}
            xml={theme == 'dark' ? SVG.twitterDark : SVG.twitter}
            height={27}
            width={27}
          />
          <SvgFromXml
            style={styles.socialIcon}
            onPress={() => {
              if (Linking.canOpenURL('https://www.linkedin.com/company/hdida/'))
                Linking.openURL('https://www.linkedin.com/company/hdida/');
            }}
            xml={theme == 'dark' ? SVG.linkedInDark : SVG.linkedIn}
            height={27}
            width={27}
          />
          <SvgFromXml
            onPress={() => {
              if (Linking.canOpenURL('https://www.instagram.com/hdidauto/'))
                Linking.openURL('https://www.instagram.com/hdidauto/');
            }}
            style={styles.socialIcon}
            xml={theme == 'dark' ? SVG.fbDark : SVG.fb}
            height={27}
            width={27}
          />
        </View>
        <Text style={styles.versionText}>HDiDA v2.0 © 2023</Text>
      </View>
      <LoginModal
        visible={showLoginModal}
        onLogin={() => {
          navigation.navigate('SignIn');
          setShowLoginModal(false);
        }}
        onCancel={() => {
          setShowLoginModal(false);
        }}
      />
    </DrawerContentScrollView>
  );
};

const styling = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: theme === 'dark' ? DarkColors.GrayLighter : Colors.White,
    },
    divider: {
      height: 4,
      backgroundColor:
        theme === 'dark' ? DarkColors.GrayMedium : Colors.GrayLightest,
      marginHorizontal: -16,
    },
    row: {
      paddingTop: 6,
      paddingBottom: 18,
      backgroundColor: theme === 'dark' ? DarkColors.GrayLighter : 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    heading: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme == 'dark' ? 'white' : Colors.Black,
      flex: 1,
      marginHorizontal: 8,
    },
    simpleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: -8,
      marginVertical: 16,
    },
    langBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor:
        theme === 'dark' ? DarkColors.GrayMedium : Colors.GrayLightest,
      borderWidth: 1,
      borderRadius: 8,
      padding: 13,
      flex: 1,
      marginHorizontal: 8,
      color: theme === 'dark' ? DarkColors.GrayDarkest : 'gray',
    },
    langBtnText: {
      color: theme === 'dark' ? DarkColors.GrayDarkest : 'gray',
    },
    text: {
      fontSize: 12,
      fontWeight: '500',
      color: theme === 'dark' ? DarkColors.GrayDarkest : Colors.GrayDarkest,
      marginBottom: 4,
    },
    PreferenceBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor:
        theme === 'dark' ? DarkColors.GrayDarker : Colors.GrayLighter,
      borderRadius: 8,
      padding: 14,
      marginVertical: 6,
      borderWidth: 1,
    },
    PreferenceBtnRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 8,
    },
    badge: {
      color: Colors.White,
      borderRadius: 20,
      marginHorizontal: 4,
      backgroundColor: `#54d1b234`,
    },
    badgeText: {
      color: Colors.Primary,
      fontWeight: '600',
      fontSize: 10,
      marginHorizontal: 9,
      paddingVertical: 3,
    },
    socialIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: -8,
      marginTop: 22,
      marginBottom: 9,
    },
    socialIcon: {
      marginHorizontal: 8,
    },
    versionText: {
      color: theme === 'dark' ? 'white' : Colors.GrayDarker,
      fontSize: 11,
      marginBottom: 23,
    },
  });
export default CustomDrawerContent;
