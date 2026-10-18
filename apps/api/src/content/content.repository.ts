import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "../database/database.service.js";

const publicCourseContent = {
  modules: {
    where: { published: true },
    orderBy: { order: "asc" },
    include: {
      lessons: {
        where: { published: true },
        orderBy: { order: "asc" },
        include: {
          variants: { orderBy: { language: "asc" } },
          transcripts: { orderBy: { language: "asc" } }
        }
      }
    }
  }
} satisfies Prisma.CourseInclude;

@Injectable()
export class ContentRepository {
  constructor(private readonly database: DatabaseService) {}

  findPublishedCourses() {
    return this.database.course.findMany({
      where: { published: true },
      orderBy: { title: "asc" },
      include: publicCourseContent
    });
  }

  findPublishedCourse(slug: string) {
    return this.database.course.findFirst({
      where: { slug, published: true },
      include: publicCourseContent
    });
  }

  findPublishedLesson(courseSlug: string, lessonSlug: string) {
    return this.database.lesson.findFirst({
      where: {
        slug: lessonSlug,
        published: true,
        module: {
          published: true,
          course: { slug: courseSlug, published: true }
        }
      },
      include: {
        variants: { orderBy: { language: "asc" } },
        transcripts: { orderBy: { language: "asc" } }
      }
    });
  }

  findLessons(query: string, limit: number) {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      return Promise.resolve([]);
    }

    return this.database.lesson.findMany({
      where: {
        published: true,
        module: {
          published: true,
          course: { published: true }
        },
        OR: [
          { title: { contains: normalizedQuery, mode: "insensitive" } },
          { body: { contains: normalizedQuery, mode: "insensitive" } }
        ]
      },
      take: limit,
      orderBy: [{ title: "asc" }, { id: "asc" }],
      include: {
        variants: { orderBy: { language: "asc" } },
        transcripts: { orderBy: { language: "asc" } },
        module: { select: { course: { select: { slug: true, title: true } } } }
      }
    });
  }
}