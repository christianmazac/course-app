import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import {
  QueryClient,
  focusManager,
  onlineManager
} from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import * as Network from "expo-network";
import { useEffect } from "react";
import { AppState, Platform } from "react-native";
import { ProgressProvider } from "../src/lib/progress";

const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const CACHE_BUSTER = "course-content-v1";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      gcTime: CACHE_MAX_AGE
    }
  }
});
const queryPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "course_query_cache_v1"
});

function QueryFocusManager() {
  useEffect(() => {
    if (Platform.OS === "web") {
      focusManager.setFocused(true);
      return;
    }

    let receivedNetworkEvent = false;
    const networkSubscription = Network.addNetworkStateListener(state => {
      receivedNetworkEvent = true;
      onlineManager.setOnline(state.isConnected !== false);
    });
    const appStateSubscription = AppState.addEventListener("change", state => {
      focusManager.setFocused(state === "active");
    });

    Network.getNetworkStateAsync()
      .then(state => {
        if (!receivedNetworkEvent) {
          onlineManager.setOnline(state.isConnected !== false);
        }
      })
      .catch(() => {
        if (!receivedNetworkEvent) {
          onlineManager.setOnline(true);
        }
      });

    return () => {
      networkSubscription.remove();
      appStateSubscription.remove();
    };
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: CACHE_MAX_AGE,
        buster: CACHE_BUSTER,
        dehydrateOptions: {
          shouldDehydrateQuery: query =>
            query.state.status === "success" &&
            ["courses", "course", "lesson", "settings"].includes(String(query.queryKey[0]))
        }
      }}
    >
      <ProgressProvider>
        <QueryFocusManager />
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ProgressProvider>
    </PersistQueryClientProvider>
  );
}