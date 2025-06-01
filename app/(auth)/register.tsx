import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import CustomButton from '@/components/CustomButton';
import { Lock, Mail, User, ArrowLeft } from 'lucide-react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { BlurView } from 'expo-blur';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { signUp, setActive } = useSignUp();

  const handleRegister = async () => {
    // Reset error state
    setError('');
    
    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!signUp || !setActive) {
      setError('Authentication service is not available');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Start the sign-up process
      const signUpResult = await signUp.create({
        emailAddress: email,
        password,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
      });

      if (!signUpResult) {
        throw new Error('Failed to create account');
      }

      // Set the session as active
      await setActive({ session: signUpResult.createdSessionId });

      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.errors?.[0]?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.text.primary.light} />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join our community of pilots</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <BlurView intensity={20} style={styles.glassContainer}>
            <View style={styles.inputContainer}>
              <User size={20} color={Colors.accent[500]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={Colors.accent[400]}
                value={name}
                onChangeText={setName}
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Mail size={20} color={Colors.accent[500]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.accent[400]}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color={Colors.accent[500]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.accent[400]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color={Colors.accent[500]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={Colors.accent[400]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <CustomButton
              title="Create Account"
              onPress={handleRegister}
              variant="primary"
              size="large"
              isLoading={isLoading}
              style={styles.button}
            />
          </BlurView>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: Layout.spacing.xl,
    paddingTop: Layout.spacing.xl,
  },
  header: {
    marginBottom: Layout.spacing.l,
  },
  backButton: {
    padding: Layout.spacing.xs,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
    marginBottom: Layout.spacing.l,
  },
  errorText: {
    color: Colors.error[500],
    marginBottom: Layout.spacing.m,
    fontSize: 14,
    fontFamily: 'InterMedium',
  },
  glassContainer: {
    borderRadius: Layout.borderRadius.large,
    padding: Layout.spacing.l,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Layout.borderRadius.medium,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
    height: 56,
  },
  inputIcon: {
    marginRight: Layout.spacing.s,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: Colors.text.primary.light,
  },
  button: {
    width: '100%',
    marginTop: Layout.spacing.m,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.xl,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'InterSemiBold',
    color: Colors.primary[500],
  },
});