import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import FlashcardCard from '@/components/FlashcardCard';
import { Plus, X, Search } from 'lucide-react-native';
import CustomButton from '@/components/CustomButton';

export default function FlashcardsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Mock data - In a real app, this would come from an API
  const flashcardDecks = [
    {
      id: "d1",
      title: "Aviation Regulations",
      cardCount: 42,
      lastStudied: "Yesterday",
    },
    {
      id: "d2",
      title: "Aircraft Systems",
      cardCount: 36,
      lastStudied: "3 days ago",
    },
    {
      id: "d3",
      title: "Navigation Fundamentals",
      cardCount: 28,
      lastStudied: null,
    },
    {
      id: "d4",
      title: "Weather Patterns",
      cardCount: 20,
      lastStudied: "1 week ago",
    },
  ];

  const filteredDecks = flashcardDecks.filter(deck => 
    deck.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateDeck = () => {
    if (!newDeckName.trim()) {
      setErrorMessage('Please enter a name for your flashcard deck');
      return;
    }
    
    // In a real app, you would make an API call here to create the deck
    // For now, we'll just close the modal and reset the state
    setShowCreateModal(false);
    setNewDeckName('');
    setErrorMessage('');
  };

  const handleEdit = (deckId: string) => {
    // In a real app, navigate to edit screen or show edit modal
    console.log(`Edit deck with ID: ${deckId}`);
  };

  const handleDelete = (deckId: string) => {
    // In a real app, show confirmation dialog and delete
    console.log(`Delete deck with ID: ${deckId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Flashcards</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Plus size={20} color="white" />
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.accent[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search flashcard decks..."
            placeholderTextColor={Colors.accent[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Flashcards List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredDecks.length > 0 ? (
          filteredDecks.map(deck => (
            <FlashcardCard
              key={deck.id}
              id={deck.id}
              title={deck.title}
              cardCount={deck.cardCount}
              lastStudied={deck.lastStudied}
              onEdit={() => handleEdit(deck.id)}
              onDelete={() => handleDelete(deck.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No Flashcard Decks Found</Text>
            <Text style={styles.emptyStateDescription}>
              {searchQuery 
                ? "Try adjusting your search to find what you're looking for."
                : "Create your first flashcard deck to start studying."}
            </Text>
            {!searchQuery && (
              <CustomButton 
                title="Create Flashcard Deck" 
                onPress={() => setShowCreateModal(true)}
                variant="primary"
                style={styles.emptyStateButton}
              />
            )}
          </View>
        )}
      </ScrollView>

      {/* Create Deck Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Flashcard Deck</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => {
                  setShowCreateModal(false);
                  setNewDeckName('');
                  setErrorMessage('');
                }}
              >
                <X size={24} color={Colors.text.primary.light} />
              </TouchableOpacity>
            </View>

            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Deck Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter deck name"
              value={newDeckName}
              onChangeText={setNewDeckName}
              autoFocus
            />

            <View style={styles.modalActions}>
              <CustomButton 
                title="Cancel" 
                onPress={() => {
                  setShowCreateModal(false);
                  setNewDeckName('');
                  setErrorMessage('');
                }}
                variant="ghost"
                style={styles.modalButton}
              />
              <CustomButton 
                title="Create Deck" 
                onPress={handleCreateDeck}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.l,
  },
  title: {
    fontSize: 28,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[500],
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
  },
  createButtonText: {
    marginLeft: Layout.spacing.xs,
    color: 'white',
    fontFamily: 'InterSemiBold',
    fontSize: 14,
  },
  searchContainer: {
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card.light,
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.m,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  searchIcon: {
    marginRight: Layout.spacing.s,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: Colors.text.primary.light,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xxl,
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
    width: '85%',
    maxWidth: 400,
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
    padding: Layout.spacing.xs,
  },
  errorMessage: {
    color: Colors.error[500],
    fontSize: 14,
    fontFamily: 'InterRegular',
    marginBottom: Layout.spacing.m,
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