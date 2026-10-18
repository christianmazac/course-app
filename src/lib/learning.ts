import type { Course, Lesson } from "../types";
import type { AppProgress } from "./progress";

export function orderedCourseModules(course: Course): Course["modules"] {
  return [...course.modules]
    .sort((a, b) => a.order - b.order)
    .map(module => ({
      ...module,
      lessons: [...module.lessons].sort((a, b) => a.order - b.order)
    }));
}

export function courseLessons(course: Course): Lesson[] {
  return orderedCourseModules(course).flatMap(module => module.lessons);
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
