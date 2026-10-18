import { Course, Lesson, LessonSearchResult, SiteSettings } from "../types";
import { bundledCourses, bundledSettings } from "./bundled-content";

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");

async function request<T>(path: string): Promise<T> {
  if (!apiBaseUrl) {
    throw new Error("Set EXPO_PUBLIC_API_URL to the API base URL.");
  }

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`);
  } catch {
    throw new Error("Could not reach the course API. Check the API URL and connection.");
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("The requested course content was not found.");
    }
    throw new Error(`The course API returned an error (${response.status}).`);
  }

  return response.json() as Promise<T>;
}

function withBundledFallback<T>(online: () => Promise<T>, offline: () => T): Promise<T> {
  if (!apiBaseUrl) {
    return Promise.resolve(offline());
  }

  return online().catch(() => offline());
}

function findBundledCourse(courseSlug: string): Course {
  const course = bundledCourses.find(item => item.slug === courseSlug);
  if (!course) {
    throw new Error("The requested course content was not found.");
  }
  return course;
}

function findBundledLesson(courseSlug: string, lessonSlug: string): Lesson {
  const course = findBundledCourse(courseSlug);
  const lesson = course.modules.flatMap(module => module.lessons)
    .find(item => item.slug === lessonSlug);
  if (!lesson) {
    throw new Error("The requested course content was not found.");
  }
  return lesson;
}

export function getBundledCourses(): Course[] {
  return bundledCourses;
}

export function getCourses(): Promise<Course[]> {
  return withBundledFallback(() => request<Course[]>("/courses"), getBundledCourses);
}

export function getCourse(slug: string): Promise<Course> {
  return withBundledFallback(
    () => request<Course>(`/courses/${encodeURIComponent(slug)}`),
    () => findBundledCourse(slug)
  );
}

export function getLesson(courseSlug: string, lessonSlug: string): Promise<Lesson> {
  return withBundledFallback(
    () => request<Lesson>(
      `/courses/${encodeURIComponent(courseSlug)}/lessons/${encodeURIComponent(lessonSlug)}`
    ),
    () => findBundledLesson(courseSlug, lessonSlug)
  );
}

export function searchLessons(query: string): Promise<LessonSearchResult[]> {
  const normalizedQuery = query.trim();
  if (normalizedQuery.length < 2) {
    return Promise.resolve([]);
  }

  const normalizedQueryLower = normalizedQuery.toLocaleLowerCase();
  return withBundledFallback(
    () => request<LessonSearchResult[]>(`/search?q=${encodeURIComponent(normalizedQuery)}`),
    () => bundledCourses.flatMap(course =>
      course.modules.flatMap(module =>
        module.lessons
          .filter(lesson =>
            `${course.title} ${lesson.title} ${lesson.body}`
              .toLocaleLowerCase()
              .includes(normalizedQueryLower)
          )
          .map(lesson => ({
            courseSlug: course.slug,
            courseTitle: course.title,
            lesson
          }))
      )
    )
  );
}

export function getSettings(): Promise<SiteSettings> {
  return withBundledFallback(() => request<SiteSettings>("/settings"), () => bundledSettings);
}