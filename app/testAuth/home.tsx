import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from './AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome {user?.email}</Text>
      <Button title="Logout" onPress={async () => await logout()} />
    </View>
  );
}