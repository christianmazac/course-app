import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export function CourseCard({
  title,
  description,
  thumbnailUrl,
  onPress
}: {
  title: string;
  description: string;
  thumbnailUrl: string;
  onPress: () => void;
}) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);

  return (
    <Pressable onPress={onPress} style={styles.card} accessibilityRole="button">
      <Image
        source={thumbnailFailed ? require("../../assets/icon.png") : { uri: thumbnailUrl }}
        style={styles.thumbnail}
        resizeMode="cover"
        accessibilityLabel={`${title} course thumbnail`}
        onError={() => setThumbnailFailed(true)}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fffefa",
    borderRadius: 18,
    borderColor: "#e4e9df",
    borderWidth: 1,
    marginBottom: 13,
    overflow: "hidden"
  },
  thumbnail: {
    aspectRatio: 2.15,
    width: "100%"
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 13
  },
  title: {
    color: "#243b33",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 5
  },
  description: {
    color: "#718179",
    fontSize: 12,
    lineHeight: 18
  }
});