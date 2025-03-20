import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CompanyHomePage = () => {
  // Handle button press
  const handleButtonPress = (action) => {
    console.log(`${action} button pressed`);
    alert(`You selected: ${action}`);
  };

  return (
    <View style={styles.container}>
      {/* My Events Button */}
      <TouchableOpacity
        style={[styles.button, styles.myEventsButton]}
        onPress={() => handleButtonPress('My Events')}
      >
        <Text style={styles.buttonText}>My Events</Text>
      </TouchableOpacity>

      {/* Create New Event Button */}
      <TouchableOpacity
        style={[styles.button, styles.createEventButton]}
        onPress={() => handleButtonPress('Create New Event')}
      >
        <Text style={styles.buttonText}>Create New Event</Text>
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
    height: '40%', // 40% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10, // Space between buttons
  },
  myEventsButton: {
    backgroundColor: '#FF6F61', // Coral color for My Events
  },
  createEventButton: {
    backgroundColor: '#4CAF50', // Green color for Create New Event
  },
  buttonText: {
    fontSize: 28, // Slightly larger font size
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CompanyHomePage;