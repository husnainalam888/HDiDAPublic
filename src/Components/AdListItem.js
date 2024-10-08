import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors, DarkColors} from '../Utils/Colors';
import {SvgFromXml} from 'react-native-svg';
import {SVG, svgWithColor} from '../SVGS/SVG';
import MenuComp, {MenuItem} from './MenuComp';
import {useNavigation} from '@react-navigation/native';
import {
  arrayToObj,
  calculateDaysLeft,
  formatPrice,
  formatTime,
  global_storage,
} from '../Utils/Utils';
import {IMAGE_URL} from '../Utils/API';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {localized} from '../Utils/Strings';
import {useLanguage} from '../Provider/LanguageProvider';
const AdListItem = ({item, onDelete, onEdit}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const {localized} = useLanguage();
  const navigation = useNavigation();
  const [info, setInfo] = useState(arrayToObj(item.info));
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CarDetails', {item, info})}
      activeOpacity={0.8}
      style={styles.item}>
      <View style={styles.row}>
        <Image
          resizeMode="center"
          source={{uri: IMAGE_URL + item.images[0]}}
          style={styles.image}
        />
        <View style={{flex: 1, marginStart: 10}}>
          <View style={styles.simpleRow}>
            <Text style={styles.name}>{item.title}</Text>
            <TouchableOpacity>
              <MenuComp>
                <MenuItem
                  handleSelect={() => onEdit(item)}
                  label={localized.edit}
                  startIcon={
                    theme == 'dark'
                      ? svgWithColor('edit', DarkColors.GrayDarker)
                      : SVG.edit
                  }
                />
                <MenuItem
                  handleSelect={onDelete}
                  label={localized.delete}
                  startIcon={
                    theme == 'dark'
                      ? svgWithColor('deleteFromMenu', DarkColors.GrayDarker)
                      : SVG.deleteFromMenu
                  }
                />
                {/* <MenuItem
                  label={localized.share}
                  startIcon={
                    theme == 'dark'
                      ? svgWithColor(
                          'share',
                          DarkColors.GrayDarker,
                          DarkColors.GrayDarker,
                        )
                      : SVG.share
                  }
                /> */}
              </MenuComp>
            </TouchableOpacity>
          </View>
          <Text style={styles.postedDate}>
            {localized.posted_on}: {formatTime(item.createdAt)}
          </Text>
          <Text style={styles.price}>DZD {formatPrice(item.price)}</Text>
          <View style={styles.actionRow}>
            <View style={[styles.action, {paddingStart: 0}]}>
              <SvgFromXml
                xml={
                  theme == 'dark'
                    ? svgWithColor('eyeOpen', '#62646A', '#62646A')
                    : SVG.eyeOpen
                }
                height={13}
                width={16}
              />
              <Text style={styles.actionText}>{item.impression}</Text>
            </View>
            <View style={styles.action}>
              <SvgFromXml
                xml={svgWithColor(
                  'chatFill',
                  (fill = theme == 'dark' ? '#62646A' : Colors.GrayLighter),
                  'white',
                )}
                height={13}
                width={16}
              />
              <Text style={styles.actionText}>{item?.comments?.length}</Text>
            </View>
            {/* <View style={styles.action}>
              <SvgFromXml xml={SVG.phone} height={13} width={16} />
              <Text style={styles.actionText}>{'0'}</Text>
            </View> */}
            <View style={[styles.action, {borderEndWidth: 0}]}>
              <SvgFromXml
                xml={
                  theme == 'dark'
                    ? svgWithColor('heartFillGray', '#62646A', '#62646A')
                    : SVG.heartFillGray
                }
                height={13}
                width={16}
              />
              <Text style={styles.actionText}>{item?.likes?.length}</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.expiryDate}>
        {localized.ad_will_expire_in}{' '}
        {calculateDaysLeft(
          item?.boost?.isBoosted ? item?.boost?.boostTill : item?.createdAt,
        )}
        {localized.days}
      </Text>
    </TouchableOpacity>
  );
};

export default AdListItem;

const styling = theme =>
  StyleSheet.create({
    item: {
      borderColor: theme == 'dark' ? DarkColors.GrayDarker : Colors.GrayLighter,
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
      marginVertical: 6,
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor:
        theme == 'dark' ? DarkColors.GrayDarker : Colors.GrayLighter,
    },
    expiryDate: {
      marginTop: 10,
      color: theme == 'dark' ? DarkColors.abadb4 : Colors.GrayDarker,
      fontWeight: '300',
      fontSize: 14,
      lineHeight: 25,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    name: {
      color: theme == 'dark' ? 'white' : Colors.Black,
      fontSize: 13,
      fontWeight: '600',
    },
    postedDate: {
      fontSize: 10,
      color: theme == 'dark' ? DarkColors.abadb4 : Colors.GrayDarker,
    },
    price: {
      fontSize: 14,
      color: theme == 'dark' ? DarkColors.Primary : Colors.Secondary,
      fontWeight: '700',
      marginVertical: 6,
    },
    actionRow: {
      borderTopWidth: 1,
      paddingVertical: 10,
      borderTopColor:
        theme == 'dark' ? DarkColors.GrayDarker : Colors.GrayLighter,
      flexDirection: 'row',
      alignItems: 'center',
    },
    action: {
      borderEndWidth: 1,
      borderEndColor:
        theme == 'dark' ? DarkColors.GrayDarker : Colors.GrayLighter,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 11,
    },
    actionText: {
      color: theme == 'dark' ? DarkColors.abadb4 : Colors.GrayDarker,
      fontSize: 11,
      marginStart: 5,
    },
    simpleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
