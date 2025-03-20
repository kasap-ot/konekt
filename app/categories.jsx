import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoriesPage = () => {
  const router = useRouter();
  
  // Handle button press
  const handleButtonPress = (category) => {
    router.push('/list-events');
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
    backgroundColor: '#A0522D', // Coral color for Parties
  },
  sportButton: {
    backgroundColor: '#A0522D', // Green color for Sport Events
  },
  educationalButton: {
    backgroundColor: '#A0522D', // Blue color for Educational Events
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CategoriesPage;