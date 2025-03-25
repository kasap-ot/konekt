import React from 'react';
import { Stack } from 'expo-router';
import { EventsProvider } from './events-context';

export default function RootLayout() {
  return (
    <EventsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        {/* Other screen configurations */}
      </Stack>
    </EventsProvider>
  );
}