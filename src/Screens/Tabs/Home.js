import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeader from '../../Components/HomeComps/HomeHeader';
import {Colors, DarkColors} from '../../Utils/Colors';
import ChipList from '../../Components/ChipList';
import {CATS, PRODUCTS, TAGS} from '../../Utils/Data';
import SearchComp from '../../Components/SearchComp';
import LabelRow from '../../Components/LabelRow';
import ProductList from '../../Components/ProductList';
import {Image} from 'react-native';
import CatList from '../../Components/CatList';
import MenuComp from '../../Components/MenuComp';
import FilterSheet from '../../Components/FiltersComps/FilterSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import {getCat, getRequest} from '../../Utils/API';
import LoadingComp from '../../Components/LoadingComp';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';
import ExceptionComp from '../../Components/ExceptionComp';
import {useLanguage} from '../../Provider/LanguageProvider';
import AnimatedSVG from '../../Components/AnimatedSvg';
import {
  InitializationState,
  BannerAd,
  TestIds,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

const Home = ({navigation}) => {
  const [theme, setTheme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const TAG = 'Home';
  const {localized} = useLanguage();
  const commentSheetRef = React.useRef(null);
  const [pageLoading, setPageLoading] = React.useState(false);
  const filterSheetRef = React.useRef(null);
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadingPopularData, setLoadingPopularData] = useState(true);
  const [loadingNewData, setLoadingNewData] = useState(true);
  const [loadingBoostedData, setLoadingBoostedData] = useState(true);
  const [refreshHome, setRefreshHome] = useMMKVStorage(
    'refreshHome',
    global_storage,
    false,
  );
  const [adLoaded, setAdLoaded] = React.useState({
    1: true,
    2: true,
  });
  const [page, setPage] = React.useState(1);
  const [pickers, setPickers] = useMMKVStorage('pickers', global_storage, []);
  const [needRefresh, setNeedRefresh] = useMMKVStorage(
    'needRefresh',
    global_storage,
    false,
  );
  const [popularData, setPopularData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [boostedData, setBoostedData] = useState([]);
  // );  const [popularData, setPopularData] = useMMKVStorage(
  //   'popularData',
  //   global_storage,
  //   [],
  // );
  // const [newData, setNewData] = useMMKVStorage('newData', global_storage, []);
  // const [boostedData, setBoostedData] = useMMKVStorage(
  //   'boostedData',
  //   global_storage,
  //   [],
  // );
  const openBottomSheet = mode => {
    let bottomSheetRef = mode == 'comment' ? commentSheetRef : filterSheetRef;
    if (bottomSheetRef.current != null) {
      bottomSheetRef.current.open();
    }
  };

  const closeBottomSheet = () => {
    filterSheetRef.current.close();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user) {
        console.log(TAG, 'useEffect():', 'fetchAll()');
        fetchAll(false, 1, false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [refreshHome]);
  const getAllPosts = async (
    type,
    setData,
    setLoading,
    currentPage = page,
    load = true,
  ) => {
    try {
      if (currentPage > 1) {
        setPageLoading(true);
      }
      const endPoint = `post/getAll?page=${
        type == 'new' ? currentPage : 1
      }&limit=10&type=${type}`;
      if (load) setLoading(true);
      const response = await getRequest(endPoint, user.token);
      console.log(TAG, 'getAllPosts() :', type, response.data.length, response);
      if (currentPage > 1 || !load) {
        setPageLoading(false);
      }
      setLoading(false);
      if (response.status) {
        if (currentPage == 1) {
          setData(response.data);
        } else {
          setData([...newData, ...response.data]);
        }
        if (response.data?.length > 0) {
          setPage(currentPage + 1);
        }
      }
    } catch (e) {
      console.log(TAG, 'getAllPosts() Error :', e);
      setLoading(false);
      if (pageLoading) setPageLoading(false);
    }
  };

  const onChange = (item, type) => {
    console.log(TAG, 'onChange():', item, type);
    let temp =
      type == 'popular' ? popularData : type == 'new' ? newData : boostedData;
    let index = temp.findIndex(val => val._id == item._id);
    if (index == -1) {
      return;
    } else {
      let val = temp[index];
      if (item.liked != undefined) {
        temp[index] = {
          ...val,
          liked: item.liked,
          likes: item.liked
            ? [...val.likes, user.id]
            : val.likes.filter(val => val != user.id),
        };
      }
      if (item.comments) {
        temp[index] = {
          ...val,
          comments: item.comments,
        };
      }
    }
    if (type == 'popular') {
      setPopularData(temp);
    } else if (type == 'new') {
      setNewData(temp);
    } else if (type == 'boosted') {
      setBoostedData(temp);
    }
  };
  const onDelete = (item, setData) => {
    console.log(TAG, 'onDelete():', item);
    // setData(data => {
    //   let index = data.findIndex(val => val._id == item._id);
    //   if (index > -1) {
    //     data[index] = {
    //       ...data[index],
    //       comments: item.comments,
    //     };
    //   }
    //   return [...data];
    // });
  };

  const fetchAll = (refreshing = false, currentPage = page, load = true) => {
    setPage(0);
    getAllPosts(
      'popular',
      setPopularData,
      setLoadingPopularData,
      currentPage,
      load,
    );
    getAllPosts('new', setNewData, setLoadingNewData, currentPage, load);
    getAllPosts(
      'boosted',
      setBoostedData,
      setLoadingBoostedData,
      currentPage,
      load,
    );
    if (!pickers || pickers?.length == 0) {
      getCat(load);
    }
  };

  const navigateToSeeAll = (type, data) => {
    navigation.navigate('SeeAll', {
      type,
      data,
    });
  };

  const handleEndReached = e => {
    const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;
    const isEndReached =
      parseFloat(layoutMeasurement.height.toFixed(2)) +
        parseFloat(contentOffset.y.toFixed(2)) >=
      parseFloat(contentSize.height.toFixed(2)) - 10;
    if (
      isEndReached &&
      contentOffset.y > 0 &&
      !pageLoading &&
      !isLoading &&
      newData?.length > 5
    ) {
      console.log(TAG, 'handleEndReached():', 'fetching');
      getAllPosts('new', setNewData, () => {});
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HomeHeader />
      <ScrollView
        onScroll={handleEndReached}
        refreshControl={
          <RefreshControl
            onRefresh={() => fetchAll(true, 1)}
            refreshing={refreshing}
            colors={[Colors.Primary]}
          />
        }
        contentContainerStyle={{flexGrow: 1, paddingBottom: 102}}>
        <View style={styles.container}>
          <SearchComp
            style={{marginTop: 16}}
            onSubmitEditing={e =>
              navigation.navigate('SearchScreen', {
                text: e.nativeEvent.text,
              })
            }
            onPressFilter={() => openBottomSheet('filter')}
          />
          {/* <ImageBackground
            source={require('../../assets/banner.png')}
            style={[
              styles.banner,
              {
                marginHorizontal: -16,
              },
            ]}> */}
          {/* <BannerAd
              onAdLoaded={() => setAdLoaded({...adLoaded, 1: true})}
              onAdFailedToLoad={error => setAdLoaded({...adLoaded, 1: false})}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              unitId={'ca-app-pub-3940256099942544/6300978111'}
              style={[styles.banner]}
            /> */}
          {/* </ImageBackground> */}
          {(boostedData?.length > 0 || loadingBoostedData) && (
            <>
              <LabelRow
                label={localized.promoted_offers}
                onPress={() => navigateToSeeAll('Promoted Offers', boostedData)}
              />
              <ProductList
                onChange={item => onChange(item, 'boosted')}
                onDelete={item => onDelete(item, setBoostedData)}
                data={boostedData}
                loading={loadingBoostedData}
              />
            </>
          )}
          {/* <ImageBackground
            source={require('../../assets/smallAd.jpeg')}
            style={[
              styles.banner,
              {
                marginHorizontal: -16,
                // display: adLoaded[2] ? 'flex' : 'none',
              },
            ]}> */}
          {/* <BannerAd
              onAdLoaded={() => setAdLoaded({...adLoaded, 2: true})}
              onAdFailedToLoad={error => {
                setAdLoaded({...adLoaded, 2: false});
                console.warn('AdLoadFailure', error);
              }}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              unitId={'ca-app-pub-3940256099942544/6300978111'}
              style={[styles.banner]}
            /> */}
          {/* </ImageBackground> */}

          <>
            <LabelRow label={localized?.browse_categories} hideEnd={true} />
            <CatList data={pickers} />
          </>

          {(popularData?.length > 0 || loadingPopularData) && (
            <View style={styles.borderView}>
              <LabelRow
                label={localized.near_you}
                onPress={() => navigateToSeeAll('Near You', popularData)}
              />
              <ProductList
                onChange={item => onChange(item, 'popular')}
                onDelete={item => onDelete(item, setPopularData)}
                type={newData?.length == 0 && !isLoading ? 2 : 1}
                data={popularData}
                loading={loadingPopularData}
              />
            </View>
          )}
          {/* <ImageBackground
            source={require('../../assets/largeAd.jpeg')}
            style={[
              styles.banner,
              {
                marginHorizontal: -16,
                height: 250,
              },
            ]}></ImageBackground> */}

          {(newData?.length > 0 || loadingNewData) && (
            <>
              <LabelRow
                label={localized.just_for_you}
                hideEnd={true}
                onPress={() => navigateToSeeAll()}
              />
              <ProductList
                type={2}
                data={newData}
                onDelete={item => onDelete(item, setNewData)}
                onChange={item => onChange(item, 'new')}
                loading={loadingNewData}
              />
            </>
          )}
          <RBSheet
            ref={filterSheetRef}
            animationType="fade"
            dragFromTopOnly={true}
            closeOnDragDown={true}
            height={Dimensions.get('window').height * 0.6}
            openDuration={250}
            customStyles={{
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor:
                  theme == 'dark' ? DarkColors.GrayLighter : 'white',
              },
            }}>
            <FilterSheet
              onSelect={item => {
                closeBottomSheet();
                console.log('FilterSheet onSelect: ', item);
                navigation.navigate('SearchScreen', {data: [item]});
              }}
              onReset={closeBottomSheet}
              onClose={closeBottomSheet}
            />
          </RBSheet>
        </View>
        {newData?.length == 0 &&
          popularData?.length == 0 &&
          boostedData?.length == 0 &&
          !loadingBoostedData &&
          !loadingNewData &&
          !loadingPopularData && (
            <ExceptionComp
              image={require('../../assets/noData.png')}
              title={localized.no_ads_found}
              description={localized.hope_you_can_get_some_soon}
            />
          )}
        {pageLoading && <AnimatedSVG />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styling = theme =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLightest : 'white',
    },
    container: {
      flex: 1,
      backgroundColor:
        theme == 'dark' ? DarkColors.GrayLightest : Colors.LightWhite,
      paddingHorizontal: 16,
    },
    banner: {
      height: 68,
      width: Dimensions.get('window').width,
      marginTop: 20,
      marginBottom: 10,
      backgroundColor: Colors.GrayDarkest,
    },
    borderView: {
      padddingTop: 6,
      paddingBottom: 16,
      marginTop: 16,
      marginBottom: 6,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme == 'dark' ? DarkColors.GrayMedium : Colors.GrayLighter,
    },
  });
