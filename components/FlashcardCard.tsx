import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Edit3, Trash2, ExternalLink } from 'lucide-react-native';

interface FlashcardDeckProps {
  id: string;
  title: string;
  cardCount: number;
  lastStudied: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function FlashcardCard({
  id,
  title,
  cardCount,
  lastStudied,
  onEdit,
  onDelete,
}: FlashcardDeckProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/flashcard/${id}`);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                style={styles.actionButton}
              >
                <Edit3 size={18} color={Colors.accent[500]} />
              </TouchableOpacity>
            )}
            
            {onDelete && (
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                style={styles.actionButton}
              >
                <Trash2 size={18} color={Colors.error[500]} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.infoRow}>
            <Text style={styles.cardCount}>{cardCount} cards</Text>
            {lastStudied ? (
              <Text style={styles.lastStudied}>
                Last studied: {lastStudied}
              </Text>
            ) : (
              <Text style={styles.notStudied}>Not studied yet</Text>
            )}
          </View>
          
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.studyButton}
              onPress={(e) => {
                e.stopPropagation();
                router.push(`/flashcard/${id}/study`);
              }}
            >
              <ExternalLink size={16} color={Colors.primary[500]} />
              <Text style={styles.studyButtonText}>Start Studying</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.m,
  },
  card: {
    backgroundColor: Colors.card.light,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary.light,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: Layout.spacing.xs,
    marginLeft: Layout.spacing.xs,
  },
  content: {},
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  cardCount: {
    fontSize: 14,
    color: Colors.text.secondary.light,
  },
  lastStudied: {
    fontSize: 12,
    color: Colors.text.secondary.light,
  },
  notStudied: {
    fontSize: 12,
    color: Colors.accent[400],
    fontStyle: 'italic',
  },
  footer: {
    alignItems: 'flex-end',
  },
  studyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.s,
  },
  studyButtonText: {
    marginLeft: Layout.spacing.xs,
    color: Colors.primary[500],
    fontWeight: '600',
  },
});