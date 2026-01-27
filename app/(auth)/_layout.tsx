import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#F0FFDF' },
        headerTitleStyle: { color: '#3A4D39' },
      }}>
      <Stack.Screen name="signin" options={{ title: 'サインイン' }} />
      <Stack.Screen name="signup" options={{ title: 'サインアップ' }} />
    </Stack>
  );
}
