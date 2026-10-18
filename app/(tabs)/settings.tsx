import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenHeader } from "../../src/components/ScreenHeader";
import { getSettings } from "../../src/lib/courses";
import { bundledSettings } from "../../src/lib/bundled-content";

export default function SettingsScreen() {
  const { data: settings = bundledSettings, error, fetchStatus, isFetching } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    initialData: bundledSettings,
    initialDataUpdatedAt: 0,
    staleTime: 0,
    refetchOnReconnect: true
  });

  const status = error
    ? `Could not refresh settings: ${error.message}`
    : fetchStatus === "paused"
      ? "Offline · saved settings are available on this device"
      : isFetching
        ? "Checking for settings updates…"
        : "Settings are available offline on this device";

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Settings" />

        <View style={styles.card}>
          <Text style={styles.eyebrow}>LANGUAGE</Text>
          <Text style={styles.language}>{settings.defaultLanguage}</Text>
        </View>

        <Text
          style={[styles.status, error ? styles.error : null]}
          accessibilityRole={error ? "alert" : undefined}
        >
          {status}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f7f7f1",
    flex: 1
  },
  content: {
    alignSelf: "center",
    maxWidth: 760,
    paddingBottom: 32,
    paddingHorizontal: 18,
    width: "100%"
  },
  card: {
    backgroundColor: "#fffefa",
    borderColor: "#e2e8df",
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 16,
    padding: 18
  },
  eyebrow: {
    color: "#829188",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1
  },
  language: {
    color: "#1d342e",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
    textTransform: "uppercase"
  },
  status: {
    color: "#718179",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 14,
    paddingHorizontal: 2
  },
  error: {
    color: "#9b3a2b"
  }
});
