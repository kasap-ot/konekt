import React from 'react';
import { Stack } from 'expo-router';
import { EventsProvider } from './contexts/EventsContext';
import { AuthProvider } from './contexts/AuthContext';

export default function RootLayout(): React.ReactElement {
  return (
    <AuthProvider>
      <EventsProvider>
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          {/* Other screen configurations */}
        </Stack>
      </EventsProvider>
    </AuthProvider>
  );
}