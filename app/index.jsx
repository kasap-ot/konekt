import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import EventIcon from '@/assets/images/event-icon.png';


// Main App component
const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to KONEKT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#121212', // Dark background
  },
  welcomeText: {
    fontSize: 32, // Large font size
    fontWeight: 'bold', // Bold text
    color: '#FFFFFF', // White text color
  },
});

export default App;