import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COMMENTS, PRODUCTS} from '../Utils/Data';
import {SvgFromXml} from 'react-native-svg';
import {SVG, svgWithColor} from '../SVGS/SVG';
import {Colors, DarkColors} from '../Utils/Colors';
import CommentList from './CommentList';
import RBSheet from 'react-native-raw-bottom-sheet';
import CommentSheet from './CommentSheet';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL, IMAGE_URL, simplePostRequest} from '../Utils/API';
import {
  arrayToObj,
  formatPrice,
  formatTime,
  global_storage,
} from '../Utils/Utils';
import LoadingComp from './LoadingComp';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {localized} from '../Utils/Strings';
import {useLanguage} from '../Provider/LanguageProvider';
import LoginModal from './LoginModal';

const Product = ({
  item = PRODUCTS[0],
  type = 1,
  onCommentPress,
  itemStyle,
  onChange,
  onDelete,
  hideComments = false,
}) => {
  const [theme, setTheme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const TAG = 'Product.js';
  const [info, setInfo] = React.useState(arrayToObj(item.info) || {});
  const [comments, setComments] = React.useState(item.comments || []);
  const navigation = useNavigation();
  const commentSheetRef = React.useRef(null);
  const [showComments, setShowComments] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(item.favourited);
  const [isLiked, setIsLiked] = React.useState(item?.liked || false);
  const [totalLikes, setLikes] = React.useState(item?.likes?.length);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  const [needRefresh, setNeedRefresh] = useMMKVStorage(
    'needRefresh',
    global_storage,
    false,
  );
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const {localized} = useLanguage();

  const openBottomSheet = () => {
    if (commentSheetRef.current != null) {
      commentSheetRef.current.open();
    }
  };
  const closeBottomSheet = () => {
    if (commentSheetRef.current != null) {
      commentSheetRef.current.close();
    }
  };
  useEffect(() => {
    setLikes(item?.likes?.length);
    setIsLiked(
      item?.liked != undefined ? item?.liked : item?.likes?.includes(user.id),
    );
    setIsFavorite(item?.favourited);
    setComments(item?.comments);
  }, [item]);

  const likeDislike = async () => {
    if (user?.id == 'guest') {
      setShowLoginModal(true);
      return;
    }
    if (loading) return;
    try {
      setIsLiked(!isLiked);
      setLikes(totalLikes + (isLiked ? -1 : 1));
      const formData = new FormData();
      formData.append('postId', item._id);
      setLoading(true);
      const response = await simplePostRequest(
        'post/likeDislike',
        formData,
        user.token,
      );
      setLoading(false);
      console.log(TAG, 'LikdDislike() : Response :', response);
      if (response.status) {
        if (onChange) onChange(item);
        setIsLiked(response.data.likeStatus);
        setLikes(response.data.likes);
        setNeedRefresh(!needRefresh);
      }
    } catch (e) {
      console.log(TAG, ' Error : LikeDislike():', e);
      setLoading(false);
    }
  };
  const addRemoveFavourite = async () => {
    if (loading) return;
    try {
      setIsFavorite(!isFavorite);
      const formData = new FormData();
      formData.append('postId', item._id);
      setLoading(true);
      const response = await simplePostRequest(
        'action/addRemoveFavourite',
        formData,
        user.token,
      );
      setLoading(false);
      console.log(TAG, 'addRemoveFavourite() : Response :', response);
      if (response.status) {
        if (onChange) onChange(item);
        setIsFavorite(response.data.favourite);
        setNeedRefresh(!needRefresh);
      }
    } catch (e) {
      console.log(TAG, ' Error : addRemoveFavourite():', e);
      setLoading(false);
    }
  };

  return (
    <Pressable
      onPress={() =>
        navigation.push('CarDetails', {
          item: {
            ...item,
            liked: isLiked,
            likes: totalLikes,
            favourited: isFavorite,
          },
          info,
          onChange,
          onDelete,
        })
      }
      style={[
        styles.container,
        type != 2 ? {maxWidth: 190} : {marginBottom: 16},
        itemStyle,
      ]}>
      <ImageBackground
        source={item.images ? {uri: IMAGE_URL + item?.images[0]} : item?.image}
        style={[styles.bgImage, type == 2 && styles.bgImage2]}>
        <View style={styles.row}>
          {item?.boost?.isBoosted ? (
            <Text style={styles.promotedText}>{'Promoted'}</Text>
          ) : (
            <Text></Text>
          )}
          <TouchableOpacity
            style={{paddingBottom: 20, paddingLeft: 20}}
            onPress={() => addRemoveFavourite()}>
            <SvgFromXml
              style={{padding: 10}}
              xml={
                isFavorite ? svgWithColor('heartFillGray', 'white') : SVG.heart
              }
              height={18}
              width={18}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Pressable style={styles.info}>
        <View style={styles.simpleRow}>
          <Text style={styles.name}>{item.title}</Text>
          {type == 2 && (
            <Text style={[styles.text]}>{formatTime(item?.createdAt)}</Text>
          )}
        </View>
        <Text style={styles.price}>DZD {formatPrice(item.price)}</Text>
        {type == 1 && (
          <View style={styles.location}>
            <SvgFromXml xml={SVG.location} height={13} width={11} />
            <Text style={styles.locationText}>
              {`${item.location?.city}, ${item.location?.country}`}
            </Text>
          </View>
        )}
        <View style={[styles.simpleRow, styles.modelDistanceType]}>
          {type == 2 && (
            <SvgFromXml
              style={{marginEnd: 4}}
              xml={SVG.location}
              height={13}
              width={11}
            />
          )}
          <Text style={styles.modelDistanceTypeText}>
            {type == 2 &&
              `${item.location?.city}, ${item.location?.country}` + ' |'}{' '}
            {info.Year} | {info.Mileage + ' km'} | {info.Engine}
          </Text>
        </View>
        <Pressable
          style={[type == 2 ? styles.simpleRow : styles.likeCommentRow]}>
          <TouchableOpacity
            onPress={() => likeDislike()}
            style={[
              styles.likeCommentRow,
              {
                paddingEnd: 20,
                paddingTop: 8,
                paddingBottom: 4,
              },
            ]}>
            <SvgFromXml
              xml={
                isLiked && theme == 'dark'
                  ? svgWithColor('likeFill', DarkColors.Primary)
                  : isLiked && theme != 'dark'
                  ? SVG.likeFill
                  : theme == 'dark' && !isLiked
                  ? SVG.likeDark
                  : SVG.like
              }
              height={16}
              width={16}
            />
            <Text style={styles.text}>
              {totalLikes > 0 ? totalLikes : localized.like}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCommentPress || openBottomSheet}
            style={[
              styles.likeCommentRow,
              {
                paddingTop: 8,
                paddingBottom: 4,
              },
            ]}>
            <SvgFromXml
              xml={theme == 'dark' ? SVG.darkComment : SVG.comment}
              height={16}
              width={16}
            />
            <Text style={styles.text}>{localized.comment}</Text>
          </TouchableOpacity>
          {type == 2 && (
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${item?.phone}`)}
              style={[
                styles.likeCommentRow,
                {
                  paddingTop: 8,
                  paddingBottom: 4,
                },
              ]}>
              <SvgFromXml
                xml={theme == 'dark' ? SVG.darkPhoneOutline : SVG.phone}
                height={16}
                width={16}
              />
              <Text style={[styles.text, {marginEnd: 5}]}>
                {localized.contact}
              </Text>
            </TouchableOpacity>
          )}
        </Pressable>
        {/* {type == 2 && showComments && <CommentList data={COMMENTS} />}
        {type == 2 && (
          <Pressable onPress={() => setShowComments(!showComments)}>
            <Text style={styles.showComments}>
              {showComments ? 'Show less' : '...more'}
            </Text>
          </Pressable>
        )} */}
      </Pressable>
      <RBSheet
        ref={commentSheetRef}
        dragFromTopOnly={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        keyboardAvoidingViewEnabled={true}
        animationType="fade"
        closeOnDragDown={true}
        height={Dimensions.get('window').height * 0.6}
        openDuration={100}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
          },
        }}>
        <CommentSheet
          onPressClose={closeBottomSheet}
          comments={comments}
          postId={item._id}
          onChange={comments => {
            setComments(comments);
            if (onChange) onChange({_id: item._id, comments: comments});
          }}
          onDelete={comments => {
            setComments(comments);
            if (onChange) onChange({_id: item._id, comments: comments});
          }}
        />
      </RBSheet>
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
    </Pressable>
  );
};

export default Product;

const styling = theme =>
  StyleSheet.create({
    container: {
      marginHorizontal: 8,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
    },
    bgImage: {
      width: 190,
      backgroundColor:
        theme == 'dark' ? DarkColors.GrayDarker : Colors.GrayDarker,
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
      fontSize: 10,
      color: 'white',
      paddingHorizontal: 6,
      paddingVertical: 3,
      backgroundColor: '#FF6600',
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
    },
    info: {
      padding: 8,
    },
    name: {
      fontSize: 13,
      fontWeight: '600',
      color: theme == 'dark' ? 'white' : Colors.Black,
    },
    price: {
      fontSize: 14,
      color: theme == 'dark' ? DarkColors.Primary : Colors.Secondary,
      fontWeight: '700',
      marginBottom: 12,
    },
    location: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    locationText: {
      fontSize: 12,
      fontWeight: '500',
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayDarker,
      marginHorizontal: 4,
    },
    modelDistanceType: {
      justifyContent: 'flex-start',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      paddingVertical: 8,
      borderColor: theme == 'dark' ? DarkColors.GrayDarker : Colors.GrayLighter,
    },
    modelDistanceTypeText: {
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayDarker,
    },
    likeCommentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: 12,
      fontWeight: '500',
      marginStart: 5,
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayDarker,
    },
    simpleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    showComments: {
      fontSize: 12,
      fontWeight: '500',
      marginStart: 5,
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayDarker,
      paddingVertical: 8,
    },
  });
