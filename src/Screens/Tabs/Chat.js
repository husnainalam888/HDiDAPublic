import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgFromXml} from 'react-native-svg';
import {SVG} from '../../SVGS/SVG';
import {Colors, DarkColors} from '../../Utils/Colors';
import {SwipeListView} from 'react-native-swipe-list-view';
import RBSheet from 'react-native-raw-bottom-sheet';
import DeleteSheetComp from '../../Components/DeleteSheetComp';
import MenuComp from '../../Components/MenuComp';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';
import {IMAGE_URL, getRequest} from '../../Utils/API';
import {useFocusEffect} from '@react-navigation/native';
const Chat = ({navigation}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  const [CHAT_LIST, setCHAT_LIST] = useMMKVStorage('chats', global_storage, []);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const sheeRef = React.useRef(null);
  const onPressDelete = () => {
    if (sheeRef.current) {
      sheeRef.current.open();
    }
  };

  async function getChat(refreshing = false) {
    try {
      setLoading(true);
      if (refreshing) {
        setRefreshing(true);
      }
      const response = await getRequest('user/chats', user.token);
      setLoading(false);
      if (refreshing) {
        setRefreshing(false);
      }
      if (response.status) {
        setCHAT_LIST(response.data);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
      if (refreshing) {
        setRefreshing(false);
      }
    }
  }
  // useFocusEffect(
  //   React.useCallback(() => {
  //     getChat();
  //     console.log('ChatMessages', CHAT_LIST.chatMessages);
  //   }, []),
  // );

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      if (!loading) getChat();
    });
    return () => {
      unsub();
      navigation.removeListener('focus');
    };
  });

  const Header = () => {
    return (
      <View style={styles.Header}>
        <Text style={styles.headerTitle}>Messages</Text>
        {/* <View style={styles.headerRow}>
          <TouchableOpacity style={styles.icon}>
            <SvgFromXml xml={SVG.search} height={19} width={19} />
          </TouchableOpacity>
          <View style={[styles.icon, {marginStart: 8}]}>
            <SvgFromXml xml={SVG.threeDot} height={19} width={19} />
            <MenuComp />
          </View>
        </View> */}
      </View>
    );
  };
  const DeleteComp = ({item}) => {
    return (
      <TouchableOpacity onPress={onPressDelete} style={styles.deleteView}>
        <SvgFromXml xml={SVG.deleteIconChat} height={22} width={22} />
      </TouchableOpacity>
    );
  };
  const ChatItem = ({item}) => {
    const [chat, setChat] = useMMKVStorage(
      `chat_${user._id}_${item._id}`,
      global_storage,
      {},
    );
    const [lastMessage, setLastMessage] = useState(chat[0]);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('ChatScreen', {
            author: item,
          })
        }
        style={styles.ChatItem}>
        <Image
          source={
            item.profileImage
              ? {uri: IMAGE_URL + item.profileImage}
              : require('../../assets/avatar_anime.png')
          }
          style={styles.image}
        />
        <View style={{flex: 1}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text
            style={[
              styles.message,
              item?.lastMessageId?.receiveMessages > 0 && {
                color: Colors.Secondary,
              },
            ]}>
            {item?.lastMessageId?.message?.text}
          </Text>
        </View>
        <View style={{marginStart: 10, justifyContent: 'space-between'}}>
          <Text style={styles.time}>{item?.lastMessageId?.messageTime}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadCountView}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
        <RBSheet
          ref={sheeRef}
          closeOnDragDown
          animationType="fade"
          openDuration={500}
          customStyles={{
            container: {
              height: 'auto',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}>
          <DeleteSheetComp
            title={'Delete this chat?'}
            message={'Are you sure you want to delete this chat?'}
          />
        </RBSheet>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, {paddingHorizontal: 16}]}>
        <Header />
        <SwipeListView
          refreshControl={
            <RefreshControl
              onRefresh={() => getChat(true)}
              refreshing={refreshing}
              colors={[Colors.Primary]}
            />
          }
          style={{marginHorizontal: -16}}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 102}}
          data={CHAT_LIST}
          renderItem={({item}) => <ChatItem item={item} />}
          keyExtractor={item => item.id}
          renderHiddenItem={DeleteComp}
          rightOpenValue={-60}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/noData.png')}
                  resizeMode="contain"
                  style={{height: 200, width: 200, alignSelf: 'center'}}
                />
                <Text
                  style={{
                    color: Colors.Gray,
                    fontSize: 16,
                    marginTop: 10,
                  }}>
                  No Chats Found
                </Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styling = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
    },
    Header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
      borderBottomWidth: 1,
      borderBottomColor:
        theme == 'dark' ? DarkColors.GrayDarker : Colors.GrayLightest,
      marginHorizontal: -16,
      paddingHorizontal: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme == 'dark' ? 'white' : Colors.Black,
    },
    icon: {
      height: 40,
      width: 40,
      backgroundColor: Colors.LightWhite,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ChatItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor:
        theme == 'dark' ? DarkColors.GrayMedium : Colors.GrayLightest,
      borderBottomWidth: 1,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLightest : 'white',
    },
    image: {
      height: 52,
      width: 52,
      borderRadius: 52 / 2,
      backgroundColor:
        theme == 'dark' ? DarkColors.GrayLighter : Colors.GrayLightest,
      marginEnd: 10,
    },
    name: {
      color: theme == 'dark' ? 'white' : Colors.Black,
      fontSize: 16,
      fontWeight: '700',
    },
    message: {
      fontWeight: '400',
      fontSize: 14,
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayDarker,
    },
    time: {
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayDarker,
      fontSize: 12,
      alignSelf: 'flex-start',
    },
    unreadCount: {
      color: 'white',
      fontSize: 8,
    },
    unreadCountView: {
      backgroundColor: Colors.Secondary,
      borderRadius: 10,
      alignSelf: 'center',
      height: 20,
      width: 20,
      padding: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
    },
    deleteView: {
      backgroundColor: '#FD4F87',
      height: '100%',
      paddingHorizontal: 17,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  });
