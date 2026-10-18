import { BadRequestException, Controller, Get, Param, Query } from "@nestjs/common";
import { z } from "zod";
import { ContentService } from "./content.service.js";

const slugSchema = z.string().trim().min(1).max(120);
const searchSchema = z.object({
  q: z.string().trim().min(2).max(100),
  limit: z.coerce.number().int().min(1).max(50).default(20)
});

function parseOrBadRequest<T extends z.ZodType>(schema: T, value: unknown): z.output<T> {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new BadRequestException("Invalid request parameters");
  }
  return result.data;
}

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get("courses")
  getCourses() {
    return this.contentService.getCourses();
  }

  @Get("courses/:courseSlug")
  getCourse(@Param("courseSlug") courseSlug: string) {
    return this.contentService.getCourse(parseOrBadRequest(slugSchema, courseSlug));
  }

  @Get("courses/:courseSlug/lessons/:lessonSlug")
  getLesson(@Param() params: { courseSlug: string; lessonSlug: string }) {
    const courseSlug = parseOrBadRequest(slugSchema, params.courseSlug);
    const lessonSlug = parseOrBadRequest(slugSchema, params.lessonSlug);
    return this.contentService.getLesson(courseSlug, lessonSlug);
  }

  @Get("search")
  search(@Query() query: Record<string, unknown>) {
    const parsed = parseOrBadRequest(searchSchema, query);
    return this.contentService.search(parsed.q, parsed.limit);
  }
}