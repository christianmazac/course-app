CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "siteTitle" TEXT NOT NULL,
    "siteDescription" TEXT NOT NULL,
    "defaultLanguage" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LessonVariant" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "videoUrl" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "LessonVariant_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Transcript" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "vttText" TEXT,
    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
CREATE UNIQUE INDEX "Module_courseId_order_key" ON "Module"("courseId", "order");
CREATE INDEX "Module_courseId_published_order_idx" ON "Module"("courseId", "published", "order");
CREATE UNIQUE INDEX "Lesson_slug_key" ON "Lesson"("slug");
CREATE UNIQUE INDEX "Lesson_moduleId_order_key" ON "Lesson"("moduleId", "order");
CREATE INDEX "Lesson_moduleId_published_order_idx" ON "Lesson"("moduleId", "published", "order");
CREATE UNIQUE INDEX "LessonVariant_lessonId_language_key" ON "LessonVariant"("lessonId", "language");
CREATE UNIQUE INDEX "Transcript_lessonId_language_key" ON "Transcript"("lessonId", "language");

ALTER TABLE "Module" ADD CONSTRAINT "Module_courseId_fkey"
  FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey"
  FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LessonVariant" ADD CONSTRAINT "LessonVariant_lessonId_fkey"
  FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_lessonId_fkey"
  FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;