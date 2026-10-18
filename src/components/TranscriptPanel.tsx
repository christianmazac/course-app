import { StyleSheet, Text, View } from "react-native";
import { Transcript } from "../types";

export function TranscriptPanel({ transcript }: { transcript: Transcript }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transcript</Text>
      <Text style={styles.language}>{transcript.language}</Text>
      <Text style={styles.text}>{transcript.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafb",
    borderColor: "#e5e7eb",
    borderRadius: 16,
    borderWidth: 1,
    padding: 16
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4
  },
  language: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 12,
    textTransform: "uppercase"
  },
  text: {
    color: "#111827",
    fontSize: 15,
    lineHeight: 22
  }
});