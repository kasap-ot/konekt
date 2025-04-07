import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_CLOUD_API_KEY} from 'config';

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for a place"
        onPress={(data, details = null) => {
          setSelectedPlace(data.description);
        }}
        fetchDetails={false}
        query={{
          key: GOOGLE_CLOUD_API_KEY,
          language: 'en',
        }}
        styles={{
          textInput: styles.input,
          listView: styles.list,
        }}
      />

      {selectedPlace && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Selected: {selectedPlace}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#888',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  list: {
    marginHorizontal: 10,
  },
  resultContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  resultText: {
    fontSize: 16,
  },
});

export default App;
