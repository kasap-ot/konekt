import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../styles/globalStyles';
import HomeButton from '../components/HomeButton';
import { useAuth } from './contexts/AuthContext';

const App = (): React.ReactElement => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to KONEKT</Text>

      {user ? (
        <>
          <Text style={styles.userNameText}>{user.name}</Text>

          {user.labels.includes('guest') ? (
            <>
              <HomeButton
                title="Categories"
                onPress={() => router.push('/screens/categories')}
              />
            </>
          ) : (
            <>
              <HomeButton
                title="Organizer Home"
                onPress={() => router.push('/screens/organizer-home')}
              />
            </>
          )}

          <HomeButton
            title="Logout"
            onPress={() => logout()}
          />
        </>
      ) : (
        <>
          <Text style={styles.userNameText}>(Guest User)</Text>

          <HomeButton
            title="Login"
            onPress={() => router.push('/screens/login')}
          />

          <HomeButton
            title="Register"
            onPress={() => router.push('/screens/register')}
          />
        </>
      )}
    </View>
  );
};

interface Styles {
  container: ViewStyle,
  welcomeText: TextStyle,
  userNameText: TextStyle,
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
  },
  userNameText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 30,

  }
});

export default App;