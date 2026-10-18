import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Lesson } from "../types";

const STORAGE_KEY = "app_progress_v1";

export type AppProgress = {
  completed: string[];
  lastCourse?: string;
  lastLesson?: string;
};

type ProgressContextValue = {
  progress: AppProgress;
  isLoaded: boolean;
  storageError: string | null;
  toggleComplete: (lessonId: string, legacyId?: string) => void;
  setLastOpened: (courseSlug: string, lessonSlug: string) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function isAppProgress(value: unknown): value is AppProgress {
  if (!value || typeof value !== "object" || !("completed" in value)) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return Array.isArray(candidate.completed) &&
    candidate.completed.every(item => typeof item === "string") &&
    (candidate.lastCourse === undefined || typeof candidate.lastCourse === "string") &&
    (candidate.lastLesson === undefined || typeof candidate.lastLesson === "string");
}

export function lessonProgressId(courseSlug: string, lessonSlug: string) {
  return `${courseSlug}/${lessonSlug}`;
}

export function hasCompletedLesson(progress: AppProgress, courseSlug: string, lesson: Lesson) {
  return progress.completed.includes(lessonProgressId(courseSlug, lesson.slug)) ||
    progress.completed.includes(lesson.id);
}

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState<AppProgress>({ completed: [] });
  const progressRef = useRef(progress);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then(async value => {
        if (!isActive || !value) {
          return;
        }

        let parsed: unknown;
        try {
          parsed = JSON.parse(value);
        } catch {
          await AsyncStorage.removeItem(STORAGE_KEY);
          setStorageError("Saved progress was unreadable and has been reset.");
          return;
        }

        if (!isAppProgress(parsed)) {
          await AsyncStorage.removeItem(STORAGE_KEY);
          setStorageError("Saved progress had an unexpected format and has been reset.");
          return;
        }

        progressRef.current = parsed;
        setProgress(parsed);
      })
      .catch(() => {
        if (isActive) {
          setStorageError("Could not load saved progress. Changes may not persist on this device.");
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoaded(true);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const updateProgress = useCallback((update: (current: AppProgress) => AppProgress) => {
    const next = update(progressRef.current);
    progressRef.current = next;
    setProgress(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      .then(() => setStorageError(null))
      .catch(() => setStorageError("Could not save progress on this device."));
  }, []);

  const toggleComplete = useCallback((lessonId: string, legacyId?: string) => {
    updateProgress(current => {
      const isComplete = current.completed.includes(lessonId) ||
        (legacyId !== undefined && current.completed.includes(legacyId));
      const completed = isComplete
        ? current.completed.filter(id => id !== lessonId && id !== legacyId)
        : [...current.completed.filter(id => id !== legacyId), lessonId];
      return { ...current, completed };
    });
  }, [updateProgress]);

  const setLastOpened = useCallback((courseSlug: string, lessonSlug: string) => {
    updateProgress(current => ({ ...current, lastCourse: courseSlug, lastLesson: lessonSlug }));
  }, [updateProgress]);

  return (
    <ProgressContext.Provider
      value={{ progress, isLoaded, storageError, toggleComplete, setLastOpened }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider.");
  }
  return context;
}
