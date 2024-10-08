import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';

import HeaderBottomSheet from './HeaderBottomSheet';
import {SVG} from '../SVGS/SVG';
import CommentList from './CommentList';
import {COMMENTS} from '../Utils/Data';
import {Colors, DarkColors} from '../Utils/Colors';
import InputWithIcon from './Input/InputWithIcon';
import DropShadow from 'react-native-drop-shadow';
import MenuComp from './MenuComp';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';
import {
  BASE_URL,
  IMAGE_URL,
  postRequest,
  simplePostRequest,
} from '../Utils/API';
import {useToast} from 'react-native-toast-notifications';
import {useLanguage} from '../Provider/LanguageProvider';
const CommentSheet = ({onPressClose, postId, ...props}) => {
  const toast = useToast();
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const [comments, setComments] = useState(props.comments || []);
  const [loading, setLoading] = useState(false);
  const commentsRef = useRef();
  const TAG = 'CommentSheet';
  const [comment, setComment] = useState('');
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  const [itemToReply, setItemToReply] = useState(false);
  const [needRefresh, setNeedRefresh] = useMMKVStorage(
    'needRefresh',
    global_storage,
    false,
  );
  const {localized} = useLanguage();
  useEffect(() => {
    if (props.comments) setComments(props.comments);
  }, [props.comments]);
  const inputRef = useRef();
  const createComment = async () => {
    try {
      const formData = new FormData();
      formData.append('postId', postId);
      formData.append('comment', comment);
      if (itemToReply) {
        formData.append('isReply', true);
        formData.append('replyTo', itemToReply._id);
      }
      console.log(TAG, 'createComment formData', formData);
      setLoading(true);
      const response = await simplePostRequest(
        'comment/postComment',
        formData,
        user.token,
      );
      setLoading(false);
      console.log(TAG, 'createComment response', response);
      if (response.status) {
        if (itemToReply) {
          let index = -1;
          if (!itemToReply.isReply) {
            index = comments.findIndex(item => item._id == itemToReply._id);
            if (index > -1) {
              let newComments = [...comments];
              newComments[index].replies = [
                ...newComments[index].replies,
                {
                  ...response.data,
                  userId: {
                    profileImage: user.profileImage,
                    name: user.name,
                    _id: user.id,
                  },
                },
              ];
              if (props.onChange) props.onChange(newComments);
              setComments(newComments);
            }
          }
          setItemToReply(false);
        } else {
          setComments([
            ...comments,
            {
              ...response.data,
              userId: {
                profileImage: user.profileImage,
                name: user.name,
                _id: user.id,
              },
            },
          ]);
          if (props.onChange)
            props.onChange([
              ...comments,
              {
                ...response.data,
                userId: {
                  profileImage: user.profileImage,
                  name: user.name,
                  _id: user.id,
                },
              },
            ]);
        }
        setComment('');
        setNeedRefresh(!needRefresh);
        if (commentsRef.current) commentsRef.current.scrollToEnd();
        else console.log(TAG, 'createComment commentsRef.current', commentsRef);
      } else
        toast.show(response.message, {
          title: 'Error',
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.show('Something went wrong, please try again!', {
        title: 'Error',
      });
    }
  };

  const handleReport = async comment => {
    try {
      const formData = new FormData();
      formData.append('id', comment._id);
      const respose = await simplePostRequest(
        'comment/reportComment',
        formData,
        user.token,
      );
      console.log(TAG, 'handleReport ():', respose);
      if (respose.status) {
        toast.show(respose.message, {
          title: 'Reported',
          placement: 'top',
        });
      } else {
        toast.show(respose.message, {});
      }
    } catch (error) {
      console.log(TAG, 'handleReport ():', error);
      toast.show('Something went wrong, please try again!', {
        title: 'Error',
      });
    }
  };

  const handleDelete = async comment => {
    try {
      const formData = new FormData();
      formData.append('id', comment._id);
      const respose = await simplePostRequest(
        'comment/deleteComment',
        formData,
        user.token,
      );
      console.log(TAG, 'handleHide ():', respose);
      if (respose.status) {
        toast.show(respose.message, {
          title: 'Deleted',
          placement: 'top',
        });
        setNeedRefresh(!needRefresh);
        let newComments = [...comments];
        newComments = newComments.filter(item => item._id != comment._id);
        setComments(newComments);
        if (props.onDelete) props.onDelete([...newComments]);
      } else {
        toast.show(respose.message, {});
      }
    } catch (error) {
      console.log(TAG, 'handleHide ():', error);
      toast.show('Something went wrong, please try again!', {});
    }
  };
  const handleHide = async comment => {
    try {
      const formData = new FormData();
      formData.append('id', comment._id);
      const respose = await simplePostRequest(
        'comment/hideComment',
        formData,
        user.token,
      );
      console.log(TAG, 'handleHide ():', respose);
      if (respose.status) {
        toast.show(respose.message, {
          title: 'Hidden',
          placement: 'top',
        });
        setNeedRefresh(!needRefresh);
        let newComments = [...comments];
        newComments = newComments.filter(item => item._id != comment._id);
        setComments(newComments);
        if (props.onDelete) props.onDelete([...newComments]);
      } else {
        toast.show(respose.message, {});
      }
    } catch (error) {
      console.log(TAG, 'handleHide ():', error);
      toast.show('Something went wrong, please try again!', {});
    }
  };
  return (
    <View style={styles.container}>
      <HeaderBottomSheet
        label={localized['comments']}
        endIcon={SVG.close}
        onPressEnd={onPressClose}
      />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        {comments.length > 0 ? (
          <CommentList
            context={'BottomSheet'}
            itemStyle={styles.commentItem}
            data={comments}
            onReport={handleReport}
            onDelete={handleDelete}
            onHide={handleHide}
            forwardedRef={commentsRef}
            itemToReply={itemToReply}
            setItemToReply={item => {
              setItemToReply(item);
              if (item) inputRef.current?.focus();
            }}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
              {user.id == 'guest'
                ? localized['No Comments']
                : localized['Be the first to comment!']}
            </Text>
          </View>
        )}
        {user.id != 'guest' && (
          <DropShadow style={styles.shadow}>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 7,
                backgroundColor:
                  theme == 'dark' ? DarkColors.GrayMedium : 'white',
              }}>
              <InputWithIcon
                style={{
                  borderRadius: 50,
                  marginHorizontal: 20,
                  borderWidth: 0,
                  backgroundColor:
                    theme == 'dark' ? '#0e0e0e' : Colors.LightWhite,
                  paddingEnd: 4,
                }}
                textInputProps={{
                  placeholder: 'Type a comment',
                  style: {paddingVertical: 8, flex: 1},
                  value: comment,
                  onChangeText: setComment,
                  ref: inputRef,
                }}
                loading={loading}
                endIcon={SVG.sendBtn}
                onPressEnd={() => {
                  if (comment != '') {
                    createComment();
                  }
                }}
                endIconSize={38}
              />
            </View>
          </DropShadow>
        )}
      </View>
    </View>
  );
};

const styling = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
    },
    commentItem: {
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
    },
    shadow: {
      shadowColor: Colors.Black,
      shadowOpacity: 0.2,
      shadowOffset: {
        height: 2,
        width: 0,
      },
      shadowRadius: 4,
      justifyContent: 'flex-end',
    },
  });

export default CommentSheet;
