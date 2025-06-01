import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { ArrowLeft, Plus, Edit3, Trash2, PlayCircle } from 'lucide-react-native';
import CustomButton from '@/components/CustomButton';

// Mock flashcard data
const mockFlashcardDecks = {
  "d1": {
    id: "d1",
    title: "Aviation Regulations",
    cards: [
      { id: "c1", question: "What is the minimum safe altitude over congested areas?", answer: "1,000 feet above the highest obstacle within a horizontal radius of 2,000 feet." },
      { id: "c2", question: "What is the minimum required visibility for VFR flight in Class G airspace below 1,200 feet AGL during the day?", answer: "1 statute mile" },
      { id: "c3", question: "What does ATC stand for?", answer: "Air Traffic Control" },
      { id: "c4", question: "What is the purpose of ATIS?", answer: "Automatic Terminal Information Service provides continuous broadcast of recorded information in selected terminal areas." },
    ]
  },
  "d2": {
    id: "d2",
    title: "Aircraft Systems",
    cards: [
      { id: "c1", question: "What are the four forces acting on an aircraft in flight?", answer: "Lift, weight, thrust, and drag." },
      { id: "c2", question: "What instrument measures the rate of turn?", answer: "Turn coordinator" },
    ]
  },
  "d3": {
    id: "d3",
    title: "Navigation Fundamentals",
    cards: [
      { id: "c1", question: "What is a VOR?", answer: "Very High Frequency Omnidirectional Range - a type of radio navigation system for aircraft." },
    ]
  },
  "d4": {
    id: "d4",
    title: "Weather Patterns",
    cards: [
      { id: "c1", question: "What cloud type is associated with thunderstorms?", answer: "Cumulonimbus" },
    ]
  }
};

