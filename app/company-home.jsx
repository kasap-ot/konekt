import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter
import { Colors } from '../styles/globalStyles';


const CompanyHomePage = () => {
  const router = useRouter(); // Initialize the router

  // Handle button press
  const handleButtonPress = (action) => {
    console.log(`${action} button pressed`);
    if (action === 'My Events') {
      router.push('/list-events'); // Navigate to the "/events" page
    } else if (action === 'Create New Event') {
      router.push('/create-event'); // Navigate to the "/create-event" page
    }
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
    backgroundColor: Colors.background.primary,
    padding: 10,
  },
  button: {
    width: '100%', 
    height: '40%', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10, 
  },
  myEventsButton: {
    backgroundColor: Colors.accent.primary, 
  },
  createEventButton: {
    backgroundColor: Colors.accent.primary, 
  },
  buttonText: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
});

export default CompanyHomePage;