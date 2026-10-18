import { readFile } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { seedContentSchema } from "@course-app/shared";
import { z } from "zod";

export async function loadSeedContent() {
  const contentDirectory = resolve(process.cwd(), "../../content");
  const seedPath = resolve(contentDirectory, "seed.json");
  const parsedJson: unknown = JSON.parse(await readFile(seedPath, "utf8"));
  const content = seedContentSchema.parse(parsedJson);

  for (const course of content.courses) {
    const moduleOrders = new Set<number>();
    for (const module of course.modules) {
      if (moduleOrders.has(module.order)) {
        throw new Error(`Course "${course.slug}" has duplicate module order ${module.order}.`);
      }
      moduleOrders.add(module.order);

      const lessonOrders = new Set<number>();
      for (const lesson of module.lessons) {
        if (lessonOrders.has(lesson.order)) {
          throw new Error(
            `Module "${module.title}" in course "${course.slug}" has duplicate lesson order ${lesson.order}.`
          );
        }
        lessonOrders.add(lesson.order);
      }
    }
  }

  const readMarkdown = async (markdownFile: string) => {
    const filePath = resolve(contentDirectory, markdownFile);
    const pathFromContentRoot = relative(contentDirectory, filePath);
    if (isAbsolute(pathFromContentRoot) || pathFromContentRoot.startsWith(`..${sep}`)) {
      throw new Error(`Markdown path is outside the content directory: ${markdownFile}`);
    }
    return z.string().trim().min(1).parse(await readFile(filePath, "utf8"));
  };

  const courses = await Promise.all(content.courses.map(async course => ({
    ...course,
    modules: await Promise.all(course.modules.map(async module => ({
      ...module,
      lessons: await Promise.all(module.lessons.map(async lesson => ({
        slug: lesson.slug,
        title: lesson.title,
        order: lesson.order,
        body: await readMarkdown(lesson.markdownFile),
        variants: lesson.variants,
        transcripts: await Promise.all(lesson.transcripts.map(async transcript => ({
          language: transcript.language,
          text: await readMarkdown(transcript.markdownFile)
        })))
      })))
    })))
  })));

  return { settings: content.settings, courses };
}