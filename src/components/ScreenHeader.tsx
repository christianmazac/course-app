import { StyleSheet, Text, View } from "react-native";
import { BrandMark } from "./BrandMark";

export function ScreenHeader({
  title,
  subtitle
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.container}>
      <BrandMark />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    maxWidth: 760,
    paddingHorizontal: 18,
    paddingTop: 22,
    width: "100%"
  },
  title: {
    color: "#1d342e",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginTop: 22
  },
  subtitle: {
    color: "#718179",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4
  }
});
