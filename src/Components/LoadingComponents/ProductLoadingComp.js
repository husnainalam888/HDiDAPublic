import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, DarkColors} from '../../Utils/Colors';
import LoadingPlaceholder from './LoadingPlaceholder';
import {global_storage} from '../../Utils/Utils';
import {useMMKVStorage} from 'react-native-mmkv-storage';

const ProductLoadingComp = ({type = 1, itemStyle}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  return (
    <View
      style={[
        styles.container,
        type != 2 ? {maxWidth: 190} : {marginBottom: 16},
        itemStyle,
      ]}>
      <View style={[styles.bgImage, type == 2 && styles.bgImage2]}>
        <View style={styles.row}>
          <LoadingPlaceholder style={styles.promotedText} />
          <LoadingPlaceholder style={styles.round} />
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.simpleRow}>
          <LoadingPlaceholder style={styles.name} />
        </View>
        <LoadingPlaceholder style={styles.price} />
        {type == 1 && (
          <View style={styles.location}>
            <LoadingPlaceholder style={styles.locationText} />
          </View>
        )}
        <View style={[styles.simpleRow, styles.modelDistanceType]}>
          <LoadingPlaceholder style={styles.modelDistanceTypeText} />
        </View>
        <View style={[type == 2 ? styles.simpleRow : styles.likeCommentRow]}>
          <View
            style={[
              styles.likeCommentRow,
              {
                paddingEnd: 20,
                paddingTop: 8,
                paddingBottom: 4,
              },
            ]}>
            <LoadingPlaceholder style={styles.round} />
          </View>
          <View
            style={[
              styles.likeCommentRow,
              {
                paddingTop: 8,
                paddingBottom: 4,
              },
            ]}>
            <LoadingPlaceholder style={styles.round} />
          </View>
          {type == 2 && (
            <View
              style={[
                styles.likeCommentRow,
                {
                  paddingTop: 8,
                  paddingBottom: 4,
                },
              ]}>
              <LoadingPlaceholder style={[styles.round, {marginEnd: 5}]} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductLoadingComp;

const styling = theme =>
  StyleSheet.create({
    round: {
      borderRadius: 10,
      overflow: 'hidden',
      height: 18,
      width: 18,
    },
    container: {
      marginHorizontal: 8,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: theme == 'dark' ? DarkColors.GrayMedium : 'white',
    },
    bgImage: {
      width: 190,
      backgroundColor:
        theme == 'dark' ? DarkColors.GrayMedium : Colors.GrayLightest,
      height: 130,
    },
    bgImage2: {
      height: 217,
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingEnd: 8,
      paddingVertical: 8,
    },
    promotedText: {
      height: 16,
      width: 50,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
    },
    info: {
      padding: 8,
    },
    name: {
      width: '80%',
      borderRadius: 10,
    },
    price: {
      width: '40%',
      borderRadius: 10,
      marginTop: 8,
      marginBottom: 8,
    },
    location: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    locationText: {
      width: '80%',
      borderRadius: 10,
    },
    modelDistanceType: {
      justifyContent: 'flex-start',
      paddingVertical: 8,
      borderColor: Colors.GrayLighter,
    },
    modelDistanceTypeText: {
      width: '100%',
      borderRadius: 10,
    },
    likeCommentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    simpleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
