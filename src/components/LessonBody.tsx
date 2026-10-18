import Markdown from "react-native-markdown-display";
import { StyleSheet } from "react-native";

export function LessonBody({ content }: { content: string }) {
  return <Markdown style={markdownStyles}>{content}</Markdown>;
}

const markdownStyles = StyleSheet.create({
  body: {
    color: "#111827",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24
  },
  heading1: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827"
  },
  heading2: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#111827"
  },
  list_item: {
    flexDirection: "row",
    marginBottom: 4
  },
  bullet_list: {
    marginBottom: 16
  }
});