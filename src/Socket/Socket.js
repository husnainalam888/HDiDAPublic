import io from 'socket.io-client';
import {global_storage} from '../Utils/Utils';
import {Toast} from 'react-native-toast-notifications';
import {navigationRef} from '../Utils/NotificationUtils/NavigationRef';
import {print} from '../Utils/API';

export const socket = io('https://www.hdida.app/');
// export const socket = io('https://3b10-223-123-6-145.ngrok-free.app/');

const handleNewMessage = (userId, message) => {
  const keword = `chat_${userId}_${message.senderId}`;
  let chats = global_storage.getArray(keword) || [];
  const index = chats.findIndex(item => item._id == message._id);
  if (index > -1) {
    chats[index] = message;
  } else {
    chats = [message, ...chats];
  }
  global_storage.setArray(keword, chats);
  global_storage.setBool('refreshChat', !global_storage.getBool('refreshChat'));
};

const handleMessageSeen = (userId, message) => {
  const keword = `chat_${userId}_${message.receiverId}`;
  let chats = global_storage.getArray(keword) || [];
  const index = chats.findIndex(item => item._id == message._id);
  if (index > -1) {
    chats[index] = {...message, status: 'seen'};
  } else {
    chats = [{...message, status: 'seen'}, ...chats];
  }
  global_storage.setArray(keword, chats);
  global_storage.setBool('refreshChat', !global_storage.getBool('refreshChat'));
};

const connectSocket = userId => {
  socket.connect();
  socket.on('connect', () => {
    console.warn('connected to socket');
    socket.emit('addUser', userId);
    socket.on('getMessage', message => {
      handleNewMessage(userId, message);
    });
    socket.on('seenSuccess', data => {
      console.log('seenSuccess', {...data, status: 'seen'});
      handleMessageSeen(userId, {...data, status: 'seen'});
    });
    socket.on('payment', data => {
      print('payment: Listener:', data);
      global_storage.setBool('isLoading', false);
      if (data.status) {
        Toast.show(data.message, {title: 'Success', type: 'success'});
        console.warn('type', data.type);
        if (data.type == 'boost') {
          console.warn(data, navigationRef.current);
          navigationRef.current.navigate('Home');
          global_storage.setBool(
            'refreshHome',
            !global_storage.getBool('refreshHome'),
          );
        } else if (data.type == 'vendorVerification') {
          navigationRef.current.navigate('Home');
        } else if (data.type == 'credits') {
          global_storage.setBool(
            'refreshPackages',
            !global_storage.getBool('refreshPackages'),
          );
        } else if (data.type == 'customCredits') {
          navigationRef.current.goBack();
        }
      } else Toast.show(data.message, {title: 'Error', type: 'error'});
    });
  });
};

const disconnectSocket = () => {
  socket.disconnect();
};

const sendMessage = data => {
  console.log('sendMessage', data);
  socket.emit('sendMessage', data);
};

export {connectSocket, disconnectSocket, sendMessage};
