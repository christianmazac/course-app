export type {
  Course,
  Lesson,
  LessonSearchResult,
  LessonVariant,
  Module,
  SiteSettings,
  Transcript
} from "@course-app/shared";

export type SkillNode = {
  slug: string;
  courseSlug: string;
  title: string;
  description: string;
  domain: string;
  icon: "compass" | "target" | "heart" | "messages" | "users";
  prerequisites: string[];
};

export type SkillStage = {
  title: string;
  subtitle: string;
  nodes: SkillNode[];
};