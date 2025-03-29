import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../styles/globalStyles';
import HomeButton from '../components/HomeButton';

const App = (): React.ReactElement => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to KONEKT</Text>

      <HomeButton
        title="Guest"
        onPress={() => router.push('/categories')}
      />

      <HomeButton
        title="Organizer"
        onPress={() => router.push('/company-home')}
      />

      <HomeButton
        title="Login"
        onPress={() => router.push('/login')}
        style={styles.accountButton}
      />

      <HomeButton
        title="Register"
        onPress={() => router.push('/register')}
        style={styles.accountButton}
      />
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
  accountButton: {
    width: '40%',
    marginHorizontal: 10,
  },
});

export default App;