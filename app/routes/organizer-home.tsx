import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../styles/Colors';
import CompanyHomeButton from '../components/CompanyHomeButton';
import { useAuth } from 'app/contexts/AuthContext';


const CompanyHomePage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return <Text>Cannot access route. User must be logged in.</Text>
  }

  return (
    <View style={styles.container}>
      <CompanyHomeButton
        title="My Events"
        onPress={() => router.push({
          pathname: '/routes/list-events',
          params: {userId: user.$id}
        })}
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