import { Injectable, NotFoundException } from "@nestjs/common";
import type { Course, Lesson, LessonSearchResult, LessonVariant, Transcript } from "@course-app/shared";
import { ContentRepository } from "./content.repository.js";

type LessonRecord = {
  id: string;
  slug: string;
  title: string;
  order: number;
  body: string;
  variants: { language: string; label: string; videoUrl: string | null; isDefault: boolean }[];
  transcripts: { language: string; text: string }[];
};

function toLesson(record: LessonRecord): Lesson {
  const variants: LessonVariant[] = record.variants.map(variant => ({
    language: variant.language,
    label: variant.label,
    isDefault: variant.isDefault,
    ...(variant.videoUrl ? { videoUrl: variant.videoUrl } : {})
  }));
  const transcripts: Transcript[] = record.transcripts.map(transcript => ({
    language: transcript.language,
    text: transcript.text
  }));

  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    order: record.order,
    body: record.body,
    variants,
    transcripts
  };
}

@Injectable()
export class ContentService {
  constructor(private readonly contentRepository: ContentRepository) {}

  async getCourses(): Promise<Course[]> {
    const courses = await this.contentRepository.findPublishedCourses();
    return courses.map(course => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      modules: course.modules.map(module => ({
        id: module.id,
        title: module.title,
        order: module.order,
        lessons: module.lessons.map(toLesson)
      }))
    }));
  }

  async getCourse(slug: string): Promise<Course> {
    const course = await this.contentRepository.findPublishedCourse(slug);
    if (!course) {
      throw new NotFoundException("Course not found");
    }

    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      modules: course.modules.map(module => ({
        id: module.id,
        title: module.title,
        order: module.order,
        lessons: module.lessons.map(toLesson)
      }))
    };
  }

  async getLesson(courseSlug: string, lessonSlug: string): Promise<Lesson> {
    const lesson = await this.contentRepository.findPublishedLesson(courseSlug, lessonSlug);
    if (!lesson) {
      throw new NotFoundException("Lesson not found");
    }
    return toLesson(lesson);
  }

  async search(query: string, limit: number): Promise<LessonSearchResult[]> {
    const normalizedQuery = query.trim();
    if (normalizedQuery.length < 2) {
      return [];
    }

    const lessons = await this.contentRepository.findLessons(normalizedQuery, limit);
    return lessons.map(lesson => ({
      courseSlug: lesson.module.course.slug,
      courseTitle: lesson.module.course.title,
      lesson: toLesson(lesson)
    }));
  }
}