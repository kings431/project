import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { Book, Clock } from 'lucide-react-native';
import Layout from '@/constants/Layout';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  lessons: number;
  duration: string;
  progress?: number;
}

export default function CourseCard({
  id,
  title,
  description,
  imageUrl,
  lessons,
  duration,
  progress,
}: CourseCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/course/${id}`);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>{description}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Book size={16} color={Colors.primary[200]} />
              <Text style={styles.metaText}>{lessons} lessons</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.primary[200]} />
              <Text style={styles.metaText}>{duration}</Text>
            </View>
          </View>
          
          {progress !== undefined && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBackground}>
                <View 
                  style={[styles.progressFill, { width: `${progress}%` }]} 
                />
              </View>
              <Text style={styles.progressText}>{progress}% complete</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  card: {
    position: 'relative',
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    backgroundColor: Colors.card.light,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  contentContainer: {
    padding: Layout.spacing.m,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary.light,
    marginBottom: Layout.spacing.xs,
  },
  description: {
    fontSize: 14,
    color: Colors.text.secondary.light,
    marginBottom: Layout.spacing.m,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.s,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  metaText: {
    fontSize: 12,
    color: Colors.text.secondary.light,
    marginLeft: Layout.spacing.xs,
  },
  progressContainer: {
    marginTop: Layout.spacing.s,
  },
  progressBackground: {
    height: 6,
    backgroundColor: Colors.accent[200],
    borderRadius: Layout.borderRadius.small,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary[500],
  },
  progressText: {
    fontSize: 12,
    color: Colors.text.secondary.light,
    marginTop: Layout.spacing.xs,
    alignSelf: 'flex-end',
  },
});