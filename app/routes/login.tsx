import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../styles/globalStyles';
import FormTextInput from '../../components/FormTextInput';
import { useAuth } from 'app/contexts/AuthContext';
import Header from 'components/Header';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    await login(email, password);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Header title="Login to KONEKT"/>

      <FormTextInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormTextInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => router.push('/routes/register')}
      >
        <Text style={styles.registerLinkText}>Don't have an account? Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPasswordLink}
      >
        <Text style={styles.forgotPasswordLinkText}>Forgot Password?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Define types for styles
interface Styles {
  container: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  registerLink: ViewStyle;
  registerLinkText: TextStyle;
  forgotPasswordLink: ViewStyle;
  forgotPasswordLinkText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background.primary,
  },
  button: {
    backgroundColor: Colors.accent.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.background.primary,
  },
  registerLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  registerLinkText: {
    color: Colors.text.secondary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  forgotPasswordLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  forgotPasswordLinkText: {
    color: Colors.text.secondary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginPage;