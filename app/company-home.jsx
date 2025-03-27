import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../styles/globalStyles';
import CompanyHomeButton from '../components/company-home-button';

const CompanyHomePage = () => {
  const router = useRouter();

  const handleButtonPress = (action) => {
    console.log(`${action} button pressed`);
    if (action === 'My Events') {
      router.push('/list-events');
    } else if (action === 'Create New Event') {
      router.push('/create-event');
    }
  };

  return (
    <View style={styles.container}>
      <CompanyHomeButton
        title="My Events"
        onPress={() => handleButtonPress('My Events')}
        style={styles.button}
      />

      <CompanyHomeButton
        title="Create New Event"
        onPress={() => handleButtonPress('Create New Event')}
        style={styles.button}
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
    padding: 10,
  },
  button: {
    width: '100%', 
    height: '40%', 
    marginVertical: 10,
  },
});

export default CompanyHomePage;