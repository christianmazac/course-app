import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { skillTreeSchema } from "@course-app/shared";
import { loadSeedContent } from "./content.js";

async function bundleContent() {
  const content = await loadSeedContent();
  const parsedTree: unknown = JSON.parse(
    await readFile(resolve(process.cwd(), "../../content/skill-tree.json"), "utf8")
  );
  const skillTree = skillTreeSchema.parse(parsedTree);
  const nodes = skillTree.stages.flatMap((stage, stageIndex) =>
    stage.nodes.map(node => ({ ...node, stageIndex }))
  );
  const nodeBySlug = new Map(nodes.map(node => [node.slug, node]));
  if (nodeBySlug.size !== nodes.length) {
    throw new Error("Skill tree node slugs must be unique.");
  }

  for (const node of nodes) {
    if (!content.courses.some(course => course.slug === node.courseSlug)) {
      throw new Error(`Skill tree node "${node.slug}" references unknown course "${node.courseSlug}".`);
    }
    for (const prerequisite of node.prerequisites) {
      const parent = nodeBySlug.get(prerequisite);
      if (!parent || parent.stageIndex >= node.stageIndex) {
        throw new Error(`Skill tree node "${node.slug}" has a missing, cyclic, or out-of-order prerequisite "${prerequisite}".`);
      }
    }
  }
  const courses = content.courses.map(course => ({
    id: `course:${course.slug}`,
    slug: course.slug,
    title: course.title,
    description: course.description,
    thumbnailUrl: course.thumbnailUrl,
    modules: course.modules.map(module => ({
      id: `module:${course.slug}:${module.order}`,
      title: module.title,
      order: module.order,
      lessons: module.lessons.map(lesson => ({
        id: `lesson:${course.slug}:${lesson.slug}`,
        slug: lesson.slug,
        title: lesson.title,
        order: lesson.order,
        body: lesson.body,
        variants: lesson.variants,
        transcripts: lesson.transcripts
      }))
    }))
  }));

  const output = [
    "// Generated from content/seed.json, skill-tree.json, and Markdown files.",
    'import type { Course, SiteSettings, SkillStage } from "../types";',
    `export const bundledSettings: SiteSettings = ${JSON.stringify(content.settings, null, 2)};`,
    `export const bundledCourses: Course[] = ${JSON.stringify(courses, null, 2)};`,
    `export const bundledSkillStages: SkillStage[] = ${JSON.stringify(skillTree.stages, null, 2)};`,
    ""
  ].join("\n");

  await writeFile(resolve(process.cwd(), "../../src/lib/bundled-content.ts"), output);
}

bundleContent().catch(error => {
  console.error("Static content bundle failed:", error);
  process.exitCode = 1;
});
