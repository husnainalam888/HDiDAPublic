import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {localized} from '../Utils/Strings';
import {useLanguage} from '../Provider/LanguageProvider';
import {global_storage} from '../Utils/Utils';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {SvgFromXml} from 'react-native-svg';
import {SVG} from '../SVGS/SVG';
import welcomeSvg from '../SVGS/welcomeSvg';
import Button from '../Components/Button';
const Welcome = ({navigation}) => {
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  const {localized, selectedLanguage} = useLanguage();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          style={[StyleSheet.absoluteFill]}
          source={require('../assets/welcomeImage.png')}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SvgFromXml xml={SVG.whiteLogo} />
        </View>
        <View
          style={{
            flex: 1 / 3,
            backgroundColor: 'white',
            gap: 10,
            paddingBottom: 10,
            justifyContent: 'space-between',
          }}>
          <SvgFromXml
            xml={SVG.arc}
            style={{
              top: -110,
              marginHorizontal: -40,
              position: 'absolute',
            }}
            width={Dimensions.get('window').width + 80}
          />
          <View style={{marginTop: -50, marginBottom: 50}}>
            <Text style={styles.welcome}>
              {localized['Welcome to HDiDA!'] || 'Welcome to HDiDA!'}
            </Text>
            <Text style={styles.description}>
              {localized[
                `HDIDA is the first automotive social marketplace in Algeria, designed for buyer, and seller together in one dynamic platform. Whether you're looking to buy, sell, or just connect with other automotive lovers, HDIDA has it all.`
              ] ||
                `HDIDA is the first automotive social marketplace in Algeria, designed for buyer, and seller together in one dynamic platform. Whether you're looking to buy, sell, or just connect with other automotive lovers, HDIDA has it all.`}
            </Text>
          </View>
          <Button
            style={{marginHorizontal: 20}}
            title={localized['continue']}
            onPress={() => {
              if (user.id) {
                navigation.replace('BottomTabs');
              } else navigation.replace('SignIn');
            }}
            titleStyle={[
              {flex: 1},
              selectedLanguage == 'ar' ? {marginStart: -43} : {},
            ]}
            icon={SVG.continue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 44,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  name: {
    fontSize: 69,
    fontWeight: '800',
    color: '#ffffff',
  },
  description: {
    fontSize: 14,
    marginHorizontal: 20,
    color: '#000000',
    textAlign: 'center',
  },
});
