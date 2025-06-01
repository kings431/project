import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import CourseCard from '@/components/CourseCard';
import { Search, Filter } from 'lucide-react-native';

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Mock data - In a real app, this would come from an API
  const courses = [
    {
      id: "c1",
      title: "Private Pilot License",
      description: "Essential knowledge for your PPL certification",
      imageUrl: "https://images.pexels.com/photos/76957/tree-top-view-palm-coconut-76957.jpeg",
      lessons: 24,
      duration: "18 hours",
      progress: 35,
      category: "certification",
    },
    {
      id: "c2",
      title: "Instrument Rating",
      description: "Master flying by instruments in all conditions",
      imageUrl: "https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg",
      lessons: 18,
      duration: "15 hours",
      progress: 12,
      category: "rating",
    },
    {
      id: "c3",
      title: "Commercial Pilot",
      description: "Advanced skills for professional pilots",
      imageUrl: "https://images.pexels.com/photos/1098524/pexels-photo-1098524.jpeg",
      lessons: 32,
      duration: "25 hours",
      category: "certification",
    },
    {
      id: "c4",
      title: "Aviation Weather",
      description: "Understanding weather patterns and forecasts",
      imageUrl: "https://images.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg",
      lessons: 12,
      duration: "8 hours",
      category: "knowledge",
    },
    {
      id: "c5",
      title: "Flight Navigation",
      description: "Essential navigation techniques for pilots",
      imageUrl: "https://images.pexels.com/photos/1266196/pexels-photo-1266196.jpeg",
      lessons: 16,
      duration: "12 hours",
      category: "knowledge",
    },
  ];

  const filters = [
    { id: 'all', label: 'All Courses' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'certification', label: 'Certifications' },
    { id: 'rating', label: 'Ratings' },
    { id: 'knowledge', label: 'Knowledge' },
  ];

  const filteredCourses = courses.filter(course => {
    // Apply search query filter
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = activeFilter === 'all' || 
                          (activeFilter === 'in-progress' && course.progress !== undefined) ||
                          course.category === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Aviation Courses</Text>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.accent[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            placeholderTextColor={Colors.accent[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.text.primary.light} />
        </TouchableOpacity>
      </View>
      
      {/* Category Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterPill,
                activeFilter === filter.id && styles.activeFilterPill
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text 
                style={[
                  styles.filterPillText,
                  activeFilter === filter.id && styles.activeFilterPillText
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Courses List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              lessons={course.lessons}
              duration={course.duration}
              progress={course.progress}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No Courses Found</Text>
            <Text style={styles.emptyStateDescription}>
              Try adjusting your search or filters to find what you're looking for.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.l,
  },
  title: {
    fontSize: 28,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  searchInputContainer: {
    flex: 1,
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
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.card.light,
    borderRadius: Layout.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.s,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  filtersContainer: {
    marginBottom: Layout.spacing.m,
  },
  filtersContent: {
    paddingHorizontal: Layout.spacing.l,
  },
  filterPill: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.round,
    backgroundColor: Colors.background.light,
    marginRight: Layout.spacing.s,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  activeFilterPill: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  filterPillText: {
    fontSize: 14,
    fontFamily: 'InterMedium',
    color: Colors.text.secondary.light,
  },
  activeFilterPillText: {
    color: 'white',
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
  },
});