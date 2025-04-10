import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import { GOOGLE_CLOUD_API_KEY } from 'config';

type Location = {
  name: string;
  appUrl: string;
  webUrl: string;
};

export default function LocationSearch() {
  const [savedLocations, setSavedLocations] = useState<Location[]>([]);

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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