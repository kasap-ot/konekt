import React from 'react';
import { SafeAreaView } from 'react-native';
import { LocationSearchBar } from './maps';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LocationSearchBar />
    </SafeAreaView>
  );
};

export default App;