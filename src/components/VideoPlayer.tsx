import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, Text, View } from "react-native";

export function VideoPlayer({ title, videoUrl }: { title: string; videoUrl?: string }) {
  const player = useVideoPlayer(videoUrl ? { uri: videoUrl } : null, (playerInstance) => {
    if (videoUrl) {
      playerInstance.loop = false;
    }
  });

  if (!videoUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.placeholder}>This lesson has no video.</Text>
      </View>
    );
  }

  return (
    <VideoView
      style={styles.video}
      player={player}
      nativeControls
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 16,
    justifyContent: "center",
    marginBottom: 24,
    minHeight: 200,
    padding: 20
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center"
  },
  placeholder: {
    color: "#d1d5db",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  },
  video: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 24
  }
});