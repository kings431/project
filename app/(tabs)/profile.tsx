import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import {
  Settings,
  HelpCircle,
  LogOut,
  User,
  Bell,
  Moon,
  ChevronRight,
} from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  
  // Mock user data - In a real app, this would come from an API
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    pilot_type: "Commercial Pilot",
    study_hours: 32,
    courses_completed: 3,
    flashcards_created: 120,
    profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg', // Ensure this is a valid URL
  };

  const defaultProfileImage = 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg'; // Example aviation image

  useEffect(() => {
    // Apply dark mode styles or logic here
    // For example, you can use a theme context or directly apply styles
    if (isDarkMode) {
      // Apply dark mode styles
    } else {
      // Apply light mode styles
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await signOut();
      console.log('Sign out successful, redirecting to login...');
      setTimeout(() => {
        router.replace('/login');
      }, 1000);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const toggleDarkMode = () => setIsDarkMode(previous => !previous);
  const toggleNotifications = () => setNotifications(previous => !previous);

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.background.dark : Colors.background.light,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Layout.spacing.xl,
      paddingVertical: Layout.spacing.l,
    },
    title: {
      fontSize: 28,
      fontFamily: 'InterBold',
      color: isDarkMode ? Colors.text.primary.dark : Colors.text.primary.light,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: Layout.spacing.l,
      paddingBottom: Layout.spacing.xxl,
    },
    profileCard: {
      backgroundColor: isDarkMode ? Colors.card.dark : Colors.card.light,
      borderRadius: Layout.borderRadius.large,
      padding: Layout.spacing.l,
      marginBottom: Layout.spacing.l,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 2,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Layout.spacing.m,
    },
    profileImage: {
      width: 70,
      height: 70,
      borderRadius: 35,
      marginRight: Layout.spacing.m,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 22,
      fontFamily: 'InterBold',
      color: isDarkMode ? Colors.text.primary.dark : Colors.text.primary.light,
      marginBottom: 4,
    },
    profileType: {
      fontSize: 16,
      fontFamily: 'InterRegular',
      color: isDarkMode ? Colors.text.secondary.dark : Colors.text.secondary.light,
    },
    editProfileButton: {
      backgroundColor: isDarkMode ? Colors.background.dark : Colors.background.light,
      borderWidth: 1,
      borderColor: Colors.primary[500],
      borderRadius: Layout.borderRadius.medium,
      paddingVertical: Layout.spacing.s,
      alignItems: 'center',
      marginBottom: Layout.spacing.m,
    },
    editProfileButtonText: {
      color: Colors.primary[500],
      fontFamily: 'InterSemiBold',
      fontSize: 14,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statBorder: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: isDarkMode ? Colors.border.dark : Colors.border.light,
    },
    statValue: {
      fontSize: 20,
      fontFamily: 'InterBold',
      color: isDarkMode ? Colors.text.primary.dark : Colors.text.primary.light,
      marginBottom: 2,
    },
    statLabel: {
      fontSize: 12,
      fontFamily: 'InterRegular',
      color: isDarkMode ? Colors.text.secondary.dark : Colors.text.secondary.light,
    },
    section: {
      marginBottom: Layout.spacing.l,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'InterSemiBold',
      color: isDarkMode ? Colors.text.primary.dark : Colors.text.primary.light,
      marginBottom: Layout.spacing.m,
    },
    settingsCard: {
      backgroundColor: isDarkMode ? Colors.card.dark : Colors.card.light,
      borderRadius: Layout.borderRadius.large,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 2,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Layout.spacing.m,
      paddingHorizontal: Layout.spacing.l,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Layout.spacing.m,
    },
    iconPrimary: {
      backgroundColor: Colors.primary[500],
    },
    iconSecondary: {
      backgroundColor: Colors.secondary[500],
    },
    iconDark: {
      backgroundColor: Colors.accent[900],
    },
    iconWarning: {
      backgroundColor: Colors.warning[500],
    },
    iconDanger: {
      backgroundColor: Colors.error[500],
    },
    settingText: {
      fontSize: 16,
      fontFamily: 'InterMedium',
      color: isDarkMode ? Colors.text.primary.dark : Colors.text.primary.light,
    },
    logoutText: {
      color: Colors.error[500],
    },
    borderTop: {
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? Colors.border.dark : Colors.border.light,
    },
    versionText: {
      textAlign: 'center',
      fontSize: 12,
      fontFamily: 'InterRegular',
      color: isDarkMode ? Colors.text.secondary.dark : Colors.text.secondary.light,
      marginTop: Layout.spacing.m,
      marginBottom: Layout.spacing.xxl,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => {}}>
          <Settings size={24} color={Colors.text.primary.light} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
              onError={(e) => console.error('Error loading image:', e.nativeEvent.error)}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileType}>{user.pilot_type}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => {}}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.study_hours}</Text>
              <Text style={styles.statLabel}>Study Hours</Text>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
              <Text style={styles.statValue}>{user.courses_completed}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.flashcards_created}</Text>
              <Text style={styles.statLabel}>Flashcards</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, styles.iconDark]}>
                  <Moon size={18} color="white" />
                </View>
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: Colors.border.light, true: Colors.primary[300] }}
                thumbColor={isDarkMode ? Colors.primary[500] : 'white'}
                ios_backgroundColor={Colors.border.light}
              />
            </View>
            
            <View style={[styles.settingItem, styles.borderTop]}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, styles.iconWarning]}>
                  <Bell size={18} color="white" />
                </View>
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={toggleNotifications}
                trackColor={{ false: Colors.border.light, true: Colors.primary[300] }}
                thumbColor={notifications ? Colors.primary[500] : 'white'}
                ios_backgroundColor={Colors.border.light}
              />
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.settingsCard}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => {}}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, styles.iconPrimary]}>
                  <User size={18} color="white" />
                </View>
                <Text style={styles.settingText}>Account Details</Text>
              </View>
              <ChevronRight size={18} color={Colors.accent[500]} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.settingItem, styles.borderTop]}
              onPress={() => {}}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, styles.iconSecondary]}>
                  <HelpCircle size={18} color="white" />
                </View>
                <Text style={styles.settingText}>Help & Support</Text>
              </View>
              <ChevronRight size={18} color={Colors.accent[500]} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.settingItem, styles.borderTop]}
              onPress={handleLogout}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, styles.iconDanger]}>
                  <LogOut size={18} color="white" />
                </View>
                <Text style={[styles.settingText, styles.logoutText]}>Log Out</Text>
              </View>
              <ChevronRight size={18} color={Colors.accent[500]} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.versionText}>AviatorStudy v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}