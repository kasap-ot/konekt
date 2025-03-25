import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const App = () => {
  const router = useRouter();

  const handleGuestPress = () => {
    router.push('/categories');
  };

  const handleOrganizerPress = () => {
    router.push('/company-home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to KONEKT</Text>

      <TouchableOpacity style={styles.button} onPress={handleGuestPress}>
        <Text style={styles.buttonText}>Guest</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOrganizerPress}>
        <Text style={styles.buttonText}>Organizer</Text>
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
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40, // Add some space below the title
  },
  button: {
    width: 200,
    padding: 15,
    marginVertical: 10, // Space between buttons
    backgroundColor: '#A0522D',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;