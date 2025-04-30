import React from 'react';
import { Modal, View, Pressable, Text, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'styles/Colors';
import { StyleSheet } from 'react-native';
import LocationInput from 'components/LocationInput';
import { Location } from 'types';

interface LocationModalProps {
  visible: boolean;
  onClose: () => void;
  onLocationSelect: (location: Location) => void;
}

const LocationModal = ({ visible, onClose, onLocationSelect }: LocationModalProps): React.ReactElement => {
  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalText}>Find your location:</Text>
          <Pressable onPress={onClose}>
            <Ionicons name='close' size={24} color='#fff'/>
          </Pressable>
        </View>

        <LocationInput onLocationSelect={onLocationSelect}/>
      </View>
    </Modal>
  );
};

interface Styles {
  modal: ViewStyle;
  modalText: TextStyle;
  modalHeader: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  modal: {
    backgroundColor: Colors.background.primary,
    flex: 1,
    padding: 30,
  },
  modalText: {
    color: Colors.text.primary,
    fontSize: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default LocationModal;