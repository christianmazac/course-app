import { PrismaClient } from "@prisma/client";
import { loadSeedContent } from "./content.js";

const prisma = new PrismaClient();

async function seed() {
  const content = await loadSeedContent();

  await prisma.$transaction(async transaction => {
    await transaction.course.deleteMany();
    await transaction.setting.upsert({
      where: { id: "global" },
      create: { id: "global", ...content.settings },
      update: content.settings
    });

    for (const course of content.courses) {
      await transaction.course.create({
        data: {
          slug: course.slug,
          title: course.title,
          description: course.description,
          thumbnailUrl: course.thumbnailUrl,
          modules: {
            create: course.modules.map(module => ({
              title: module.title,
              order: module.order,
              lessons: {
                create: module.lessons.map(lesson => ({
                  slug: lesson.slug,
                  title: lesson.title,
                  order: lesson.order,
                  body: lesson.body,
                  variants: { create: lesson.variants },
                  transcripts: { create: lesson.transcripts }
                }))
              }
            }))
          }
        }
      });
    }
  });
}

seed()
  .catch(error => {
    console.error("Content seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());