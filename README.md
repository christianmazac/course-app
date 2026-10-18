# Course App

An open-source, static-first Expo course app. The website is built and published to GitHub Pages; course content is bundled with the app, while lesson progress and cached API results stay on the learner's device.

## Stack

- Expo SDK 57, React Native, Expo Router, TanStack Query, and AsyncStorage
- NestJS, Prisma 6.19, and PostgreSQL
- Shared TypeScript API contracts and Zod content validation
- Optional Docker Compose API/PostgreSQL stack for local self-hosting

## Included learner features

- Course catalog, modules, and lessons
- Lesson video, Markdown content, and transcripts
- Lesson search
- Per-device lesson completion and continue-learning progress
- A learning-path tab with two course branches, visible prerequisites, partial progress, and previewable courses
- Previous/next lesson navigation and completion controls on course overviews as well as lesson pages
- Offline course reading from the generated content bundle; progress and query data are saved locally
- SVG-based brand mark and cross-platform Lucide icons

## Run locally

Prerequisites: Node.js 24. Docker Compose is only needed to run the optional API.

1. Install dependencies with `npm ci`.
2. Start the app with `npm start`. It validates and bundles the checked-in Markdown course content before launching Expo.
3. Open the web client with `w`, Android with `a`, or iOS with `i` on macOS.

The app works without an API. To also run the optional API locally, start PostgreSQL and the API with `npm run db:up`; seed it with `npm run db:seed`. To use it from a device, copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL` to the reachable API URL. The app still falls back to its bundled lessons when the API is unavailable.

The API is available at `http://localhost:3000/api/v1`; its health endpoint is `/health`. To stop local services, run `npm run db:down`; the named PostgreSQL volume is preserved.

## Content and API

Edit lesson bodies and transcript text as Markdown under `content/courses/<course-slug>/lessons/` and `content/courses/<course-slug>/transcripts/`. `content/seed.json` holds course metadata, module/lesson order, Markdown paths, language variants, and a required HTTPS `thumbnailUrl` for every course. `content/skill-tree.json` connects course slugs into stages and prerequisite branches; the build validates those references and their order. Validate the seed and every referenced Markdown file without a running database using `npm run content:validate --workspace @course-app/api`. `npm start` regenerates the mobile/web content bundle; GitHub Actions regenerates it before deployment.

Path unlocks are a guide, not an access restriction: learners can preview any course and open its lessons. A path is marked complete only when all of its lessons are marked complete; this represents course progress, not a verified assessment of real-world mastery. No streaks, expiring rewards, or activity-based lockouts are used.

The course branches show prerequisites as suggestions; every course remains available to preview.

To publish edited content locally, rebuild the API image with `npm run db:up`, then run `npm run db:seed`. The seed is validated before changes are applied and runs transactionally. It replaces the courses and settings stored in the local database, so back up content before reseeding a database you care about. Settings load from AsyncStorage immediately, then refresh from the API and update the cache when online; queries retry when connectivity returns.

Public endpoints:

- `GET /api/v1/health`
- `GET /api/v1/settings`
- `GET /api/v1/courses`
- `GET /api/v1/courses/:courseSlug`
- `GET /api/v1/courses/:courseSlug/lessons/:lessonSlug`
- `GET /api/v1/search?q=...&limit=20`

Only published courses, modules, and lessons are returned. Lesson body and transcript text are stored in PostgreSQL. Video files are not stored in the database; variants hold their public URL.

## Checks

- `npm run typecheck`
- `npm run typecheck --workspace @course-app/api`
- `npx expo export --platform web`

## Deployment

The `Deploy GitHub Pages` workflow publishes the static Expo app and deployment guide together. Start with the [deployment guide](docs/index.html) for repository setup, GitHub Pages, optional API hosting, and release checks.

The static app bundles course text and metadata at build time. Lesson progress and cached API results stay on each device; they do not sync between devices. Videos and course thumbnails use the HTTPS URLs in the course seed data and need a network connection.

The app does not include accounts, cross-device sync, quizzes or graded assessments, certificates, or instructor authoring tools. The optional API requires PostgreSQL and must be hosted separately from GitHub Pages.

## Licensing

Application code is MIT-licensed. Review and license course materials separately before redistributing content; the license for code does not automatically grant rights to lesson text or third-party video.