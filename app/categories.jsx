import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoriesPage = () => {
  // Handle button press
  const handleButtonPress = (category) => {
    console.log(`${category} button pressed`);
    alert(`You selected: ${category}`);
  };

  return (
    <View style={styles.container}>
      {/* Party Button */}
      <TouchableOpacity
        style={[styles.button, styles.partyButton]}
        onPress={() => handleButtonPress('Parties')}
      >
        <Text style={styles.buttonText}>Parties</Text>
      </TouchableOpacity>

      {/* Sport Events Button */}
      <TouchableOpacity
        style={[styles.button, styles.sportButton]}
        onPress={() => handleButtonPress('Sport Events')}
      >
        <Text style={styles.buttonText}>Sport Events</Text>
      </TouchableOpacity>

      {/* Educational Events Button */}
      <TouchableOpacity
        style={[styles.button, styles.educationalButton]}
        onPress={() => handleButtonPress('Educational Events')}
      >
        <Text style={styles.buttonText}>Educational Events</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 10,
  },
  button: {
    width: '100%', // Full width
    height: '30%', // 30% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10, // Space between buttons
  },
  partyButton: {
    backgroundColor: '#FF6F61', // Coral color for Parties
  },
  sportButton: {
    backgroundColor: '#4CAF50', // Green color for Sport Events
  },
  educationalButton: {
    backgroundColor: '#2196F3', // Blue color for Educational Events
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CategoriesPage;