import type { Course, Lesson } from "../types";
import type { AppProgress } from "./progress";

export function courseLessons(course: Course): Lesson[] {
  return course.modules.flatMap(module => module.lessons);
}

export function getCourseProgress(course: Course, progress: AppProgress) {
  const lessons = courseLessons(course);
  const completed = lessons.filter(lesson =>
    progress.completed.includes(`${course.slug}/${lesson.slug}`) ||
    progress.completed.includes(lesson.id)
  ).length;
  return {
    completed,
    total: lessons.length,
    percent: lessons.length === 0 ? 0 : Math.round((completed / lessons.length) * 100),
    isComplete: lessons.length > 0 && completed === lessons.length
  };
}
