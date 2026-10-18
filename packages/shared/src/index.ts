import { z } from "zod";

const transcriptSchema = z.object({
  language: z.string().trim().min(2).max(35),
  text: z.string()
});

const transcriptSeedSchema = z.object({
  language: z.string().trim().min(2).max(35),
  markdownFile: z.string().regex(
    /^courses\/[a-z0-9]+(?:-[a-z0-9]+)*\/transcripts\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z]{2,8})?\.md$/
  )
});

export const siteSettingsSchema = z.object({
  siteTitle: z.string().trim().min(1).max(180),
  siteDescription: z.string(),
  defaultLanguage: z.string().trim().min(2).max(35)
});

export const defaultSiteSettings = {
  siteTitle: "Courses",
  siteDescription: "Lorem ipsum dolor sit amet.",
  defaultLanguage: "en"
} satisfies z.infer<typeof siteSettingsSchema>;

const courseSlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const markdownFileSchema = z.string().regex(
  /^courses\/[a-z0-9]+(?:-[a-z0-9]+)*\/lessons\/[a-z0-9]+(?:-[a-z0-9]+)*\.md$/
);

const variantSchema = z.object({
  language: z.string().trim().min(2).max(35),
  label: z.string().trim().min(1).max(80),
  videoUrl: z.url().optional(),
  isDefault: z.boolean().default(false)
});

const lessonSeedSchema = z.object({
  slug: courseSlugSchema,
  title: z.string().trim().min(1).max(180),
  order: z.number().int().positive(),
  markdownFile: markdownFileSchema,
  variants: z.array(variantSchema).min(1),
  transcripts: z.array(transcriptSeedSchema).default([])
});

const moduleSeedSchema = z.object({
  title: z.string().trim().min(1).max(180),
  order: z.number().int().positive(),
  lessons: z.array(lessonSeedSchema)
});

const courseSeedSchema = z.object({
  slug: courseSlugSchema,
  title: z.string().trim().min(1).max(180),
  description: z.string(),
  thumbnailUrl: z.url().refine(value => new URL(value).protocol === "https:"),
  modules: z.array(moduleSeedSchema)
});

export const seedContentSchema = z.object({
  settings: siteSettingsSchema,
  courses: z.array(courseSeedSchema)
});

export const skillTreeSchema = z.object({
  stages: z.array(z.object({
    title: z.string().trim().min(1).max(120),
    subtitle: z.string().trim().min(1).max(240),
    nodes: z.array(z.object({
      slug: courseSlugSchema,
      courseSlug: courseSlugSchema,
      title: z.string().trim().min(1).max(120),
      description: z.string().trim().min(1).max(240),
      domain: z.string().trim().min(1).max(60),
      icon: z.enum(["compass", "target", "heart", "messages", "users"]),
      prerequisites: z.array(courseSlugSchema)
    }))
  }))
});

export type SeedContent = z.infer<typeof seedContentSchema>;
export type SkillTree = z.infer<typeof skillTreeSchema>;

export type Transcript = z.infer<typeof transcriptSchema>;
export type LessonVariant = z.infer<typeof variantSchema>;
export type Lesson = {
  id: string;
  slug: string;
  title: string;
  order: number;
  body: string;
  variants: LessonVariant[];
  transcripts: Transcript[];
};
export type Module = {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
};
export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  modules: Module[];
};
export type LessonSearchResult = {
  courseSlug: string;
  courseTitle: string;
  lesson: Lesson;
};
export type SiteSettings = z.infer<typeof siteSettingsSchema>;