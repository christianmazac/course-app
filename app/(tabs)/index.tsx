import { useRouter } from "expo-router";
import ArrowRight from "lucide-react-native/icons/arrow-right";
import Map from "lucide-react-native/icons/map";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { BrandMark } from "../../src/components/BrandMark";
import { CourseCard } from "../../src/components/CourseCard";
import { getBundledCourses, getCourses } from "../../src/lib/courses";
import { getCourseProgress } from "../../src/lib/learning";
import { useProgress } from "../../src/lib/progress";
import { bundledSkillStages } from "../../src/lib/bundled-content";

export default function HomeScreen() {
  const router = useRouter();
  const { data: courses = [], isPending, error, refetch, isRefetching } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    initialData: getBundledCourses(),
    initialDataUpdatedAt: 0
  });
  const { progress, isLoaded } = useProgress();
  const mappedSlugs = new Set(bundledSkillStages.flatMap(stage => stage.nodes.map(node => node.courseSlug)));
  const skillCourses = courses.filter(course => mappedSlugs.has(course.slug));
  const completedPaths = skillCourses.filter(course => getCourseProgress(course, progress).isComplete).length;
  const completedLessons = skillCourses.reduce((total, course) => total + getCourseProgress(course, progress).completed, 0);
  const latestCourse = courses.find(course => course.slug === progress.lastCourse);
  const lastLesson = latestCourse?.modules
    .flatMap(module => module.lessons)
    .find(lesson => lesson.slug === progress.lastLesson);
  const suggestedNode = bundledSkillStages.flatMap(stage => stage.nodes)
    .find(node => {
      const course = courses.find(item => item.slug === node.courseSlug);
      if (!course || getCourseProgress(course, progress).isComplete) {
        return false;
      }
      return node.prerequisites.every(prerequisite => {
      const prerequisiteNode = bundledSkillStages.flatMap(item => item.nodes)
        .find(item => item.slug === prerequisite);
      const prerequisiteCourse = prerequisiteNode
        ? courses.find(course => course.slug === prerequisiteNode.courseSlug)
        : undefined;
      return prerequisiteCourse ? getCourseProgress(prerequisiteCourse, progress).isComplete : false;
      });
    });

  return (
    <View style={styles.page}>
      {courses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            {isPending ? "Loading your courses…" : error ? error.message : "No courses are available yet."}
          </Text>
          {error ? (
            <Pressable disabled={isRefetching} onPress={() => refetch()}>
              <Text style={styles.retryText}>{isRefetching ? "Retrying…" : "Try again"}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.topline}>
              <BrandMark />
              <View style={styles.growthBadge}>
              <Map size={14} color="#52715c" />
              <Text style={styles.growthBadgeText}>{skillCourses.length} courses</Text>
              </View>
            </View>
            <View style={styles.welcome}>
              <Text style={styles.eyebrow}>COURSES</Text>
              <Text style={styles.title}>Browse courses.</Text>
              <Text style={styles.subtitle}>
                Lorem ipsum dolor sit amet.
              </Text>
              <Pressable
                style={styles.pathButton}
                onPress={() => router.push("/(tabs)/path")}
                accessibilityRole="button"
              >
                <Text style={styles.pathButtonText}>View learning branches</Text>
                <ArrowRight size={17} color="#fffefa" />
              </Pressable>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{isLoaded ? completedPaths : "—"}</Text>
                <Text style={styles.statLabel}>COURSES COMPLETED</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{isLoaded ? completedLessons : "—"}</Text>
                <Text style={styles.statLabel}>LESSONS COMPLETED</Text>
              </View>
            </View>

            {isLoaded && latestCourse && lastLesson ? (
              <Pressable
                style={styles.continueCard}
                onPress={() => router.push(`/course/${latestCourse.slug}/lesson/${lastLesson.slug}`)}
                accessibilityRole="button"
                accessibilityLabel={`Continue ${latestCourse.title}: ${lastLesson.title}`}
              >
                <View style={styles.continueCopy}>
                  <Text style={styles.continueEyebrow}>CONTINUE</Text>
                  <Text style={styles.continueTitle}>{lastLesson.title}</Text>
                </View>
                <ArrowRight color="#52715c" size={18} />
              </Pressable>
            ) : null}

            {suggestedNode ? (
              <Pressable
                style={styles.suggestedCard}
                onPress={() => router.push(`/course/${suggestedNode.courseSlug}`)}
                accessibilityRole="button"
              >
                <View style={styles.suggestedCopy}>
                  <Text style={styles.suggestedEyebrow}>COURSE</Text>
                  <Text style={styles.suggestedTitle}>{suggestedNode.title}</Text>
                </View>
                <ArrowRight size={18} color="#fffefa" />
              </Pressable>
            ) : null}

            <View style={styles.courseHeading}>
              <View>
                <Text style={styles.sectionTitle}>Explore courses</Text>
                <Text style={styles.sectionSubtitle}>Lorem ipsum dolor sit amet.</Text>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <CourseCard
            title={item.title}
            description={item.description}
            thumbnailUrl={item.thumbnailUrl}
            onPress={() => router.push(`/course/${item.slug}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f7f7f1",
    flex: 1
  },
  list: {
    alignSelf: "center",
    maxWidth: 800,
    paddingBottom: 30,
    paddingHorizontal: 18,
    paddingTop: 18,
    width: "100%"
  },
  topline: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18
  },
  growthBadge: {
    alignItems: "center",
    backgroundColor: "#e8f1eb",
    borderRadius: 16,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 8
  },
  growthBadgeText: {
    color: "#52715c",
    fontSize: 11,
    fontWeight: "800"
  },
  welcome: {
    backgroundColor: "#e9efe6",
    borderColor: "#dce7dc",
    borderRadius: 26,
    borderWidth: 1,
    padding: 21
  },
  eyebrow: {
    color: "#668075",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.3
  },
  title: {
    color: "#1d342e",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.9,
    lineHeight: 37,
    marginTop: 9,
    maxWidth: 500
  },
  subtitle: {
    color: "#61726a",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
    maxWidth: 580
  },
  pathButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#244b43",
    borderRadius: 13,
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  pathButtonText: {
    color: "#fffefa",
    fontSize: 12,
    fontWeight: "800"
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12
  },
  statCard: {
    backgroundColor: "#fffefa",
    borderColor: "#e4e9df",
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    padding: 14
  },
  statValue: {
    color: "#244b43",
    fontSize: 22,
    fontWeight: "800"
  },
  statLabel: {
    color: "#829188",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginTop: 3
  },
  continueCard: {
    alignItems: "center",
    backgroundColor: "#fffefa",
    borderColor: "#dce7dc",
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: "row",
    gap: 11,
    marginTop: 12,
    padding: 13
  },
  continueCopy: {
    flex: 1
  },
  continueEyebrow: {
    color: "#829188",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.7
  },
  continueTitle: {
    color: "#243b32",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 3
  },
  suggestedCard: {
    alignItems: "center",
    backgroundColor: "#39745b",
    borderRadius: 17,
    flexDirection: "row",
    gap: 12,
    marginTop: 11,
    padding: 15
  },
  suggestedCopy: {
    flex: 1
  },
  suggestedEyebrow: {
    color: "#d2e4d4",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8
  },
  suggestedTitle: {
    color: "#fffefa",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 4
  },
  courseHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
    marginTop: 25
  },
  sectionTitle: {
    color: "#1d342e",
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: -0.4
  },
  sectionSubtitle: {
    color: "#718179",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: "#f7f7f1",
    paddingHorizontal: 24,
    paddingVertical: 48
  },
  emptyText: {
    color: "#4b5f54",
    fontSize: 15,
    textAlign: "center"
  },
  retryText: {
    color: "#244b43",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 12
  }
});
