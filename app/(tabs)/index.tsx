import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { ChevronRight, Award, BookOpen, Clock, Bell } from 'lucide-react-native';
import CourseCard from '@/components/CourseCard';

export default function DashboardScreen() {
  const router = useRouter();
  
  // Mock data - In a real app, this would come from an API
  const userName = "Captain Sarah";
  const nextQuiz = {
    id: "quiz1",
    title: "Radio Communications",
    course: "Private Pilot License",
    time: "Today, 2:00 PM",
  };
  
  const recentCourses = [
    {
      id: "c1",
      title: "Private Pilot License",
      description: "Essential knowledge for your PPL certification",
      imageUrl: "https://images.pexels.com/photos/76957/tree-top-view-palm-coconut-76957.jpeg",
      lessons: 24,
      duration: "18 hours",
      progress: 35,
    },
    {
      id: "c2",
      title: "Instrument Rating",
      description: "Master flying by instruments in all conditions",
      imageUrl: "https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg",
      lessons: 18,
      duration: "15 hours",
      progress: 12,
    },
  ];

  const stats = [
    {
      title: "Study Streak",
      value: "7 Days",
      icon: <Award size={22} color={Colors.primary[500]} />,
    },
    {
      title: "Courses",
      value: "4",
      icon: <BookOpen size={22} color={Colors.secondary[500]} />,
    },
    {
      title: "Study Time",
      value: "32 Hrs",
      icon: <Clock size={22} color={Colors.success[500]} />,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {userName}</Text>
          <Text style={styles.subGreeting}>Ready for today's study?</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={Colors.text.primary.light} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                {stat.icon}
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>

        {/* Next Quiz Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Next Quiz</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.quizCard}
          onPress={() => router.push(`/course/${nextQuiz.id}`)}
        >
          <View style={styles.quizInfo}>
            <Text style={styles.quizTitle}>{nextQuiz.title}</Text>
            <Text style={styles.quizCourse}>{nextQuiz.course}</Text>
          </View>
          <View style={styles.quizTimeContainer}>
            <Text style={styles.quizTime}>{nextQuiz.time}</Text>
            <ChevronRight size={20} color={Colors.primary[500]} />
          </View>
        </TouchableOpacity>

        {/* Continue Learning Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity onPress={() => router.push('/courses')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {recentCourses.map(course => (
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
        ))}

        {/* Recommended Flashcards */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Flashcards</Text>
          <TouchableOpacity onPress={() => router.push('/flashcards')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.flashcardPromo}
          onPress={() => router.push('/flashcards')}
        >
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/8297030/pexels-photo-8297030.jpeg' }}
            style={styles.flashcardImage}
          />
          <View style={styles.flashcardPromoContent}>
            <Text style={styles.flashcardPromoTitle}>Flight Regulations</Text>
            <Text style={styles.flashcardPromoSubtitle}>
              Review key regulations with our spaced repetition system
            </Text>
            <Text style={styles.flashcardPromoAction}>Study Now →</Text>
          </View>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
  },
  subGreeting: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
    marginTop: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xxl,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Layout.spacing.l,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background.light,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginHorizontal: Layout.spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    marginBottom: Layout.spacing.s,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: Colors.text.primary.light,
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'InterSemiBold',
    color: Colors.text.primary.light,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'InterMedium',
    color: Colors.primary[500],
  },
  quizCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background.light,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 16,
    fontFamily: 'InterSemiBold',
    color: Colors.text.primary.light,
    marginBottom: 4,
  },
  quizCourse: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
  },
  quizTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizTime: {
    fontSize: 14,
    fontFamily: 'InterMedium',
    color: Colors.primary[500],
    marginRight: Layout.spacing.xs,
  },
  flashcardPromo: {
    backgroundColor: Colors.background.light,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border.light,
    marginBottom: Layout.spacing.l,
  },
  flashcardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  flashcardPromoContent: {
    padding: Layout.spacing.m,
  },
  flashcardPromoTitle: {
    fontSize: 18,
    fontFamily: 'InterSemiBold',
    color: Colors.text.primary.light,
    marginBottom: 4,
  },
  flashcardPromoSubtitle: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: Colors.text.secondary.light,
    marginBottom: Layout.spacing.s,
  },
  flashcardPromoAction: {
    fontSize: 14,
    fontFamily: 'InterSemiBold',
    color: Colors.primary[500],
  },
});