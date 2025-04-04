import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { Colors } from '../../styles/globalStyles';
import FormTextInput from '../../components/FormTextInput';
import { UserType } from 'types';
import { useAuth } from 'app/contexts/AuthContext';
import Header from 'components/Header';
import Link from 'components/Link';


const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [userType, setUserType] = useState<UserType>('guest');
  const { register } = useAuth();

  const handleRegister = async (): Promise<void> => {
    if (!email || !password || !repeatPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    await register(email, password, name, userType)
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Header title="Create Account" />

      <FormTextInput
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={(text: string) => setName(text)}
        keyboardType="default"
      />

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

      <Text style={styles.label}>User Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={{ color: Colors.text.secondary }}
          selectedValue={userType}
          onValueChange={(selectedUserType: UserType) => setUserType(selectedUserType)}
        >
          <Picker.Item label="Guest" value="guest" />
          <Picker.Item label="Organizer" value="organizer" />
        </Picker>
      </View>

      {/* // TODO: Extract labels, text inputs, and picker as separate components */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Link title='Already have an account? Log in' onPress={() => router.push('/routes/login')} />
    </ScrollView>
  );
};

interface RegisterStyles {
  container: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  label: TextStyle;
  pickerContainer: ViewStyle;
}

const styles = StyleSheet.create<RegisterStyles>({
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    marginBottom: 20,
  }
});

export default RegisterPage;