import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Touchable,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {SVG, svgWithColor} from '../../SVGS/SVG';
import {Colors, DarkColors} from '../../Utils/Colors';
import {Avatar, OutlineBtn} from '../CarDetails/Comps/CarDetailComponents';
import DropShadow from 'react-native-drop-shadow';
import Button from '../../Components/Button';
import ProductList from '../../Components/ProductList';
import {PRODUCTS} from '../../Utils/Data';
import PackageButton from '../BuyPackageAndMyOrder/Comps/PackageButton';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';
import {
  IMAGE_URL,
  getRequest,
  postRequest,
  print,
  simplePostRequest,
} from '../../Utils/API';
import {useLanguage} from '../../Provider/LanguageProvider';
import {LOCALIZED_STRINGS} from '../../Utils/Strings';
import LoadingComp from '../../Components/LoadingComp';
import ExceptionComp from '../../Components/ExceptionComp';
import {useToast} from 'react-native-toast-notifications';
import {socket} from '../../Socket/Socket';
import LoginModal from '../../Components/LoginModal';
import {SvgFromXml} from 'react-native-svg';

const Profile = ({navigation, route}) => {
  const TAG = 'Profile.js';
  const [theme, setTheme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const taost = useToast();
  const {localized} = useLanguage();
  const isAdmin = !route.params?.user;
  const [products, setProducts] = useState([]);
  const [mmkvUser, setMMKVUser] = useMMKVStorage('user', global_storage, {});
  const [user, setUser] = useState(route.params?.user || mmkvUser);
  const [loading, setLoading] = useState(!isAdmin);
  const [followed, setFollowed] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [profileImage, setProfileImage] = useState(
    IMAGE_URL + user.profileImage,
  );
  const OutlineInfoBox = item => {
    const [theme] = useMMKVStorage('theme', global_storage, 'light');
    const styles = styling(theme);
    return (
      <TouchableOpacity onPress={item.onPress} style={styles.outlineInfoBox}>
        <Text style={styles.outlineInfoBoxTextBold}>{item.value}</Text>
        <Text style={styles.outlineInfoText}>{item.type}</Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    setLoading(true);
    if (!isAdmin) getUserById();
    if (!isAdmin && !loadingPosts) getPostByUserId();
    const unsubscribe = navigation.addListener('focus', () => {
      print('Profile.js : useEffect : user :', user);
      setProfileImage(IMAGE_URL + user.profileImage);
      if (isAdmin && !loadingPosts) getPostByUserId();
      if (isAdmin && !loadingUser) getUserById();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getUserById = async () => {
    try {
      const id = isAdmin ? mmkvUser.id : user._id;
      if (isAdmin) {
        setLoadingUser(true);
      }
      const respone = await getRequest(`user/getUser?id=${id}`, mmkvUser.token);
      setLoading(false);
      if (isAdmin) {
        setLoadingUser(false);
      }
      if (respone.status) {
        setUser({_id: id, ...respone.data.user});

        if (respone?.data?.user?.followed) {
          setFollowed(respone?.data?.user?.followed);
        } else {
          setFollowed(false);
        }
        if (isAdmin) setMMKVUser({...mmkvUser, ...respone.data.user});
        setProfileImage(IMAGE_URL + respone.data.user.profileImage);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      if (isAdmin) {
        setLoadingUser(false);
      }
    }
  };
  const followUnfollow = async () => {
    if (mmkvUser.id == 'guest') {
      taost.show('Please login first', {title: 'Guest User Cannot Follow'});
      return;
    }
    try {
      const id = user._id;
      console.log(TAG, 'followUnfollow id', user);
      const formData = new FormData();
      formData.append('followId', id);
      console.log(TAG, 'followUnfollow formData', formData);
      const respone = await simplePostRequest(
        `action/followUnfollow`,
        formData,
        mmkvUser.token,
      );
      console.log(TAG, 'followUnfollow', JSON.stringify(respone));
      if (respone.status) {
        if (respone.message == 'Followed') {
          setFollowed(true);
        } else {
          setFollowed(false);
        }

        getUserById();
        taost.show(respone.message, {title: 'Success'});
      } else taost.show(respone.message, {title: 'Error'});
    } catch (e) {
      console.log(e);
    }
  };
  const getPostByUserId = async () => {
    try {
      const id = isAdmin ? mmkvUser.id : user._id;

      console.log(TAG, 'getPostByUserId id', id);
      if (isAdmin) setLoadingPosts(true);
      const respone = await getRequest(
        `post/getByUserId?page=1&limit=2000&id=${id}`,
        mmkvUser.token,
      );
      if (isAdmin) {
        setLoadingPosts(false);
      }
      // console.log(TAG, 'getPostByUserId', JSON.stringify(respone));
      if (respone.status) {
        setProducts(respone.data);
      }
    } catch (e) {
      console.log(e);
      if (isAdmin) setLoadingPosts(false);
    }
  };
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[Colors.Primary]}
            onRefresh={async () => {
              try {
                setRefreshing(true);
                await getPostByUserId();
                await getUserById();
                setRefreshing(false);
              } catch (error) {
                setRefreshing(false);
              }
            }}
            refreshing={refreshing}
          />
        }
        contentContainerStyle={{
          flexGrow: 1,
          // backgroundColor:
          // theme == 'dark' ? DarkColors.GrayLighter : Colors.Secondary,
          paddingBottom: 102,
        }}>
        <View style={styles.container}>
          <Header
            startIcon={isAdmin ? false : svgWithColor('back', false, 'white')}
            style={{marginHorizontal: 16}}
            title={isAdmin ? localized.my_profile : ''}
            titleStyle={{textAlign: 'center', color: 'white'}}
            endIconSize={40}
            endIcon={
              isAdmin && theme == 'dark'
                ? SVG.profileSettingsDark
                : isAdmin
                ? SVG.profileSettings
                : false
            }
            endPress={() => {
              navigation.navigate('ProfileSettings');
            }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor:
                theme == 'dark' ? DarkColors.GrayLightest : 'white',
              marginTop: 60,
              borderTopLeftRadius: 21,
              borderTopRightRadius: 21,
            }}>
            <DropShadow style={styles.shadow}>
              <Avatar
                style={styles.Avatar}
                statusViewStyle={styles.statusView}
                showStatus={socket.active && isAdmin}
                imageStyle={styles.imageStyle}
                item={
                  isAdmin
                    ? IMAGE_URL + mmkvUser?.profileImage
                    : user?.profileImage
                    ? profileImage
                    : undefined
                }
              />
            </DropShadow>
            <Text style={styles.name}>
              {isAdmin ? mmkvUser.name : user.name}{' '}
              {((isAdmin && mmkvUser.vendorVerified) ||
                (!isAdmin && user.vendorVerified)) && (
                <SvgFromXml xml={SVG.greenTick} width={14} height={14} />
              )}
            </Text>
            {/* <Text style={styles.email}>abc123@gmail.com</Text> */}
            <View style={styles.row}>
              <OutlineInfoBox value={products?.length} type={localized.ads} />
              <OutlineInfoBox
                value={user?.followerCount}
                type={localized.followers}
                onPress={() => {
                  navigation.push('Followers', {
                    userId: user._id,
                    type: 1,
                  });
                }}
              />
              <OutlineInfoBox
                value={user?.followingCount}
                type={localized.following}
                onPress={() => {
                  navigation.push('Followers', {
                    userId: user._id,
                    type: 0,
                  });
                }}
              />
            </View>
            {isAdmin && (
              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.LightGray,
                  marginBottom: 12,
                }}
              />
            )}
            {!isAdmin && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                  marginVertical: 16,
                }}>
                <OutlineBtn
                  title={followed ? localized.unfollow : localized.follow}
                  onPress={followUnfollow}
                  style={{
                    flex: 1,
                    borderRadius: 6,
                    marginEnd: 5,
                    marginStart: 0,
                  }}
                  fill={true}
                />
                <OutlineBtn
                  onPress={() => {
                    if (mmkvUser?.id == 'guest') {
                      setShowLoginModal(true);
                      return;
                    }
                    navigation.navigate('ChatScreen', {
                      author: user,
                    });
                  }}
                  title={localized.message}
                  style={{
                    flex: 1,
                    borderRadius: 6,
                    marginStart: 5,
                    marginEnd: 0,
                  }}
                />
              </View>
            )}
            {isAdmin && (
              <>
                {/* <PackageButton
                  onPress={() => {
                    navigation.navigate('BuyPackagesAndMyOrders');
                  }}
                  style={{
                    borderColor: Colors.Primary,
                    borderWidth: 1,
                    marginHorizontal: 16,
                  }}
                  startIcon={
                    theme == 'dark' ? SVG.grayWalletDark : SVG.grayWallet
                  }
                  title={localized.buy_packagees_and_my_orders}
                  discription={localized.packages_orders_and_billing_history}
                  endIcon={svgWithColor('arrow_right', false, Colors.Primary)}
                /> */}
                <Button
                  onPress={() => {
                    navigation.navigate('Favorites');
                  }}
                  title={localized.my_favorites}
                  style={styles.favBtn}
                  starIcon={
                    theme == 'dark' ? SVG.heartFillGrayDark : SVG.heartFillGray
                  }
                  starIconSize={20}
                  icon={
                    theme == 'dark' ? SVG.arrow_right_dark : SVG.arrow_right
                  }
                  titleStyle={styles.favBtnText}
                  iconSize={20}
                  iconStyle={{marginEnd: 0}}
                />
              </>
            )}
            <View style={{paddingHorizontal: 16}}>
              {products.length > 0 || loading ? (
                <ProductList
                  loading={loading}
                  itemStyle={{borderWidth: 1, borderColor: Colors.GrayLightest}}
                  hideComments={true}
                  data={products}
                  type={2}
                />
              ) : (
                <ExceptionComp
                  title={localized.no_ads_found}
                  description={'You can create an ad to get started'}
                />
              )}
            </View>
          </View>
        </View>
        {/* <LoadingComp isLoading={loading} /> */}
        <LoginModal
          visible={showLoginModal}
          onCancel={() => {
            setShowLoginModal(false);
          }}
          onLogin={() => {
            navigation.navigate('SignIn');
            setShowLoginModal(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styling = theme =>
  StyleSheet.create({
    SafeAreaView: {
      flex: 1,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLightest : 'white',
    },
    container: {
      flex: 1,
      backgroundColor: theme == 'dark' ? DarkColors.Primary : Colors.Secondary,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme == 'dark' ? 'white' : 'black',
    },
    Avatar: {
      height: 128,
      width: 128,
      borderRadius: 64,
      alignSelf: 'center',
    },
    imageStyle: {
      height: 128,
      width: 128,
      borderRadius: 64,
      borderWidth: 5,
      borderColor: 'white',
    },
    statusView: {
      height: 20,
      width: 20,
      borderRadius: 10,
      marginHorizontal: 10,
      marginBottom: 10,
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      marginTop: -64,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme == 'dark' ? 'white' : Colors.GrayDarkest,
      alignSelf: 'center',
      marginTop: 10,
      lineHeight: 25,
    },
    email: {
      fontSize: 12,
      color: Colors.GrayDarker,
      alignSelf: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 5,
      paddingVertical: 16,
      borderBottomColor: Colors.LightWhite,
      borderBottomWidth: 1,
    },
    outlineInfoBox: {
      paddingVertical: 10,
      flex: 1,
      borderRadius: 6,
      borderWidth: 1,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
      borderColor: theme == 'dark' ? DarkColors.GrayMedium : Colors.GrayLighter,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
    },
    outlineInfoBoxTextBold: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme == 'dark' ? 'white' : Colors.GrayDarkest,
    },
    outlineInfoText: {
      fontSize: 12,
      color: theme == 'dark' ? DarkColors.abadb4 : Colors.GrayDarker,
    },
    favBtn: {
      backgroundColor: theme == 'dark' ? DarkColors.GrayLightest : 'white',
      borderWidth: 1,
      borderColor:
        theme == 'dark' ? DarkColors.GrayLighter : Colors.GrayLighter,
      marginHorizontal: 16,
      marginTop: 0,
      marginBottom: 16,
    },
    favBtnText: {
      fontSize: 14,
      fontWeight: '500',
      color: theme == 'dark' ? 'white' : Colors.GrayDarkest,
      flex: 1,
      textAlign: 'start',
      marginEnd: 10,
      marginStart: 0,
    },
  });
export default Profile;
