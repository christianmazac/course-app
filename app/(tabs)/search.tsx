import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { ScreenHeader } from "../../src/components/ScreenHeader";
import { searchLessons } from "../../src/lib/courses";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const normalizedQuery = query.trim();
  const { data: results = [], isPending, error } = useQuery({
    queryKey: ["search", normalizedQuery],
    queryFn: () => searchLessons(normalizedQuery),
    enabled: normalizedQuery.length >= 2
  });

  return (
    <View style={styles.container}>
      <ScreenHeader title="Find a lesson" />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search lessons"
        placeholderTextColor="#89968e"
        style={styles.input}
        accessibilityLabel="Search lesson content"
        returnKeyType="search"
      />
      <FlatList
        data={results}
        keyExtractor={item => item.lesson.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {normalizedQuery.length < 2
              ? "Enter at least two characters to search."
              : isPending
                ? "Searching..."
                : error?.message ?? "No matching lessons."}
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.result}
            onPress={() =>
              router.push(`/course/${item.courseSlug}/lesson/${item.lesson.slug}`)
            }
          >
            <Text style={styles.resultEyebrow}>LESSON · {item.courseTitle.toUpperCase()}</Text>
            <Text style={styles.resultTitle}>{item.lesson.title}</Text>
            <Text style={styles.resultSubtitle}>{item.lesson.body.replace(/[#>*_`]/g, "").slice(0, 120)}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f1",
    flex: 1
  },
  input: {
    alignSelf: "center",
    backgroundColor: "#fffefa",
    borderColor: "#e2e8df",
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 15,
    marginHorizontal: 18,
    marginTop: 16,
    maxWidth: 760,
    minHeight: 50,
    paddingHorizontal: 14,
    width: "90%"
  },
  list: {
    alignSelf: "center",
    maxWidth: 760,
    paddingHorizontal: 16,
    paddingBottom: 24,
    width: "100%"
  },
  result: {
    backgroundColor: "#fffefa",
    borderColor: "#e2e8df",
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 9,
    padding: 15
  },
  resultEyebrow: {
    color: "#829188",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.7
  },
  resultTitle: {
    color: "#243b33",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 5
  },
  resultSubtitle: {
    color: "#718179",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5
  },
  emptyText: {
    color: "#718179",
    fontSize: 14,
    paddingVertical: 24,
    textAlign: "center"
  }
});