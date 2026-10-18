import { useLocalSearchParams, useRouter } from "expo-router";
import CircleCheck from "lucide-react-native/icons/circle-check";
import CircleDashed from "lucide-react-native/icons/circle-dashed";
import MoveRight from "lucide-react-native/icons/move-right";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { AppIcon } from "../../../src/components/AppIcon";
import { BrandMark } from "../../../src/components/BrandMark";
import {
  bundledCourses,
  bundledSkillStages
} from "../../../src/lib/bundled-content";
import { courseLessons, getCourseProgress } from "../../../src/lib/learning";
import { hasCompletedLesson, lessonProgressId, useProgress } from "../../../src/lib/progress";

export function generateStaticParams() {
  return bundledCourses.map(course => ({ courseSlug: course.slug }));
}

export default function CourseScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const courseSlug = String(params.courseSlug ?? "");
  const course = bundledCourses.find(item => item.slug === courseSlug);
  const { progress, isLoaded, storageError, toggleComplete } = useProgress();
  if (!course) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundTitle}>Course not found</Text>
        <Text style={styles.notFoundText}>Lorem ipsum dolor sit amet.</Text>
        <Pressable style={styles.backButton} onPress={() => router.replace("/(tabs)/path")}>
          <Text style={styles.backButtonText}>Back to courses</Text>
        </Pressable>
      </View>
    );
  }

  const lessons = courseLessons(course);
  const stats = getCourseProgress(course, progress);
  const nextLesson = lessons.find(lesson => !hasCompletedLesson(progress, course.slug, lesson));
  const pathNode = bundledSkillStages.flatMap(stage => stage.nodes)
    .find(node => node.courseSlug === course.slug);
  const startingLesson = nextLesson ?? lessons[0];

  return (
    <>
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <View style={styles.brandLine}>
          <BrandMark />
        </View>
        <View style={styles.hero}>
          <Image
            source={{ uri: course.thumbnailUrl }}
            style={styles.cover}
            resizeMode="cover"
            accessibilityLabel={`${course.title} course artwork`}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            {pathNode ? (
              <View style={styles.skillBadge}>
                <AppIcon name={pathNode.icon} size={13} color="#fffefa" />
                <Text style={styles.skillBadgeText}>{pathNode.domain}</Text>
              </View>
            ) : null}
            <Text style={styles.heroTitle}>{course.title}</Text>
            <Text style={styles.heroDescription}>{course.description}</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.progressCaption}>YOUR COURSE PROGRESS</Text>
              <Text style={styles.progressValue}>{stats.completed} of {stats.total} lessons</Text>
            </View>
            <Text style={styles.percent}>{stats.percent}%</Text>
          </View>
          <View
            style={styles.progressTrack}
            accessibilityRole="progressbar"
            accessibilityLabel={`${course.title} progress`}
            accessibilityValue={{ min: 0, max: stats.total, now: stats.completed }}
          >
            <View style={[styles.progressFill, { width: `${stats.percent}%` }]} />
          </View>
          <Text style={styles.progressHint}>
            {stats.isComplete ? "Complete." : nextLesson ? `Next: ${nextLesson.title}` : "Lorem ipsum dolor sit amet."}
          </Text>
          {startingLesson ? (
            <Pressable
              style={styles.continueButton}
              onPress={() => router.push(`/course/${course.slug}/lesson/${startingLesson.slug}`)}
              accessibilityRole="button"
            >
              <Text style={styles.continueButtonText}>{stats.isComplete ? "Review" : nextLesson ? "Continue" : "Start"}</Text>
              <MoveRight color="#fffefa" size={17} />
            </Pressable>
          ) : null}
          {pathNode ? (
            <Pressable
              onPress={() => router.push("/(tabs)/path")}
              style={styles.treeLink}
              accessibilityRole="button"
            >
              <AppIcon name="map" size={15} color="#52715c" />
              <Text style={styles.treeLinkText}>Back to learning branches</Text>
            </Pressable>
          ) : null}
        </View>

        {!isLoaded ? <Text style={styles.storageNotice}>Loading saved progress…</Text> : null}
        {storageError ? <Text style={styles.storageError} accessibilityRole="alert">{storageError}</Text> : null}

        <View style={styles.lessonHeading}>
          <Text style={styles.sectionTitle}>Lessons</Text>
        </View>
        {course.modules.map(module => (
          <View key={module.id} style={styles.module}>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            {module.lessons.map(lesson => (
              <LessonProgressRow
                key={lesson.id}
                title={lesson.title}
                order={lessons.indexOf(lesson) + 1}
                total={lessons.length}
                isComplete={hasCompletedLesson(progress, course.slug, lesson)}
                isEnabled={isLoaded}
                onOpen={() => router.push(`/course/${course.slug}/lesson/${lesson.slug}`)}
                onToggle={() => toggleComplete(lessonProgressId(course.slug, lesson.slug), lesson.id)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
}

function LessonProgressRow({
  title,
  order,
  total,
  isComplete,
  isEnabled,
  onOpen,
  onToggle
}: {
  title: string;
  order: number;
  total: number;
  isComplete: boolean;
  isEnabled: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  return (
    <View style={[styles.lessonRow, isComplete ? styles.lessonRowComplete : null]}>
      <Pressable
        style={styles.lessonOpen}
        onPress={onOpen}
        accessibilityRole="button"
        accessibilityLabel={`Open lesson ${order} of ${total}: ${title}${isComplete ? ", completed" : ""}`}
      >
        <View style={[styles.lessonNumber, isComplete ? styles.lessonNumberComplete : null]}>
          {isComplete
            ? <CircleCheck color="#fffefa" size={18} />
            : <Text style={styles.lessonNumberText}>{String(order).padStart(2, "0")}</Text>}
        </View>
        <View style={styles.lessonCopy}>
          <Text style={styles.lessonTitle}>{title}</Text>
          <Text style={styles.lessonMeta}>LESSON {String(order).padStart(2, "0")} OF {String(total).padStart(2, "0")}</Text>
        </View>
        <MoveRight color="#87948b" size={17} />
      </Pressable>
      <Pressable
        onPress={onToggle}
        disabled={!isEnabled}
        style={[styles.completeButton, isComplete ? styles.completeButtonDone : null, !isEnabled ? styles.completeButtonDisabled : null]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isComplete, disabled: !isEnabled }}
        accessibilityLabel={`${isComplete ? "Mark incomplete" : "Mark complete"}: ${title}`}
      >
        {isComplete
          ? <CircleCheck color="#39745b" size={19} />
          : <CircleDashed color="#829188" size={19} />}
        <Text style={[styles.completeText, isComplete ? styles.completeTextDone : null]}>
          {isComplete ? "Done" : "Mark done"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f7f7f1",
    flex: 1
  },
  content: {
    alignSelf: "center",
    maxWidth: 760,
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 18,
    width: "100%"
  },
  brandLine: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  kicker: {
    color: "#7b8b81",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.1
  },
  hero: {
    backgroundColor: "#304d43",
    borderRadius: 24,
    height: 264,
    justifyContent: "flex-end",
    overflow: "hidden"
  },
  cover: {
    height: "100%",
    position: "absolute",
    width: "100%"
  },
  heroOverlay: {
    backgroundColor: "rgba(18, 42, 34, 0.72)",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  heroContent: {
    padding: 21
  },
  skillBadge: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.17)",
    borderRadius: 11,
    flexDirection: "row",
    gap: 6,
    marginBottom: 10,
    paddingHorizontal: 9,
    paddingVertical: 6
  },
  skillBadgeText: {
    color: "#fffefa",
    fontSize: 10,
    fontWeight: "700"
  },
  heroTitle: {
    color: "#fffefa",
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: -0.6,
    lineHeight: 31,
    maxWidth: 540
  },
  heroDescription: {
    color: "#e1e9df",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
    maxWidth: 560
  },
  progressCard: {
    backgroundColor: "#fffefa",
    borderColor: "#e4e9df",
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 14,
    padding: 17
  },
  progressTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  progressCaption: {
    color: "#829187",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1
  },
  progressValue: {
    color: "#1d342e",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 4
  },
  percent: {
    color: "#39745b",
    fontSize: 20,
    fontWeight: "800"
  },
  progressTrack: {
    backgroundColor: "#e9eee7",
    borderRadius: 5,
    height: 8,
    marginTop: 13,
    overflow: "hidden"
  },
  progressFill: {
    backgroundColor: "#39745b",
    borderRadius: 5,
    height: "100%"
  },
  progressHint: {
    color: "#718179",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8
  },
  continueButton: {
    alignItems: "center",
    backgroundColor: "#244b43",
    borderRadius: 13,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 13,
    minHeight: 48,
    paddingVertical: 13
  },
  continueButtonText: {
    color: "#fffefa",
    fontSize: 13,
    fontWeight: "800"
  },
  treeLink: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    minHeight: 48,
    marginTop: 13,
    padding: 4
  },
  treeLinkText: {
    color: "#52715c",
    fontSize: 12,
    fontWeight: "700"
  },
  storageNotice: {
    color: "#718179",
    fontSize: 12,
    marginTop: 14
  },
  storageError: {
    backgroundColor: "#fff0ec",
    borderRadius: 11,
    color: "#9b3a2b",
    fontSize: 12,
    marginTop: 12,
    padding: 11
  },
  lessonHeading: {
    marginBottom: 12,
    marginTop: 25
  },
  sectionTitle: {
    color: "#1d342e",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.4
  },
  module: {
    marginBottom: 19
  },
  moduleTitle: {
    color: "#52665b",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 9
  },
  lessonRow: {
    alignItems: "center",
    backgroundColor: "#fffefa",
    borderColor: "#e5e9e2",
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 8,
    minHeight: 75,
    paddingHorizontal: 11
  },
  lessonRowComplete: {
    backgroundColor: "#f4f8f2",
    borderColor: "#d7e6d7"
  },
  lessonOpen: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    minHeight: 72,
    paddingVertical: 9
  },
  lessonNumber: {
    alignItems: "center",
    backgroundColor: "#f0f2ec",
    borderRadius: 11,
    height: 34,
    justifyContent: "center",
    width: 34
  },
  lessonNumberComplete: {
    backgroundColor: "#39745b"
  },
  lessonNumberText: {
    color: "#63776b",
    fontSize: 11,
    fontWeight: "800"
  },
  lessonCopy: {
    flex: 1
  },
  lessonTitle: {
    color: "#263b33",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18
  },
  lessonMeta: {
    color: "#849188",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginTop: 4
  },
  completeButton: {
    alignItems: "center",
    borderLeftColor: "#edf0e9",
    borderLeftWidth: 1,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    marginLeft: 7,
    minHeight: 48,
    paddingLeft: 9,
    paddingRight: 2
  },
  completeButtonDone: {
    borderLeftColor: "#dce9dc"
  },
  completeButtonDisabled: {
    opacity: 0.55
  },
  completeText: {
    color: "#75847b",
    fontSize: 10,
    fontWeight: "700"
  },
  completeTextDone: {
    color: "#39745b"
  },
  notFound: {
    alignItems: "center",
    backgroundColor: "#f7f7f1",
    flex: 1,
    justifyContent: "center",
    padding: 24
  },
  notFoundTitle: {
    color: "#1d342e",
    fontSize: 22,
    fontWeight: "800"
  },
  notFoundText: {
    color: "#718179",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    textAlign: "center"
  },
  backButton: {
    backgroundColor: "#244b43",
    borderRadius: 13,
    marginTop: 17,
    paddingHorizontal: 18,
    paddingVertical: 13
  },
  backButtonText: {
    color: "#fffefa",
    fontSize: 13,
    fontWeight: "700"
  }
});
