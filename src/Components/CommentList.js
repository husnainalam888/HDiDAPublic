import {StyleSheet, Text, FlatList, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgFromXml} from 'react-native-svg';
import {SVG, svgWithColor} from '../SVGS/SVG';
import {Colors, DarkColors} from '../Utils/Colors';
import MenuComp, {MenuItem} from './MenuComp';
import DropShadow from 'react-native-drop-shadow';
import {IMAGE_URL} from '../Utils/API';
import {formatTime, global_storage} from '../Utils/Utils';
import {useMMKVStorage} from 'react-native-mmkv-storage';

const CommentList = ({forwardedRef, ...props}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const [showMenu, setShowMenu] = React.useState(null);
  const [user, setUser] = useMMKVStorage('user', global_storage, {});

  const CustomMenu = ({onReply, isReply, onReport, onHide, onDelete, item}) => {
    const [theme] = useMMKVStorage('theme', global_storage, 'light');
    const styles = styling(theme);
    return (
      <DropShadow style={styles.shadow}>
        <View style={styles.CustomMenu}>
          {!isReply && (
            <MenuItem
              handleSelect={onReply}
              startIcon={
                theme == 'dark'
                  ? svgWithColor('reply', DarkColors.GrayDarker)
                  : SVG.reply
              }
              label={'Reply'}
            />
          )}
          {user.id != item?.userId?._id && (
            <MenuItem
              handleSelect={() => {
                setShowMenu(false);
                if (onHide) onHide(item);
              }}
              startIcon={theme == 'dark' ? SVG.darkEyeHide : SVG.eyeHide}
              label={'Hide'}
            />
          )}
          <MenuItem
            startIcon={theme == 'dark' ? SVG.darkAboutUs : SVG.aboutUs}
            label={'Report Comment'}
            handleSelect={() => {
              setShowMenu(false);
              if (onReport) onReport(item);
            }}
          />
          {user.id == item?.userId?._id && (
            <MenuItem
              handleSelect={() => {
                setShowMenu(false);
                if (onDelete) onDelete(item);
              }}
              startIcon={
                theme == 'dark' ? SVG.darkDeleteFromMenu : SVG.deleteFromMenu
              }
              label={'Delete Comment'}
            />
          )}
        </View>
      </DropShadow>
    );
  };
  const RenderItem = ({
    item,
    onReply,
    itemToReply,
    setItemToReply,
    onReport,
    onHide,
    onDelete,
    isReply = false,
  }) => {
    const [theme] = useMMKVStorage('theme', global_storage, 'light');
    const styles = styling(theme);
    return (
      <>
        <View
          style={[
            styles.item,
            props.itemStyle,
            itemToReply == item && {
              backgroundColor:
                theme == 'dark' ? DarkColors.GrayMedium : Colors.LightWhite,
            },
          ]}>
          <Image
            source={
              item?.userId?.profileImage
                ? {uri: IMAGE_URL + item.userId.profileImage}
                : require('../assets/avatar_anime.png')
            }
            style={styles.image}
          />
          <View style={{flex: 1}}>
            <View style={styles.simpleRow}>
              <Text style={styles.name}>{item.userId.name}</Text>
              <Text style={styles.time}>{formatTime(item.createdAt)}</Text>
            </View>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
          {props.context == 'BottomSheet' && itemToReply != item && (
            <SvgFromXml
              onPress={() => setShowMenu(item)}
              style={{alignSelf: 'flex-start'}}
              xml={theme == 'dark' ? SVG.threeDotDark : SVG.threeDot}
              height={21}
              width={21}
            />
          )}
          {itemToReply == item && (
            <SvgFromXml
              onPress={() => setItemToReply(false)}
              style={{alignSelf: 'flex-start'}}
              xml={SVG.close}
              height={21}
              width={21}
            />
          )}
          {props.context != 'BottomSheet' && (
            <MenuComp style={{alignSelf: 'flex-start'}} isReply={isReply} />
          )}
        </View>
        {showMenu == item && (
          <CustomMenu
            isReply={isReply}
            item={item}
            onReport={onReport}
            onHide={onHide}
            onDelete={onDelete}
            onReply={() => {
              setItemToReply(item);
              setShowMenu(false);
              if (onReply) onReply(item);
            }}
          />
        )}
      </>
    );
  };

  return (
    <FlatList
      ref={forwardedRef}
      onScroll={e => {
        // if (e.nativeEvent.contentOffset.y > 300) {
        //   setShowMenu(null);
        // }
      }}
      contentContainerStyle={styles.flatList}
      data={props.data}
      renderItem={({item}) => {
        return (
          <>
            <RenderItem
              item={item}
              onReply={props.onReply}
              itemToReply={props.itemToReply}
              onHide={props.onHide}
              onDelete={props.onDelete}
              onReport={props.onReport}
              setItemToReply={props.setItemToReply}
            />
            <FlatList
              data={item.replies}
              style={styles.replies}
              renderItem={({item}) => (
                <RenderItem
                  item={item}
                  onReply={props.onReply}
                  itemToReply={props.itemToReply}
                  onReport={props.onReport}
                  onDelete={props.onDelete}
                  onHide={props.onHide}
                  setItemToReply={props.setItemToReply}
                  isReply={true}
                />
              )}
              keyExtractor={item => item.id}
            />
          </>
        );
      }}
    />
  );
};

export default CommentList;

const styling = theme =>
  StyleSheet.create({
    flatList: {
      marginTop: 14,
      paddingBottom: 20,
    },
    item: {
      borderRadius: 10,
      overflow: 'hidden',
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // backgroundColor: '#F8F9FB',
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
    },
    simpleRow: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    image: {
      height: 38,
      width: 38,
      marginEnd: 8,
      borderRadius: 19,
      backgroundColor:
        theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayLightest,
      borderWidth: 1,
      borderColor:
        theme == 'dark' ? DarkColors.GrayLighter : Colors.GrayLightest,
    },
    name: {
      color: theme == 'dark' ? 'white' : 'black',
      fontWeight: 'bold',
      fontSize: 13,
    },
    time: {
      fontSize: 11,
      color: theme == 'dark' ? DarkColors.abadb4 : Colors.GrayDarker,
      marginStart: 4,
    },
    comment: {
      fontSize: 14,
      color: theme == 'dark' ? DarkColors.GrayDarkest : '#485470',
    },
    replies: {
      marginStart: 43,
      marginVertical: 0,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
    },
    CustomMenu: {
      borderTopLeftRadius: 16,
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 16,
      paddingHorizontal: 17,
      paddingVertical: 10,
      alignSelf: 'flex-end',
      backgroundColor: theme == 'dark' ? DarkColors.GrayMedium : 'white',
      marginBottom: 8,
    },
    shadow: {
      shadowColor: Colors.Black,
      shadowOpacity: 0.2,
      shadowOffset: {
        height: 2,
        width: 0,
      },
      shadowRadius: 4,
      marginTop: -35,
      marginEnd: 8,
    },
  });
