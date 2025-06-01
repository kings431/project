import React, { useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Animated, 
  Platform
} from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import * as Haptics from 'expo-haptics';
import { Rotate3D } from 'lucide-react-native';
import Reanimated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  interpolate,
  Easing
} from 'react-native-reanimated';

const AnimatedView = Reanimated.createAnimatedComponent(View);

interface FlashcardProps {
  question: string;
  answer: string;
  onNext?: () => void;
  showControls?: boolean;
}

export default function Flashcard({
  question,
  answer,
  onNext,
  showControls = true,
}: FlashcardProps) {
  const flipValue = useSharedValue(0);
  const isFlipped = useRef(false);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateYValue = interpolate(
      flipValue.value,
      [0, 1],
      [0, 180]
    );
    
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateYValue}deg` }
      ],
      opacity: flipValue.value >= 0.5 ? 0 : 1,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateYValue = interpolate(
      flipValue.value,
      [0, 1],
      [180, 360]
    );
    
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateYValue}deg` }
      ],
      opacity: flipValue.value >= 0.5 ? 1 : 0,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backfaceVisibility: 'hidden',
    };
  });

  const flipCard = () => {
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    isFlipped.current = !isFlipped.current;
    flipValue.value = withTiming(
      isFlipped.current ? 1 : 0, 
      { duration: 400, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Front side (question) */}
        <AnimatedView style={[styles.card, styles.questionCard, frontAnimatedStyle]}>
          <Text style={styles.questionText}>{question}</Text>
          <View style={styles.flipHint}>
            <Rotate3D size={20} color={Colors.accent[400]} />
            <Text style={styles.flipHintText}>Tap to flip</Text>
          </View>
        </AnimatedView>

        {/* Back side (answer) */}
        <AnimatedView style={[styles.card, styles.answerCard, backAnimatedStyle]}>
          <Text style={styles.answerText}>{answer}</Text>
          <View style={styles.flipHint}>
            <Rotate3D size={20} color={Colors.accent[400]} />
            <Text style={styles.flipHintText}>Tap to flip back</Text>
          </View>
        </AnimatedView>

        {/* Card interaction area */}
        <TouchableOpacity 
          style={StyleSheet.absoluteFill} 
          onPress={flipCard}
          activeOpacity={1}
        />
      </View>

      {showControls && onNext && (
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.controlButton, styles.nextButton]}
            onPress={onNext}
          >
            <Text style={styles.nextButtonText}>Next Card</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '100%',
    height: 300,
    marginVertical: Layout.spacing.m,
    position: 'relative',
  },
  card: {
    flex: 1,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  questionCard: {
    backgroundColor: Colors.card.light,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  answerCard: {
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.text.primary.light,
    textAlign: 'center',
    lineHeight: 32,
  },
  answerText: {
    fontSize: 18,
    color: Colors.text.primary.light,
    textAlign: 'center',
    lineHeight: 28,
  },
  flipHint: {
    position: 'absolute',
    bottom: Layout.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flipHintText: {
    fontSize: 12,
    color: Colors.accent[400],
    marginLeft: Layout.spacing.xs,
  },
  controls: {
    flexDirection: 'row',
    marginTop: Layout.spacing.m,
  },
  controlButton: {
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.medium,
    minWidth: 150,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: Colors.primary[500],
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});