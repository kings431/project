import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import CustomButton from '@/components/CustomButton';
import { Mail, ArrowLeft } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    // Reset error state
    setError('');
    
    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setIsLoading(true);
      // In a real app, you would make an API call here
      // For demonstration, we'll simulate a successful request after a delay
      setTimeout(() => {
        setIsLoading(false);
        setSubmitted(true);
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      setError('Error sending reset email. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}
    >
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text.primary.light} />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Reset Password</Text>
        
        {!submitted ? (
          <>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you instructions to reset your password
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

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

            <CustomButton
              title="Send Reset Link"
              onPress={handleResetPassword}
              variant="primary"
              size="large"
              isLoading={isLoading}
              style={styles.button}
            />

            <TouchableOpacity 
              style={styles.backToLogin}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>Email Sent!</Text>
            <Text style={styles.successMessage}>
              We've sent password reset instructions to {email}. Please check your inbox.
            </Text>
            <CustomButton
              title="Back to Login"
              onPress={() => router.push('/login')}
              variant="outline"
              size="medium"
              style={styles.backButton}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    paddingHorizontal: Layout.spacing.xl,
    paddingTop: Platform.OS === 'ios' ? 60 : Layout.spacing.xl,
    marginBottom: Layout.spacing.l,
  },
  backButton: {
    padding: Layout.spacing.xs,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: Layout.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
    marginBottom: Layout.spacing.m,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
    marginBottom: Layout.spacing.xl,
  },
  errorText: {
    color: Colors.error[500],
    marginBottom: Layout.spacing.m,
    fontSize: 14,
    fontFamily: 'InterMedium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: Layout.borderRadius.medium,
    backgroundColor: 'white',
    paddingHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.l,
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
  },
  backToLogin: {
    marginTop: Layout.spacing.l,
    alignSelf: 'center',
  },
  backToLoginText: {
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: Colors.primary[500],
  },
  successContainer: {
    alignItems: 'center',
    paddingTop: Layout.spacing.xxl,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'InterBold',
    color: Colors.success[500],
    marginBottom: Layout.spacing.m,
  },
  successMessage: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
  },
});