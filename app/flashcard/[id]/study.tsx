import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Flashcard from '@/components/Flashcard';
import { ArrowLeft, Flag, Check, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Mock flashcard data
const mockFlashcards = {
  "d1": [
    { id: "1", question: "What is the minimum safe altitude over congested areas?", answer: "1,000 feet above the highest obstacle within a horizontal radius of 2,000 feet." },
    { id: "2", question: "What is the minimum required visibility for VFR flight in Class G airspace below 1,200 feet AGL during the day?", answer: "1 statute mile" },
    { id: "3", question: "What does ATC stand for?", answer: "Air Traffic Control" },
    { id: "4", question: "What is the purpose of ATIS?", answer: "Automatic Terminal Information Service provides continuous broadcast of recorded information in selected terminal areas." },
  ],
  "d2": [
    { id: "1", question: "What are the four forces acting on an aircraft in flight?", answer: "Lift, weight, thrust, and drag." },
    { id: "2", question: "What instrument measures the rate of turn?", answer: "Turn coordinator" },
  ],
  "d3": [
    { id: "1", question: "What is a VOR?", answer: "Very High Frequency Omnidirectional Range - a type of radio navigation system for aircraft." },
  ],
  "d4": [
    { id: "1", question: "What cloud type is associated with thunderstorms?", answer: "Cumulonimbus" },
  ],
};

export default function FlashcardStudyScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, flagged: 0 });

  useEffect(() => {
    // In a real app, you would fetch the flashcards from an API
    // For now, we'll use mock data
    if (id && mockFlashcards[id as keyof typeof mockFlashcards]) {
      setFlashcards(mockFlashcards[id as keyof typeof mockFlashcards]);
    }
    setLoading(false);
  }, [id]);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleCorrect = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    handleNext();
  };

  const handleIncorrect = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    handleNext();
  };

  const handleFlag = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setStats(prev => ({ ...prev, flagged: prev.flagged + 1 }));
    handleNext();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
        <Text style={styles.loadingText}>Loading flashcards...</Text>
      </SafeAreaView>
    );
  }

  if (!id || flashcards.length === 0) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>No flashcards found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text.primary.light} />
        </TouchableOpacity>
        <Text style={styles.progress}>
          {completed 
            ? "Completed" 
            : `${currentIndex + 1} of ${flashcards.length}`
          }
        </Text>
      </View>

      {!completed ? (
        <View style={styles.content}>
          <Flashcard
            question={flashcards[currentIndex].question}
            answer={flashcards[currentIndex].answer}
            showControls={false}
          />

          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={[styles.controlButton, styles.incorrectButton]}
              onPress={handleIncorrect}
            >
              <X size={24} color="white" />
              <Text style={styles.controlButtonText}>Incorrect</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.flagButton]}
              onPress={handleFlag}
            >
              <Flag size={24} color="white" />
              <Text style={styles.controlButtonText}>Flag</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.correctButton]}
              onPress={handleCorrect}
            >
              <Check size={24} color="white" />
              <Text style={styles.controlButtonText}>Correct</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.completedContainer}>
          <Text style={styles.completedTitle}>Study Session Complete!</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, styles.correctIcon]}>
                <Check size={24} color="white" />
              </View>
              <Text style={styles.statValue}>{stats.correct}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, styles.incorrectIcon]}>
                <X size={24} color="white" />
              </View>
              <Text style={styles.statValue}>{stats.incorrect}</Text>
              <Text style={styles.statLabel}>Incorrect</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, styles.flaggedIcon]}>
                <Flag size={24} color="white" />
              </View>
              <Text style={styles.statValue}>{stats.flagged}</Text>
              <Text style={styles.statLabel}>Flagged</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.restartButton}
            onPress={() => {
              setCurrentIndex(0);
              setCompleted(false);
              setStats({ correct: 0, incorrect: 0, flagged: 0 });
            }}
          >
            <Text style={styles.restartButtonText}>Restart Study Session</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.backToDecksButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backToDecksText}>Back to Flashcard Deck</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.light,
  },
  loadingText: {
    marginTop: Layout.spacing.m,
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: Colors.text.secondary.light,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'InterSemiBold',
    color: Colors.text.primary.light,
    marginBottom: Layout.spacing.m,
  },
  backLink: {
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: Colors.primary[500],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  backButton: {
    padding: Layout.spacing.s,
  },
  progress: {
    fontSize: 16,
    fontFamily: 'InterSemiBold',
    color: Colors.text.secondary.light,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.l,
    justifyContent: 'space-between',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xl,
  },
  controlButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: Layout.borderRadius.large,
    padding: Layout.spacing.m,
  },
  incorrectButton: {
    backgroundColor: Colors.error[500],
  },
  flagButton: {
    backgroundColor: Colors.warning[500],
  },
  correctButton: {
    backgroundColor: Colors.success[500],
  },
  controlButtonText: {
    color: 'white',
    fontFamily: 'InterSemiBold',
    marginTop: Layout.spacing.s,
    textAlign: 'center',
  },
  completedContainer: {
    flex: 1,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedTitle: {
    fontSize: 24,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: Layout.spacing.xxl,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  correctIcon: {
    backgroundColor: Colors.success[500],
  },
  incorrectIcon: {
    backgroundColor: Colors.error[500],
  },
  flaggedIcon: {
    backgroundColor: Colors.warning[500],
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
  },
  restartButton: {
    backgroundColor: Colors.primary[500],
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.l,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'InterSemiBold',
    textAlign: 'center',
  },
  backToDecksButton: {
    paddingVertical: Layout.spacing.s,
  },
  backToDecksText: {
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: Colors.primary[500],
    textAlign: 'center',
  },
});