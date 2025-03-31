import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
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
        onPress={() => router.push('/screens/categories')}
      />

      <HomeButton
        title="Organizer"
        onPress={() => router.push('/screens/company-home')}
      />

      <HomeButton
        title="Login"
        onPress={() => router.push('/screens/login')}
      />

      <HomeButton
        title="Register"
        onPress={() => router.push('/screens/register')}
      />
    </View>
  );
};

interface Styles {
  container: ViewStyle,
  welcomeText: TextStyle,
}

const styles = StyleSheet.create<Styles>({
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
  }
});

export default App;