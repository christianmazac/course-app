import { Pressable, StyleSheet, Text } from "react-native";

export function LessonRow({
  title,
  onPress
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    padding: 14
  },
  title: {
    fontSize: 15,
    fontWeight: "600"
  }
});