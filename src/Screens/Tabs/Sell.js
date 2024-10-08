import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {SCREEN_WIDTH, SVG, svgWithColor} from '../../SVGS/SVG';
import StepCounterComp from '../../Components/StepCounterComp';
import {Colors, DarkColors} from '../../Utils/Colors';
import InputWithIcon from '../../Components/Input/InputWithIcon';
import {SvgFromXml} from 'react-native-svg';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import Button from '../../Components/Button';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useLanguage} from '../../Provider/LanguageProvider';
import {useToast} from 'react-native-toast-notifications';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';
const Sell = ({navigation, route}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const toast = useToast();
  const editInfo = route.params?.data;
  const {localized, selectedLanguage} = useLanguage();
  const [title, setTitle] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [location, setLocation] = useState({
    addressDetail: editInfo?.location?.addressDetail || '',
    cordinates:
      `${editInfo?.location?.coordinates[0]},${editInfo?.location?.coordinates[1]}` ||
      '',
    city: editInfo?.location?.city || '',
    country: editInfo?.location?.country || '',
  });

  useEffect(() => {
    if (location) {
      console.log('location', location);
    }
  }, [location]);

  const pickerImages = async () => {
    try {
      const respone = await ImageCropPicker.openPicker({
        multiple: true,
        freeStyleCropEnabled: true,
      });
      let newImages = images;
      respone.forEach(item => {
        newImages.push({uri: item.path, type: item.mime});
      });
      setImages(prev => [...newImages]);
      console.log('images', images);
    } catch (err) {
      console.log(err);
    }
  };
  const filterImages = (item, index) => {
    setImages(images.filter(i => i !== item));
  };
  const openCamera = async () => {
    try {
      await getPermissons();
      const respone = await ImageCropPicker.openCamera({
        multiple: true,
        freeStyleCropEnabled: true,
      });
      let newImages = [];
      console.log('respone', respone);
      newImages.push({
        uri: respone.path,
        type: respone.mime,
        name: respone.path.split('/').pop(),
      });
      setImages(prev => [...prev, ...newImages]);
      console.log('images', images);
    } catch (err) {
      console.log(err);
    }
  };
  // get camera permissons
  const getPermissons = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.log('getPermissons', 'Error', err);
    }
  };
  const checkValidation = () => {
    if (title == '') {
      Alert.alert('Message Alert!', 'Please enter title');
      toast.show('Please add images', {
        title: 'Message Alert!',
      });
      return false;
    }
    if (images.length == 0 && !editInfo) {
      Alert.alert('Error', 'Please add images');
      return false;
    }
    if (!location || !location?.cordinates || !location?.addressDetail) {
      console.log('CheckValidation():', 'location', location);
      toast.show('Please select location', {title: 'Error'});
      return false;
    }
    return true;
  };

  useEffect(() => {
    handleEditInfo();
  }, []);

  const handleEditInfo = () => {
    editInfo?.title && setTitle(editInfo?.title);
    console.warn('edit', editInfo?.info);
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View
            style={[
              theme == 'dark' && {
                backgroundColor: DarkColors.GrayLighter,
                marginHorizontal: -16,
                paddingHorizontal: 16,
              },
              {marginBottom: 24},
            ]}>
            <Header
              startIcon={
                theme == 'dark'
                  ? svgWithColor('back', false, 'white')
                  : SVG.back
              }
              title={localized.sell_car}
            />
            <StepCounterComp count={1} />
            <View style={styles.border} />
          </View>
          <Text style={styles.label}>{localized.ad_title}</Text>
          <InputWithIcon
            style={[
              {marginBottom: 20},
              theme == 'dark' && {
                backgroundColor: DarkColors.GrayLightest,
                borderWidth: 1,
                borderColor: DarkColors.GrayDarker,
              },
            ]}
            textInputProps={{
              placeholder: localized.enter_title,
              placeholderTextColor: theme == 'dark' ? 'white' : Colors.Black,
              value: title,
              onChangeText: setTitle,
            }}
          />
          {!editInfo && (
            <>
              <Text style={styles.label}>{localized.add_image_of_car}</Text>
              {images.length > 0 && (
                <ImageList images={images} onPress={filterImages} />
              )}
              <View style={{alignItems: 'center', marginHorizontal: -20}}>
                <SvgFromXml
                  onPress={pickerImages}
                  xml={
                    theme == 'dark'
                      ? SVG.uploadImageBtnDark
                      : SVG.uploadImageBtn
                  }
                  width={Dimensions.get('window').width - 32}
                  height={SCREEN_WIDTH * 0.38}
                />
              </View>

              <Button
                title={localized.take_photo}
                onPress={openCamera}
                style={{
                  backgroundColor:
                    theme == 'dark'
                      ? DarkColors.GrayLighter
                      : Colors.LightWhite,
                  borderWidth: 1,
                  borderColor: Colors.Secondary,
                }}
                starIcon={SVG.camera}
                titleStyle={[
                  {color: Colors.Secondary},
                  selectedLanguage == 'ar' && {marginEnd: 10},
                ]}
                starIconSize={24}
              />
            </>
          )}
          <Button
            title={location?.addressDetail || localized.select_address}
            onPress={() => navigation.navigate('Address', {setLocation})}
            style={{
              backgroundColor:
                theme == 'dark' ? DarkColors.GrayLighter : Colors.LightWhite,
              borderWidth: 1,
              borderColor: Colors.Secondary,
            }}
            titleStyle={[
              {color: Colors.Secondary},
              selectedLanguage == 'ar' && {marginEnd: 10},
            ]}
            starIconSize={24}
          />
        </View>
        <Button
          titleStyle={[
            {flex: 1},
            selectedLanguage == 'ar' && {marginStart: -43},
          ]}
          style={{
            marginHorizontal: 16,
            backgroundColor:
              theme == 'dark' ? DarkColors.Primary : Colors.Secondary,
          }}
          title={localized.continue}
          onPress={() => {
            if (checkValidation())
              navigation.navigate('SellStep2', {
                title,
                images,
                info: editInfo?.info,
                des: editInfo?.description,
                price: editInfo?.price,
                isFixed: editInfo?.fixedPrice,
                id: editInfo?._id,
                features: editInfo?.features,
                location,
              });
          }}
          icon={SVG.continue}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const ImageList = ({images, onPress}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  return (
    <FlatList
      data={images}
      style={{
        flexGrow: 0,
        marginBottom: 16,
        marginHorizontal: -16,
      }}
      contentContainerStyle={{flexGrow: 0, paddingHorizontal: 8}}
      keyExtractor={(item, index) => index.toString()}
      extraData={images}
      renderItem={({item, index}) => (
        <ImageBackground style={styles.selectedImageView} source={item}>
          <TouchableOpacity style={styles.closeBtn}>
            <SvgFromXml
              height={16}
              width={16}
              xml={SVG.close}
              onPress={() => onPress(item, index)}
            />
          </TouchableOpacity>
        </ImageBackground>
      )}
      numColumns={3}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Sell;

const styling = theme =>
  StyleSheet.create({
    SafeAreaView: {
      flex: 1,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLightest : 'white',
    },
    container: {
      flex: 1,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLightest : 'white',
      paddingHorizontal: 16,
    },
    border: {
      height: 1,
      backgroundColor:
        theme == 'dark' ? DarkColors.GrayLighter : Colors.GrayLighter,
      marginTop: 20,
      marginHorizontal: -16,
    },
    label: {
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayMedium,
      fontWeight: '600',
      lineHeight: 23,
      marginBottom: 4,
    },
    uploadImageView: {
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 12,
      borderStyle: 'dashed',
      borderColor: Colors.GrayLighter,
    },
    selectedImageView: {
      height: 150,
      width: Dimensions.get('window').width / 3 - 22,
      borderWidth: 1,
      borderColor: theme == 'dark' ? DarkColors.GrayDarker : Colors.GrayLighter,
      borderRadius: 8,
      marginHorizontal: 8,
      marginVertical: 8,
      overflow: 'hidden',
    },
    closeBtn: {
      alignSelf: 'flex-end',
      padding: 2,
      backgroundColor: theme == 'dark' ? '#0e0e0e' : 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      marginEnd: 5,
    },
  });
