import React, { useState } from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../styles/globalStyles';
import FormTextInput from '../components/FormTextInput';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const handleRegister = (): void => {
    // Basic client-side validation
    if (!email || !password || !repeatPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    // TODO: Implement actual registration logic
    alert('Registration form submitted');
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Account</Text>

      <FormTextInput 
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormTextInput 
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        secureTextEntry={true}
      />

      <FormTextInput 
        label="Repeat Password"
        placeholder="Confirm your password"
        value={repeatPassword}
        onChangeText={(text: string) => setRepeatPassword(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginLink}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.loginLinkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Type definitions for styles
interface RegisterStyles {
  container: StyleProp<ViewStyle>;
  title: StyleProp<TextStyle>;
  button: StyleProp<ViewStyle>;
  buttonText: StyleProp<TextStyle>;
  loginLink: StyleProp<ViewStyle>;
  loginLinkText: StyleProp<TextStyle>;
}

const styles = StyleSheet.create<RegisterStyles>({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 20,
    textAlign: 'center',
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
  loginLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginLinkText: {
    color: Colors.text.secondary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default RegisterPage;