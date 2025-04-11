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

const LocationInput: React.FC = () => {
  const [savedLocations, setSavedLocations] = useState<Location[]>([]);

  function handlePlaceSelected(data: any, details: any) {
    if (!details?.geometry?.location) return;

    const { lat, lng } = details.geometry.location;
    const name = data.structured_formatting.main_text;

    const newLocation: Location = {
      name,
      appUrl: `comgooglemaps://?center=${lat},${lng}&q=${encodeURIComponent(name)}`,
      webUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${details.place_id}`,
    }

    setSavedLocations(prev => [newLocation, ...prev]);
  }

  async function openLocation(appUrl: string, webUrl: string) {
    try {
      const supported = await Linking.canOpenURL(appUrl);
      if (supported)
        await Linking.openURL(appUrl);
      else
        await Linking.openURL(webUrl);
    }
    catch (error) {
      console.error('Error opening map:', error);
    }
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