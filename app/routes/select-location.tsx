import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import LocationInput from '../components/LocationInput';
import Header from '../components/Header';
import { Colors } from 'styles/Colors';


const LocationSearchPage = () => {
  const router = useRouter();

  const handleLocationSelected = (description: string) => {
    router.setParams({ location: description });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Header title="Search Location"/>
      <LocationInput 
        onLocationSelected={handleLocationSelected}
        googlePlacesProps={{
          listViewDisplayed: 'auto',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background.primary,
  },
});

export default LocationSearchPage;