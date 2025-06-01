import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { ArrowLeft, Clock, Book, CheckCircle2, LockKeyhole } from 'lucide-react-native';

// Mock course data
const mockCourses = {
  "c1": {
    id: "c1",
    title: "Private Pilot License",
    description: "Essential knowledge for your PPL certification. This comprehensive course covers all the topics required for the FAA Private Pilot written exam.",
    imageUrl: "https://images.pexels.com/photos/76957/tree-top-view-palm-coconut-76957.jpeg",
    lessons: 24,
    duration: "18 hours",
    progress: 35,
    instructor: "John Smith",
    rating: 4.8,
    reviews: 124,
    modules: [
      {
        id: "m1",
        title: "Introduction to Flying",
        description: "Learn the basics of aerodynamics and flight principles",
        duration: "45 minutes",
        completed: true,
        lessons: [
          { id: "l1", title: "The Four Forces of Flight", duration: "15 min", completed: true },
          { id: "l2", title: "Parts of an Aircraft", duration: "15 min", completed: true },
          { id: "l3", title: "How Airplanes Fly", duration: "15 min", completed: true },
        ]
      },
      {
        id: "m2",
        title: "Aviation Regulations",
        description: "Understanding FAA rules and airspace classifications",
        duration: "1.5 hours",
        completed: true,
        lessons: [
          { id: "l4", title: "FARs Introduction", duration: "20 min", completed: true },
          { id: "l5", title: "Airspace Classes", duration: "25 min", completed: true },
          { id: "l6", title: "Flight Rules & Regulations", duration: "25 min", completed: true },
          { id: "l7", title: "Required Documents", duration: "20 min", completed: true },
        ]
      },
      {
        id: "m3",
        title: "Weather Theory",
        description: "Understanding aviation weather and forecasting",
        duration: "2 hours",
        completed: false,
        lessons: [
          { id: "l8", title: "Weather Basics", duration: "20 min", completed: true },
          { id: "l9", title: "Weather Patterns", duration: "25 min", completed: true },
          { id: "l10", title: "Reading Weather Reports", duration: "30 min", completed: false },
          { id: "l11", title: "Weather Hazards", duration: "25 min", completed: false },
          { id: "l12", title: "Decision Making", duration: "20 min", completed: false },
        ]
      },
      {
        id: "m4",
        title: "Navigation",
        description: "Learn the fundamentals of aerial navigation",
        duration: "3 hours",
        completed: false,
        lessons: [
          { id: "l13", title: "Navigation Fundamentals", duration: "30 min", completed: false },
          { id: "l14", title: "Using Sectional Charts", duration: "35 min", completed: false },
          { id: "l15", title: "Flight Planning", duration: "40 min", completed: false },
          { id: "l16", title: "Navigation Systems", duration: "35 min", completed: false },
          { id: "l17", title: "Cross Country Flying", duration: "40 min", completed: false },
        ]
      },
    ]
  },
  "c2": {
    id: "c2",
    title: "Instrument Rating",
    description: "Master flying by instruments in all conditions",
    imageUrl: "https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg",
    lessons: 18,
    duration: "15 hours",
    progress: 12,
    instructor: "Emily Johnson",
    rating: 4.9,
    reviews: 86,
    modules: [
      {
        id: "m1",
        title: "Instrument Flight Rules",
        description: "Introduction to IFR flying",
        duration: "2 hours",
        completed: true,
        lessons: [
          { id: "l1", title: "IFR Regulations", duration: "30 min", completed: true },
          { id: "l2", title: "IFR Charts", duration: "30 min", completed: true },
          { id: "l3", title: "IFR Flight Planning", duration: "30 min", completed: true },
          { id: "l4", title: "Filing IFR Flight Plans", duration: "30 min", completed: true },
        ]
      },
    ]
  },
};

