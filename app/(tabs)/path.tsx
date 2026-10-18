import { useRouter } from "expo-router";
import LockKeyhole from "lucide-react-native/icons/lock-keyhole";
import MoveDownRight from "lucide-react-native/icons/move-down-right";
import { ScrollView, StyleSheet, Text, Pressable, View } from "react-native";
import { AppIcon } from "../../src/components/AppIcon";
import { BrandMark } from "../../src/components/BrandMark";
import { bundledCourses, bundledSkillStages } from "../../src/lib/bundled-content";
import { getCourseProgress } from "../../src/lib/learning";
import { useProgress } from "../../src/lib/progress";
import type { SkillNode } from "../../src/types";

const nodesBySlug = new Map(
  bundledSkillStages.flatMap(stage => stage.nodes).map(node => [node.slug, node])
);
const learningBranches = [
  {
    title: "Everyday skills",
    subtitle: "Lorem ipsum dolor sit amet.",
    nodeSlugs: ["self-awareness", "focus-and-habits", "emotional-resilience", "purposeful-productivity"]
  },
  {
    title: "Working with others",
    subtitle: "Lorem ipsum dolor sit amet.",
    nodeSlugs: ["confident-communication", "thoughtful-leadership"]
  }
].map(branch => ({
  ...branch,
  nodes: branch.nodeSlugs
    .map(slug => nodesBySlug.get(slug))
    .filter((node): node is SkillNode => node !== undefined)
}));
const palette = {
  ink: "#1d342e",
  muted: "#718179",
  green: "#244b43",
  canvas: "#f7f7f1",
  white: "#fffefa"
};

