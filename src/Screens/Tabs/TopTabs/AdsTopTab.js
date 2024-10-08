import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {CHAT_LIST} from '../../../Utils/Data';
import AdListItem from '../../../Components/AdListItem';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../../Utils/Utils';
import {deleteRequest, getRequest} from '../../../Utils/API';
import LoadingComp from '../../../Components/LoadingComp';
import ExceptionComp from '../../../Components/ExceptionComp';
import {localized} from '../../../Utils/Strings';
import {useLanguage} from '../../../Provider/LanguageProvider';
import {Colors, DarkColors} from '../../../Utils/Colors';

const AdsTopTab = ({route, navigation}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const {localized} = useLanguage();
  const TAG = 'AdsTopTab.js';
  const id = route.params?.id;
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [needRefresh, setNeedRefresh] = useMMKVStorage(
    'needRefresh',
    global_storage,
    false,
  );
  const [activeAds, setActiveAds] = useMMKVStorage(
    'activeAds',
    global_storage,
    [],
  );
  const [removedAds, setRemovedAds] = useMMKVStorage(
    'removedAds',
    global_storage,
    [],
  );
  useEffect(() => {
    getPostByUserId();
  }, []);
  const getPostByUserId = async (refreshing = false) => {
    try {
      if (refreshing) {
        setRefreshing(true);
      }
      const respone = await getRequest(
        `post/getByUserId?page=1&limit=2000&id=${user.id}&type=${
          id == 'Active' ? '1' : '0'
        }`,
        user.token,
      );
      if (refreshing) {
        setRefreshing(false);
      }
      if (respone.status) {
        if (id == 'Active') {
          setActiveAds(respone.data);
        } else {
          setRemovedAds(respone.data);
        }
      }
    } catch (e) {
      console.log(e);
      if (refreshing) {
        setRefreshing(false);
      }
    }
  };
  const onDelete = async item => {
    try {
      setLoading(true);
      const response = await deleteRequest(
        'post/delete',
        {postId: item._id},
        user.token,
      );
      setLoading(false);
      console.log(TAG, 'deletePost() : Response :', response);
      if (response.status) {
        getPostByUserId();
        setNeedRefresh(!needRefresh);
      }
      Alert.alert('Success', response.message);
    } catch (e) {
      Alert.alert('Error', 'Something went wrong. Please try again later');
      console.log(TAG, ' Error : deletePost():', e);
      setLoading(false);
    }
  };
  const onEdit = item => {
    navigation.navigate('SellStep1', {data: item});
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme == 'dark' ? DarkColors.GrayLightest : 'white',
        paddingHorizontal: 16,
      }}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[Colors.Primary]}
            onRefresh={() => getPostByUserId(true)}
            refreshing={refreshing}
          />
        }
        data={id == 'Active' ? activeAds : removedAds}
        style={{marginTop: 10}}
        contentContainerStyle={{
          paddingVertical: 6,
          flexGrow: 1,
          paddingBottom: 102,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <AdListItem
            item={item}
            onDelete={() => onDelete(item)}
            onEdit={onEdit}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => {
          return (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ExceptionComp
                title={localized.no_ads_found}
                image={require('../../../assets/noData.png')}
              />
            </View>
          );
        }}
      />
      <LoadingComp isLoading={loading} />
    </View>
  );
};

export default AdsTopTab;

const styles = StyleSheet.create({});
