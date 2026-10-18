import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import ArrowRight from "lucide-react-native/icons/arrow-right";
import CircleCheck from "lucide-react-native/icons/circle-check";
import CircleDashed from "lucide-react-native/icons/circle-dashed";
import { LessonBody } from "../../../../src/components/LessonBody";
import { TranscriptPanel } from "../../../../src/components/TranscriptPanel";
import { VideoPlayer } from "../../../../src/components/VideoPlayer";
import { AppIcon } from "../../../../src/components/AppIcon";
import { bundledCourses } from "../../../../src/lib/bundled-content";
import { courseLessons } from "../../../../src/lib/learning";
import { getLesson } from "../../../../src/lib/courses";
import { hasCompletedLesson, lessonProgressId, useProgress } from "../../../../src/lib/progress";

export function generateStaticParams() {
  return bundledCourses.flatMap(course =>
    course.modules.flatMap(module =>
      module.lessons.map(lesson => ({
        courseSlug: course.slug,
        lessonSlug: lesson.slug
      }))
    )
  );
}

export default function LessonScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const courseSlug = String(params.courseSlug ?? "");
  const lessonSlug = String(params.lessonSlug ?? "");
  const { data: lesson, isPending, error } = useQuery({
    queryKey: ["lesson", courseSlug, lessonSlug],
    queryFn: () => getLesson(courseSlug, lessonSlug),
    enabled: courseSlug.length > 0 && lessonSlug.length > 0
  });
  const { progress, isLoaded, storageError, toggleComplete, setLastOpened } = useProgress();
  useEffect(() => {
    if (
      lesson &&
      isLoaded &&
      (progress.lastCourse !== courseSlug || progress.lastLesson !== lessonSlug)
    ) {
      setLastOpened(courseSlug, lessonSlug);
    }
  }, [lesson, isLoaded, courseSlug, lessonSlug, progress.lastCourse, progress.lastLesson, setLastOpened]);

  if (isPending || error || !lesson) {
    return (
      <View style={styles.container}>
        <Text>{isPending ? "Loading lesson..." : error?.message ?? "Lesson not found"}</Text>
      </View>
    );
  }

  const variant =
    lesson.variants.find(item => item.isDefault) ?? lesson.variants[0];
  const transcript = lesson.transcripts[0];
  const course = bundledCourses.find(item => item.slug === courseSlug);
  const lessons = course ? courseLessons(course) : [];
  const lessonIndex = lessons.findIndex(item => item.slug === lessonSlug);
  const previousLesson = lessons[lessonIndex - 1];
  const nextLesson = lessons[lessonIndex + 1];
  const isCompleted = hasCompletedLesson(progress, courseSlug, lesson);

  return (
    <>
      <ScrollView contentContainerStyle={styles.content} style={styles.container}>
        <Pressable
          onPress={() => router.push(`/course/${courseSlug}`)}
          style={styles.courseBreadcrumb}
          accessibilityRole="button"
          accessibilityLabel={`Return to ${course?.title ?? "course"} overview`}
        >
          <AppIcon name="book" size={15} color="#52715c" />
          <Text style={styles.courseBreadcrumbText}>{course?.title ?? "Course overview"}</Text>
          <Text style={styles.lessonCounter}>
            {lessonIndex >= 0 ? `LESSON ${String(lessonIndex + 1).padStart(2, "0")} OF ${String(lessons.length).padStart(2, "0")}` : ""}
          </Text>
        </Pressable>
        <VideoPlayer title={lesson.title} videoUrl={variant?.videoUrl} />
        <LessonBody content={lesson.body} />
        {transcript ? <TranscriptPanel transcript={transcript} /> : null}

        <Pressable
          style={[styles.completeButton, isCompleted ? styles.completed : styles.incomplete]}
          onPress={() => toggleComplete(lessonProgressId(courseSlug, lessonSlug), lesson.id)}
          disabled={!isLoaded}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isCompleted, disabled: !isLoaded }}
        >
          {isCompleted
            ? <CircleCheck color="#fffefa" size={19} />
            : <CircleDashed color="#fffefa" size={19} />}
          <Text style={styles.completeText}>{isCompleted ? "Lesson complete" : "Mark lesson complete"}</Text>
        </Pressable>
        {!isLoaded ? <Text style={styles.loadingNotice}>Loading your saved progress…</Text> : null}
        {storageError ? <Text style={styles.storageError} accessibilityRole="alert">{storageError}</Text> : null}
        <View style={styles.lessonNavigation}>
          <Pressable
            onPress={() => previousLesson
              ? router.push(`/course/${courseSlug}/lesson/${previousLesson.slug}`)
              : router.push(`/course/${courseSlug}`)}
            style={[styles.navButton, styles.navPrevious]}
            accessibilityRole="button"
            accessibilityLabel={previousLesson ? `Previous lesson: ${previousLesson.title}` : "Return to course overview"}
          >
            <ArrowLeft color="#244b43" size={17} />
            <View style={styles.navCopy}>
              <Text style={styles.navCaption}>{previousLesson ? "PREVIOUS" : "OVERVIEW"}</Text>
              <Text style={styles.navTitle} numberOfLines={1}>{previousLesson?.title ?? "All lessons"}</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => nextLesson
              ? router.push(`/course/${courseSlug}/lesson/${nextLesson.slug}`)
              : router.push(`/course/${courseSlug}`)}
            style={[styles.navButton, styles.navNext]}
            accessibilityRole="button"
            accessibilityLabel={nextLesson ? `Next lesson: ${nextLesson.title}` : "Return to course overview"}
          >
            <View style={[styles.navCopy, styles.navCopyRight]}>
              <Text style={styles.navCaption}>{nextLesson ? "NEXT LESSON" : "FINISHED"}</Text>
              <Text style={styles.navTitle} numberOfLines={1}>{nextLesson?.title ?? "Course overview"}</Text>
            </View>
            <ArrowRight color="#244b43" size={17} />
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafb",
    flex: 1
  },
  content: {
    alignSelf: "center",
    maxWidth: 800,
    padding: 16,
    width: "100%"
  },
  courseBreadcrumb: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
    marginBottom: 14,
    minHeight: 30
  },
  courseBreadcrumbText: {
    color: "#52715c",
    flex: 1,
    fontSize: 12,
    fontWeight: "700"
  },
  lessonCounter: {
    color: "#829188",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8
  },
  completeButton: {
    alignItems: "center",
    borderRadius: 16,
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    marginTop: 24,
    padding: 16
  },
  incomplete: {
    backgroundColor: "#2563eb"
  },
  completed: {
    backgroundColor: "#16a34a"
  },
  completeText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  loadingNotice: {
    color: "#718179",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center"
  },
  storageError: {
    backgroundColor: "#fff0ec",
    borderRadius: 11,
    color: "#9b3a2b",
    fontSize: 12,
    marginTop: 9,
    padding: 11,
    textAlign: "center"
  },
  lessonNavigation: {
    flexDirection: "row",
    gap: 9,
    marginTop: 18
  },
  navButton: {
    alignItems: "center",
    backgroundColor: "#fffefa",
    borderColor: "#e4e9df",
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: 7,
    minHeight: 62,
    paddingHorizontal: 10,
    paddingVertical: 9
  },
  navPrevious: {
    justifyContent: "flex-start"
  },
  navNext: {
    justifyContent: "flex-end"
  },
  navCopy: {
    flex: 1
  },
  navCopyRight: {
    alignItems: "flex-end"
  },
  navCaption: {
    color: "#829188",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8
  },
  navTitle: {
    color: "#244b43",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 3
  }
});