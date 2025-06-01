import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Chrome as Home, BookOpen, Layers, User } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/app/_layout';

export default function TabLayout() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? Colors.primary[300] : Colors.primary[500],
        tabBarInactiveTintColor: isDarkMode ? Colors.accent[300] : Colors.accent[400],
        tabBarLabelStyle: {
          fontFamily: 'InterMedium',
          fontSize: 12,
          marginBottom: 4,
        },
        tabBarStyle: {
          height: 80,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          borderTopColor: isDarkMode ? Colors.border.dark : Colors.border.light,
          backgroundColor: isDarkMode ? Colors.background.dark : Colors.background.light,
          opacity: 0.9,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="flashcards"
        options={{
          title: 'Flashcards',
          tabBarIcon: ({ color }) => <Layers size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}