export default function CourseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  useEffect(() => {
    // In a real app, you would fetch the course from an API
    // For now, we'll use mock data
    if (id && mockCourses[id as keyof typeof mockCourses]) {
      setCourse(mockCourses[id as keyof typeof mockCourses]);
      // Expand the first module by default
      if (mockCourses[id as keyof typeof mockCourses].modules.length > 0) {
        setExpandedModules([mockCourses[id as keyof typeof mockCourses].modules[0].id]);
      }
    }
    setLoading(false);
  }, [id]);

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const calculateProgress = () => {
    if (!course) return 0;
    
    let totalLessons = 0;
    let completedLessons = 0;
    
    course.modules.forEach((module: any) => {
      module.lessons.forEach((lesson: any) => {
        totalLessons++;
        if (lesson.completed) {
          completedLessons++;
        }
      });
    });
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
        <Text style={styles.loadingText}>Loading course...</Text>
      </SafeAreaView>
    );
  }

  if (!course) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Course not found</Text>
        <TouchableOpacity onPress={() => router.push('/courses')}>
          <Text style={styles.backLink}>Go to Courses</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const progress = calculateProgress();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Header Image */}
      <View style={styles.headerImageContainer}>
        <Image
          source={{ uri: course.imageUrl }}
          style={styles.headerImage}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
          style={styles.headerGradient}
        />
        <SafeAreaView style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseDescription}>{course.description}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.text.secondary.light} />
              <Text style={styles.metaText}>{course.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Book size={16} color={Colors.text.secondary.light} />
              <Text style={styles.metaText}>{course.lessons} lessons</Text>
            </View>
          </View>
          
          <View style={styles.instructorRow}>
            <Text style={styles.instructorLabel}>Instructor:</Text>
            <Text style={styles.instructorName}>{course.instructor}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{course.rating}</Text>
              <Text style={styles.reviewCount}>({course.reviews} reviews)</Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Your Progress</Text>
              <Text style={styles.progressPercentage}>{progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${progress}%` }]} 
              />
            </View>
          </View>
        </View>
        
        {/* Course Content */}
        <View style={styles.courseContent}>
          <Text style={styles.contentTitle}>Course Content</Text>
          
          {course.modules.map((module: any, index: number) => (
            <View key={module.id} style={styles.moduleContainer}>
              <TouchableOpacity
                style={styles.moduleHeader}
                onPress={() => toggleModuleExpansion(module.id)}
              >
                <View style={styles.moduleHeaderLeft}>
                  <Text style={styles.moduleIndex}>{index + 1}</Text>
                  <View style={styles.moduleTitleContainer}>
                    <Text style={styles.moduleTitle}>{module.title}</Text>
                    <Text style={styles.moduleDetails}>
                      {module.lessons.length} lessons • {module.duration}
                    </Text>
                  </View>
                </View>
                {module.completed ? (
                  <CheckCircle2 size={22} color={Colors.success[500]} />
                ) : (
                  <Text style={styles.expandIndicator}>
                    {expandedModules.includes(module.id) ? '−' : '+'}
                  </Text>
                )}
              </TouchableOpacity>
              
              {expandedModules.includes(module.id) && (
                <View style={styles.lessonsList}>
                  {module.lessons.map((lesson: any, lessonIndex: number) => (
                    <TouchableOpacity 
                      key={lesson.id} 
                      style={styles.lessonItem}
                      onPress={() => {
                        // In a real app, navigate to the lesson
                      }}
                    >
                      <View style={styles.lessonLeftContent}>
                        {lesson.completed ? (
                          <CheckCircle2 size={20} color={Colors.success[500]} />
                        ) : (
                          <View style={styles.lessonIndex}>
                            <Text style={styles.lessonIndexText}>{lessonIndex + 1}</Text>
                          </View>
                        )}
                        <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      </View>
                      <View style={styles.lessonRightContent}>
                        <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                        {!module.completed && lessonIndex > 0 && !module.lessons[lessonIndex - 1].completed && (
                          <LockKeyhole size={16} color={Colors.accent[400]} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  headerImageContainer: {
    height: 240,
    width: '100%',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: Layout.spacing.l,
  },
  scrollView: {
    flex: 1,
    marginTop: -40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Colors.background.light,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.xxl,
  },
  courseInfo: {
    padding: Layout.spacing.xl,
  },
  courseTitle: {
    fontSize: 24,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
    marginBottom: Layout.spacing.s,
  },
  courseDescription: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
    marginBottom: Layout.spacing.m,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.m,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.l,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'InterMedium',
    color: Colors.text.secondary.light,
    marginLeft: Layout.spacing.xs,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.l,
  },
  instructorLabel: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
    marginRight: Layout.spacing.xs,
  },
  instructorName: {
    fontSize: 14,
    fontFamily: 'InterSemiBold',
    color: Colors.text.primary.light,
    marginRight: Layout.spacing.m,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'InterBold',
    color: Colors.primary[500],
  },
  reviewCount: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
    marginLeft: Layout.spacing.xs,
  },
  progressContainer: {
    marginBottom: Layout.spacing.m,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.s,
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: 'InterSemiBold',
    color: Colors.text.primary.light,
  },
  progressPercentage: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: Colors.primary[500],
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.accent[200],
    borderRadius: Layout.borderRadius.small,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary[500],
  },
  courseContent: {
    paddingHorizontal: Layout.spacing.l,
  },
  contentTitle: {
    fontSize: 20,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
    marginBottom: Layout.spacing.l,
  },
  moduleContainer: {
    marginBottom: Layout.spacing.m,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.m,
    backgroundColor: Colors.card.light,
  },
  moduleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moduleIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary[500],
    color: 'white',
    textAlign: 'center',
    lineHeight: 28,
    marginRight: Layout.spacing.m,
    fontFamily: 'InterBold',
    fontSize: 14,
  },
  moduleTitleContainer: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontFamily: 'InterSemiBold',
    color: Colors.text.primary.light,
    marginBottom: 2,
  },
  moduleDetails: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
  },
  expandIndicator: {
    fontSize: 24,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
  },
  lessonsList: {
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  lessonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  lessonLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonIndex: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accent[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  lessonIndexText: {
    color: Colors.text.primary.light,
    fontFamily: 'InterMedium',
    fontSize: 12,
  },
  lessonTitle: {
    fontSize: 14,
    fontFamily: 'InterMedium',
    color: Colors.text.primary.light,
    flex: 1,
    marginRight: Layout.spacing.s,
  },
  lessonRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonDuration: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
    marginRight: Layout.spacing.s,
  },
});