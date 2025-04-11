import { GooglePlacesAutocomplete } from 'node_modules/react-native-google-places-autocomplete/GooglePlacesAutocomplete';
import React, { useRef, useState } from 'react';
import { Linking, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GOOGLE_CLOUD_API_KEY } from 'config';
import 'react-native-get-random-values'
import { Colors } from 'styles/Colors';


type Location = {
  name: string;
  appUrl: string;
  webUrl: string;
}

interface LocationInputProps {
  onLocationSelect: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationSelect: onLocationSave }) => {
  function handlePlaceSelected(data: any, details: any) {
    console.log('saving location...');
    
    if (!details?.geometry?.location) return;

    const { lat, lng } = details.geometry.location;
    const name = data.structured_formatting.main_text;

    const newLocation: Location = {
      name,
      appUrl: `comgooglemaps://?center=${lat},${lng}&q=${encodeURIComponent(name)}`,
      webUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${details.place_id}`,
    }

    onLocationSave(newLocation.appUrl);
  }

  return (
    <View style={styles.container}>
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

      <Text style={styles.savedTitle}>Saved Locations:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    marginTop: 20,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: Colors.background.light,
    color: Colors.text.secondary,
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

export default LocationInput;