export default function SkillPathScreen() {
  const router = useRouter();
  const { progress, isLoaded, storageError } = useProgress();
  const nodes = learningBranches.flatMap(branch => branch.nodes);
  const courseProgressBySlug = new Map(
    bundledCourses.map(course => [course.slug, getCourseProgress(course, progress)])
  );
  const completedNodes = new Set(
    nodes
      .filter(node => courseProgressBySlug.get(node.courseSlug)?.isComplete)
      .map(node => node.slug)
  );
  const completedCourses = completedNodes.size;
  const completedLessons = nodes.reduce(
    (count, node) => count + (courseProgressBySlug.get(node.courseSlug)?.completed ?? 0),
    0
  );
  const totalLessons = nodes.reduce(
    (count, node) => count + (courseProgressBySlug.get(node.courseSlug)?.total ?? 0),
    0
  );
  const activeSkills = nodes.filter(node =>
    !completedNodes.has(node.slug) &&
    node.prerequisites.every(prerequisite => completedNodes.has(prerequisite))
  ).length;
  const nextNode = nodes.find(node =>
    !completedNodes.has(node.slug) &&
    node.prerequisites.every(prerequisite => completedNodes.has(prerequisite))
  );

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.topline}>
        <BrandMark />
        <View style={styles.pointBadge}>
          <AppIcon name="map" size={14} color="#52715c" />
          <Text style={styles.pointText}>{learningBranches.length} branches</Text>
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>LEARNING PATHS</Text>
        <Text style={styles.title}>Choose a topic.</Text>
        <Text style={styles.subtitle}>Lorem ipsum dolor sit amet.</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressCaption}>YOUR PROGRESS</Text>
              <Text style={styles.progressHeadline}>
                {completedCourses} of {nodes.length} courses complete
              </Text>
            </View>
          </View>
          <View
            style={styles.progressTrack}
            accessibilityRole="progressbar"
            accessibilityLabel="Completed skill paths"
            accessibilityValue={{ min: 0, max: nodes.length, now: completedCourses }}
          >
            <View
              style={[
                styles.progressFill,
                { width: `${nodes.length ? (completedCourses / nodes.length) * 100 : 0}%` }
              ]}
            />
          </View>
          <Text style={styles.progressFoot}>
            {completedLessons} of {totalLessons} lessons · {activeSkills} ready to start
          </Text>
        </View>
      </View>

      {!isLoaded ? (
        <Text style={styles.notice}>Loading your saved learning progress…</Text>
      ) : null}
      {storageError ? (
        <Text style={styles.errorNotice} accessibilityRole="alert">{storageError}</Text>
      ) : null}

      <View style={styles.sectionHeading}>
        <View>
          <Text style={styles.sectionTitle}>Choose a branch</Text>
          <Text style={styles.sectionSubtitle}>Lorem ipsum dolor sit amet.</Text>
        </View>
      </View>

      {learningBranches.map((branch, branchIndex) => (
        <View key={branch.title} style={styles.stage}>
          <View style={styles.stageHeading}>
            <View style={styles.stageNumber}>
              <Text style={styles.stageNumberText}>{String(branchIndex + 1).padStart(2, "0")}</Text>
            </View>
            <View style={styles.stageHeadingCopy}>
              <Text style={styles.stageTitle}>{branch.title}</Text>
              <Text style={styles.stageSubtitle}>{branch.subtitle}</Text>
            </View>
          </View>
          <View style={styles.nodeGrid}>
            {branch.nodes.map(node => (
              <SkillNodeCard
                key={node.slug}
                node={node}
                completed={completedNodes.has(node.slug)}
                available={node.prerequisites.every(prerequisite => completedNodes.has(prerequisite))}
                prerequisiteTitles={node.prerequisites.map(slug => nodesBySlug.get(slug)?.title ?? slug)}
                courseProgress={courseProgressBySlug.get(node.courseSlug) ?? null}
                onPress={() => router.push(`/course/${node.courseSlug}`)}
              />
            ))}
          </View>
        </View>
      ))}

      <View style={styles.nextStep}>
        <View style={styles.nextIcon}>
          <MoveDownRight size={20} color={palette.green} />
        </View>
        <View style={styles.nextCopy}>
          <Text style={styles.nextEyebrow}>NEXT UP</Text>
          <Text style={styles.nextTitle}>
            {nextNode ? `Try ${nextNode.title}` : "All courses complete"}
          </Text>
        </View>
        {nextNode ? (
          <Pressable
            onPress={() => router.push(`/course/${nextNode.courseSlug}`)}
            style={styles.nextButton}
            accessibilityRole="button"
            accessibilityLabel={`${courseProgressBySlug.get(nextNode.courseSlug)?.completed ? "Continue" : "Start"} ${nextNode.title}`}
          >
            <Text style={styles.nextButtonText}>
              {courseProgressBySlug.get(nextNode.courseSlug)?.completed ? "Continue" : "Start"}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}

function SkillNodeCard({
  node,
  completed,
  available,
  prerequisiteTitles,
  courseProgress,
  onPress
}: {
  node: SkillNode;
  completed: boolean;
  available: boolean;
  prerequisiteTitles: string[];
  courseProgress: ReturnType<typeof getCourseProgress> | null;
  onPress: () => void;
}) {
  const compactStatus = completed ? "Complete" : courseProgress?.completed
    ? "Started"
    : available ? "Ready" : "Preview";

  return (
    <View style={styles.nodeSlot}>
      <Pressable
        onPress={onPress}
        style={[
          styles.nodeCard,
          completed ? styles.nodeComplete : available ? styles.nodeAvailable : styles.nodeLocked
        ]}
        accessibilityRole="button"
        accessibilityLabel={`${compactStatus} ${node.title}. ${courseProgress?.completed ?? 0} of ${courseProgress?.total ?? 0} lessons completed.`}
      >
        <View style={styles.nodeTop}>
          <View style={[styles.nodeIconWrap, completed ? styles.nodeIconComplete : available ? styles.nodeIconAvailable : styles.nodeIconLocked]}>
            <AppIcon name={node.icon} size={20} color={completed ? "#fffefa" : palette.green} />
          </View>
          <View style={[styles.statusPill, completed ? styles.statusPillComplete : available ? styles.statusPillAvailable : styles.statusPillLocked]}>
            {!available && !completed ? <LockKeyhole size={11} color="#79847e" /> : null}
            <Text style={[styles.statusText, completed ? styles.statusTextComplete : null]}>{compactStatus}</Text>
          </View>
        </View>
        <Text style={styles.nodeDomain}>{node.domain.toUpperCase()}</Text>
        <Text style={styles.nodeTitle}>{node.title}</Text>
        <Text style={styles.nodeDescription}>{node.description}</Text>
        <View style={styles.nodeFooter}>
          <Text style={styles.nodeLessons}>
            {courseProgress?.completed ?? 0}/{courseProgress?.total ?? 0} lessons
          </Text>
          <Text style={styles.nodeLink}>{available ? "View" : "Preview"} <Text style={styles.nodeArrow}>›</Text></Text>
        </View>
        {prerequisiteTitles.length > 0 ? (
          <Text style={styles.prerequisite} numberOfLines={1}>Build on: {prerequisiteTitles.join(" + ")}</Text>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: palette.canvas,
    flex: 1
  },
  content: {
    alignSelf: "center",
    maxWidth: 760,
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
    width: "100%"
  },
  topline: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24
  },
  pointBadge: {
    alignItems: "center",
    backgroundColor: "#e8f1eb",
    borderRadius: 16,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  pointText: {
    color: "#52715c",
    fontSize: 12,
    fontWeight: "700"
  },
  hero: {
    backgroundColor: "#e9efe6",
    borderColor: "#dce7dc",
    borderRadius: 26,
    borderWidth: 1,
    marginBottom: 24,
    overflow: "hidden",
    padding: 22
  },
  eyebrow: {
    color: "#668075",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5
  },
  title: {
    color: palette.ink,
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1.1,
    lineHeight: 39,
    marginTop: 10,
    maxWidth: 520
  },
  subtitle: {
    color: "#61726a",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
    maxWidth: 560
  },
  progressCard: {
    backgroundColor: palette.white,
    borderColor: "#e3e9e0",
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 20,
    padding: 16
  },
  progressHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  progressCaption: {
    color: "#7d8d84",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.1
  },
  progressHeadline: {
    color: palette.ink,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 3
  },
  progressTrack: {
    backgroundColor: "#e9eee7",
    borderRadius: 5,
    height: 8,
    marginTop: 14,
    overflow: "hidden"
  },
  progressFill: {
    backgroundColor: "#39745b",
    borderRadius: 5,
    height: "100%"
  },
  progressFoot: {
    color: palette.muted,
    fontSize: 12,
    marginTop: 8
  },
  notice: {
    color: palette.muted,
    fontSize: 13,
    marginBottom: 14
  },
  errorNotice: {
    backgroundColor: "#fff0ec",
    borderRadius: 12,
    color: "#9b3a2b",
    fontSize: 13,
    marginBottom: 14,
    padding: 12
  },
  sectionHeading: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  sectionTitle: {
    color: palette.ink,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.45
  },
  sectionSubtitle: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4
  },
  stage: {
    marginBottom: 22
  },
  stageHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10
  },
  stageNumber: {
    alignItems: "center",
    backgroundColor: "#dce9df",
    borderRadius: 11,
    height: 33,
    justifyContent: "center",
    width: 36
  },
  stageNumberText: {
    color: "#456d59",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5
  },
  stageHeadingCopy: {
    flex: 1
  },
  stageTitle: {
    color: palette.ink,
    fontSize: 17,
    fontWeight: "800"
  },
  stageSubtitle: {
    color: palette.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2
  },
  nodeGrid: {
    paddingTop: 7
  },
  nodeSlot: {
    marginBottom: 10
  },
  nodeCard: {
    backgroundColor: palette.white,
    borderColor: "#e2e8df",
    borderRadius: 18,
    borderWidth: 1,
    padding: 16
  },
  nodeAvailable: {
    borderColor: "#a9c5ae",
    shadowColor: "#244b43",
    shadowOpacity: 0.06,
    shadowRadius: 9,
    elevation: 1
  },
  nodeComplete: {
    backgroundColor: "#f1f7f0",
    borderColor: "#82a98a"
  },
  nodeLocked: {
    backgroundColor: "#fdfdfa",
    borderColor: "#e5e8e3"
  },
  nodeTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  nodeIconWrap: {
    alignItems: "center",
    borderRadius: 13,
    height: 38,
    justifyContent: "center",
    width: 38
  },
  nodeIconAvailable: {
    backgroundColor: "#e6f0e7"
  },
  nodeIconComplete: {
    backgroundColor: "#39745b"
  },
  nodeIconLocked: {
    backgroundColor: "#eef0eb"
  },
  statusPill: {
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 5
  },
  statusPillAvailable: {
    backgroundColor: "#e5f1e7"
  },
  statusPillComplete: {
    backgroundColor: "#39745b"
  },
  statusPillLocked: {
    backgroundColor: "#f0f1ed"
  },
  statusText: {
    color: "#51735c",
    fontSize: 9,
    fontWeight: "800"
  },
  statusTextComplete: {
    color: "#fffefa"
  },
  nodeDomain: {
    color: "#86958a",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1
  },
  nodeTitle: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 19,
    marginTop: 4
  },
  nodeDescription: {
    color: "#6f7d74",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6
  },
  nodeFooter: {
    alignItems: "center",
    borderTopColor: "#edf0ea",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 9
  },
  nodeLessons: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: "600"
  },
  nodeLink: {
    color: palette.green,
    fontSize: 11,
    fontWeight: "800"
  },
  nodeArrow: {
    fontSize: 14
  },
  prerequisite: {
    color: "#7f8d83",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 7
  },
  nextStep: {
    alignItems: "flex-start",
    backgroundColor: "#fbf1dd",
    borderColor: "#f0e1bd",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: 11,
    marginTop: 3,
    padding: 16
  },
  nextIcon: {
    alignItems: "center",
    backgroundColor: "#f6e5bf",
    borderRadius: 12,
    height: 38,
    justifyContent: "center",
    width: 38
  },
  nextCopy: {
    flex: 1
  },
  nextEyebrow: {
    color: "#92733e",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1
  },
  nextTitle: {
    color: "#4e4028",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 4
  },
  nextButton: {
    alignSelf: "center",
    backgroundColor: palette.green,
    borderRadius: 12,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  nextButtonText: {
    color: "#fffefa",
    fontSize: 11,
    fontWeight: "800"
  }
});
