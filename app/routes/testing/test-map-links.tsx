import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, Pressable } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import { GOOGLE_CLOUD_API_KEY } from 'config';


type Location = {
  name: string;
  appUrl: string;
  webUrl: string;
};

interface GoogleComponentProps {
  handlePlaceSelected: (data: any, details: any) => void;
}

interface ModalProps {
  setModalVisible: (newValue: boolean) => void;
  modalVisible: boolean;
  handlePlaceSelected: (data: any, details: any) => void;
  savedLocations: Location[];
  openLocation: (appUrl: string, webUrl: string) => void;
}

interface SavedLocationsProps {
  savedLocations: Location[];
  openLocation: (appUrl: string, webUrl: string) => void;
}

interface ModalHeaderProps {
  setModalVisible: (newValue: boolean) => void;
}

interface ModalButtonProps {
  setModalVisible: (value: boolean) => void;
}


function GoogleComponent({ handlePlaceSelected }: GoogleComponentProps) {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search places..."
      onPress={handlePlaceSelected}
      query={{
        key: GOOGLE_CLOUD_API_KEY,
        language: 'en',
      }}
      styles={{
        textInput: styles.searchInput,
      }}
      fetchDetails={true}
    />
  );
}


function SavedLocations({ savedLocations, openLocation }: SavedLocationsProps) {
  return (
    <>
      <Text style={styles.savedTitle}>Saved Locations:</Text>

      {savedLocations.map((location, index) => (
        <TouchableOpacity
          key={index}
          style={styles.locationItem}
          onPress={() => openLocation(location.appUrl, location.webUrl)}
        >
          <Ionicons name="location" size={24} color="#4285F4" />
          <Text style={styles.locationText}>{location.name}</Text>
          <Ionicons name="open-outline" size={20} color="#4285F4" />
        </TouchableOpacity>
      ))}
    </>
  );
}


function ModalHeader({ setModalVisible }: ModalHeaderProps) {
  return (
    <View style={styles.modalHeader}>
      <Text style={styles.modalTitle}>Location Search</Text>
      <Pressable
        style={styles.closeButton}
        onPress={() => setModalVisible(false)}
      >
        <Ionicons name="close" size={24} color="#4285F4" />
      </Pressable>
    </View>
  );
}


function MyModal({
  setModalVisible,
  modalVisible,
  handlePlaceSelected,
  savedLocations,
  openLocation,
}: ModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <ModalHeader setModalVisible={setModalVisible} />
        <GoogleComponent handlePlaceSelected={handlePlaceSelected} />
        <SavedLocations openLocation={openLocation} savedLocations={savedLocations} />
      </View>
    </Modal>
  );
}


function ModalButton({ setModalVisible }: ModalButtonProps) {
  return (
    <TouchableOpacity
      style={styles.openButton}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.openButtonText}>Open Location Search</Text>
    </TouchableOpacity>
  );
}


export default function LocationSearch() {
  const [savedLocations, setSavedLocations] = useState<Location[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlaceSelected = (data: any, details: any) => {
    if (!details?.geometry?.location) return;

    const { lat, lng } = details.geometry.location;
    const name = data.structured_formatting.main_text;

    const newLocation: Location = {
      name,
      appUrl: `comgooglemaps://?center=${lat},${lng}&q=${encodeURIComponent(name)}`,
      webUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${details.place_id}`
    };

    setSavedLocations(prev => [newLocation, ...prev]);
  };

  const openLocation = async (appUrl: string, webUrl: string) => {
    try {
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        await Linking.openURL(appUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error('Error opening map:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ModalButton setModalVisible={setModalVisible} />

      <MyModal
        handlePlaceSelected={handlePlaceSelected}
        modalVisible={modalVisible}
        openLocation={openLocation}
        savedLocations={savedLocations}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  savedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  locationText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});