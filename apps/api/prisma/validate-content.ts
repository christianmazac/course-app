import { loadSeedContent } from "./content.js";

async function validateContent() {
  const content = await loadSeedContent();
  const lessonCount = content.courses.reduce(
    (courseTotal, course) => courseTotal + course.modules.reduce(
      (moduleTotal, module) => moduleTotal + module.lessons.length,
      0
    ),
    0
  );

  console.log(`Validated ${content.courses.length} course(s) and ${lessonCount} lesson(s).`);
}

void validateContent().catch(error => {
  console.error("Content validation failed:", error);
  process.exitCode = 1;
});