import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Hide the header for the index page
        }}
      />
      {/* Add other screens here if needed */}
    </Stack>
  );
}