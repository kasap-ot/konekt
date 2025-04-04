import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../styles/Colors';
import CompanyHomeButton from '../../components/CompanyHomeButton';


const CompanyHomePage: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <CompanyHomeButton
        title="My Events"
        onPress={() => router.push('/routes/list-events')}
      />

      <CompanyHomeButton
        title="Categories"
        onPress={() => router.push('/routes/categories')}
      />

      <CompanyHomeButton
        title="Create New Event"
        onPress={() => router.push('/routes/create-event')}
      />
    </View>
  );
};


interface Styles {
  container: ViewStyle,
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    padding: 50,
    paddingVertical: 100,
  },
});

export default CompanyHomePage;