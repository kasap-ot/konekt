import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../styles/globalStyles';


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
    backgroundColor: Colors.background.primary,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 40,
  },
  button: {
    width: 200,
    padding: 15,
    marginVertical: 10,
    backgroundColor: Colors.accent.primary,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;