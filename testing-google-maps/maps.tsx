import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const GOOGLE_API_KEY = 'AIzaSyAFndIP9jHQJ3D24QuIrtFVaGg4rxAcz3Y';

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for a place"
        onPress={(data, details = null) => {
          setSelectedPlace(data.description);
        }}
        fetchDetails={false}
        query={{
          key: GOOGLE_API_KEY,
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
