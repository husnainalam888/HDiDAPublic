import React from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Colors} from '../Utils/Colors';

const LoginModal = ({visible, onCancel, onLogin}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <Pressable onPress={onCancel} style={styles.modalContainer}>
        <Pressable style={styles.modalContent}>
          <Text style={styles.heading}>Login First</Text>
          <Text style={styles.message}>
            Please login to access this feature
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.button, {backgroundColor: Colors.GrayDarker}]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onLogin}
              style={[styles.button, {backgroundColor: Colors.Primary}]}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  heading: {
    marginBottom: 10,
    color: Colors.primary1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    marginBottom: 20,
    color: Colors.primary1,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginModal;
