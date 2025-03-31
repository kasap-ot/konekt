import React from 'react';
import { Stack } from 'expo-router';
import { EventsProvider } from './EventsContext';
import { AuthProvider } from './AuthContext';

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