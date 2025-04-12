import { GooglePlacesAutocomplete } from 'node_modules/react-native-google-places-autocomplete/GooglePlacesAutocomplete';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GOOGLE_CLOUD_API_KEY } from 'config';
import 'react-native-get-random-values'
import { Colors } from 'styles/Colors';
import { Location } from 'types';


interface LocationInputProps {
  onLocationSelect: (location: Location) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationSelect }) => {
  function handlePlaceSelected(data: any, details: any) {
    if (!details?.geometry?.location) return;

    const { lat, lng } = details.geometry.location;
    const name = data.structured_formatting.main_text;
    const location = {
      name: name,
      url: `comgooglemaps://?center=${lat},${lng}&q=${encodeURIComponent(name)}`,
    }

    onLocationSelect(location);
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
});

export default LocationInput;