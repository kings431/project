import React, { createContext, useState, useContext } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@/utils/tokenCache';
import { ActivityIndicator, View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = "pk_test_ZGFzaGluZy1jcmlja2V0LTg1LmNsZXJrLmFjY291bnRzLmRldiQ"; // Replace with your key

// Create a context for theme management
const ThemeContext = createContext({ isDarkMode: false, toggleDarkMode: () => {} });

export const useTheme = () => useContext(ThemeContext);

function AuthLoader({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useAuth();
  console.log('[AuthLoader] isLoaded:', isLoaded);
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }
  return <>{children}</>;
}

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useFrameworkReady();

  const toggleDarkMode = () => setIsDarkMode(previous => !previous);

  const [fontsLoaded, fontError] = useFonts({
    'InterRegular': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
    'InterMedium': require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
    'InterSemiBold': require('@expo-google-fonts/inter/Inter_600SemiBold.ttf'),
    'InterBold': require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  React.useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <ClerkProvider 
        publishableKey={CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <AuthLoader>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="course/[id]/index" options={{ headerShown: false }} />
            <Stack.Screen name="flashcard/[id]/index" options={{ headerShown: false }} />
            <Stack.Screen name="flashcard/[id]/study" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </AuthLoader>
      </ClerkProvider>
    </ThemeContext.Provider>
  );
}