export default function FlashcardDeckScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [deck, setDeck] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [newCardQuestion, setNewCardQuestion] = useState('');
  const [newCardAnswer, setNewCardAnswer] = useState('');
  const [editingCard, setEditingCard] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, you would fetch the flashcard deck from an API
    // For now, we'll use mock data
    if (id && mockFlashcardDecks[id as keyof typeof mockFlashcardDecks]) {
      setDeck(mockFlashcardDecks[id as keyof typeof mockFlashcardDecks]);
    }
    setLoading(false);
  }, [id]);

  const handleStartStudy = () => {
    router.push(`/flashcard/${id}/study`);
  };

  const handleAddCard = () => {
    if (!newCardQuestion.trim() || !newCardAnswer.trim()) {
      setError('Please enter both a question and an answer');
      return;
    }
    
    // In a real app, you would call an API to add the card
    // For demonstration, we'll just update the local state
    const newCard = {
      id: `c${deck.cards.length + 1}`,
      question: newCardQuestion,
      answer: newCardAnswer,
    };
    
    setDeck({
      ...deck,
      cards: [...deck.cards, newCard],
    });
    
    // Reset form and close modal
    setNewCardQuestion('');
    setNewCardAnswer('');
    setError('');
    setShowAddCardModal(false);
  };

  const handleEditCard = () => {
    if (!newCardQuestion.trim() || !newCardAnswer.trim()) {
      setError('Please enter both a question and an answer');
      return;
    }
    
    // In a real app, you would call an API to update the card
    // For demonstration, we'll just update the local state
    const updatedCards = deck.cards.map((card: any) => 
      card.id === editingCard.id 
        ? { ...card, question: newCardQuestion, answer: newCardAnswer }
        : card
    );
    
    setDeck({
      ...deck,
      cards: updatedCards,
    });
    
    // Reset form and close modal
    setNewCardQuestion('');
    setNewCardAnswer('');
    setError('');
    setShowEditCardModal(false);
    setEditingCard(null);
  };

  const handleDeleteCard = (cardId: string) => {
    // In a real app, you would call an API to delete the card
    // For demonstration, we'll just update the local state
    const updatedCards = deck.cards.filter((card: any) => card.id !== cardId);
    
    setDeck({
      ...deck,
      cards: updatedCards,
    });
  };

  const openEditCardModal = (card: any) => {
    setEditingCard(card);
    setNewCardQuestion(card.question);
    setNewCardAnswer(card.answer);
    setShowEditCardModal(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
        <Text style={styles.loadingText}>Loading flashcards...</Text>
      </SafeAreaView>
    );
  }

  if (!deck) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Flashcard deck not found</Text>
        <TouchableOpacity onPress={() => router.push('/flashcards')}>
          <Text style={styles.backLink}>Go to Flashcards</Text>
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
        <Text style={styles.headerTitle} numberOfLines={1}>{deck.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.studyButton}
          onPress={handleStartStudy}
          disabled={deck.cards.length === 0}
        >
          <PlayCircle size={20} color="white" />
          <Text style={styles.studyButtonText}>Study</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.addCardButton}
          onPress={() => setShowAddCardModal(true)}
        >
          <Plus size={20} color={Colors.primary[500]} />
          <Text style={styles.addCardButtonText}>Add Card</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.cardCount}>
          {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {deck.cards.length > 0 ? (
          deck.cards.map((card: any, index: number) => (
            <View key={card.id} style={styles.cardItem}>
              <View style={styles.cardContent}>
                <Text style={styles.cardIndex}>{index + 1}</Text>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardQuestion} numberOfLines={2}>{card.question}</Text>
                  <Text style={styles.cardAnswer} numberOfLines={2}>{card.answer}</Text>
                </View>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.cardActionButton}
                  onPress={() => openEditCardModal(card)}
                >
                  <Edit3 size={18} color={Colors.accent[500]} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cardActionButton}
                  onPress={() => handleDeleteCard(card.id)}
                >
                  <Trash2 size={18} color={Colors.error[500]} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No Flashcards</Text>
            <Text style={styles.emptyStateDescription}>
              Add your first flashcard to start studying.
            </Text>
            <CustomButton
              title="Add Flashcard"
              onPress={() => setShowAddCardModal(true)}
              variant="primary"
              style={styles.emptyStateButton}
            />
          </View>
        )}
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        visible={showAddCardModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Flashcard</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => {
                  setShowAddCardModal(false);
                  setNewCardQuestion('');
                  setNewCardAnswer('');
                  setError('');
                }}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Text style={styles.inputLabel}>Question</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter question"
              value={newCardQuestion}
              onChangeText={setNewCardQuestion}
              multiline
            />

            <Text style={styles.inputLabel}>Answer</Text>
            <TextInput
              style={[styles.textInput, styles.textAreaInput]}
              placeholder="Enter answer"
              value={newCardAnswer}
              onChangeText={setNewCardAnswer}
              multiline
            />

            <View style={styles.modalActions}>
              <CustomButton 
                title="Cancel" 
                onPress={() => {
                  setShowAddCardModal(false);
                  setNewCardQuestion('');
                  setNewCardAnswer('');
                  setError('');
                }}
                variant="ghost"
                style={styles.modalButton}
              />
              <CustomButton 
                title="Add Card" 
                onPress={handleAddCard}
                variant="primary"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Card Modal */}
      <Modal
        visible={showEditCardModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Flashcard</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => {
                  setShowEditCardModal(false);
                  setNewCardQuestion('');
                  setNewCardAnswer('');
                  setError('');
                  setEditingCard(null);
                }}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Text style={styles.inputLabel}>Question</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter question"
              value={newCardQuestion}
              onChangeText={setNewCardQuestion}
              multiline
            />

            <Text style={styles.inputLabel}>Answer</Text>
            <TextInput
              style={[styles.textInput, styles.textAreaInput]}
              placeholder="Enter answer"
              value={newCardAnswer}
              onChangeText={setNewCardAnswer}
              multiline
            />

            <View style={styles.modalActions}>
              <CustomButton 
                title="Cancel" 
                onPress={() => {
                  setShowEditCardModal(false);
                  setNewCardQuestion('');
                  setNewCardAnswer('');
                  setError('');
                  setEditingCard(null);
                }}
                variant="ghost"
                style={styles.modalButton}
              />
              <CustomButton 
                title="Save Changes" 
                onPress={handleEditCard}
                variant="primary"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.light,
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
  headerTitle: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    padding: Layout.spacing.s,
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
    color: Colors.error[500],
    marginBottom: Layout.spacing.m,
    fontSize: 14,
    fontFamily: 'InterMedium',
  },
  backLink: {
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: Colors.primary[500],
    marginTop: Layout.spacing.m,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
  },
  studyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[500],
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    flex: 1,
    marginRight: Layout.spacing.s,
    justifyContent: 'center',
  },
  studyButtonText: {
    marginLeft: Layout.spacing.xs,
    color: 'white',
    fontFamily: 'InterSemiBold',
    fontSize: 14,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.primary[500],
    flex: 1,
    marginLeft: Layout.spacing.s,
    justifyContent: 'center',
  },
  addCardButtonText: {
    marginLeft: Layout.spacing.xs,
    color: Colors.primary[500],
    fontFamily: 'InterSemiBold',
    fontSize: 14,
  },
  infoContainer: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.m,
  },
  cardCount: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xxl,
  },
  cardItem: {
    flexDirection: 'row',
    backgroundColor: Colors.card.light,
    borderRadius: Layout.borderRadius.medium,
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  cardIndex: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: Colors.primary[500],
    marginRight: Layout.spacing.m,
    minWidth: 20,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardQuestion: {
    fontSize: 16,
    fontFamily: 'InterSemiBold',
    color: Colors.text.primary.light,
    marginBottom: Layout.spacing.xs,
  },
  cardAnswer: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
  },
  cardActions: {
    flexDirection: 'row',
  },
  cardActionButton: {
    padding: Layout.spacing.s,
    marginLeft: Layout.spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Layout.spacing.xxl,
    paddingHorizontal: Layout.spacing.xl,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'InterSemiBold',
    color: Colors.text.primary.light,
    marginBottom: Layout.spacing.s,
  },
  emptyStateDescription: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
    textAlign: 'center',
    marginBottom: Layout.spacing.l,
  },
  emptyStateButton: {
    marginTop: Layout.spacing.m,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.background.light,
    borderRadius: Layout.borderRadius.large,
    padding: Layout.spacing.l,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.l,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.accent[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: Colors.text.primary.light,
    marginBottom: Layout.spacing.s,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.m,
    fontSize: 16,
    fontFamily: 'InterRegular',
    marginBottom: Layout.spacing.l,
    minHeight: 56,
  },
  textAreaInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: Layout.spacing.s,
    minWidth: 100,
  },
});