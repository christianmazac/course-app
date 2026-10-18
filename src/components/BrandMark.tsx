import { StyleSheet, Text, View } from "react-native";

export function BrandMark() {
  return (
    <View accessibilityLabel="Courses">
      <Text style={styles.name}>Courses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    color: "#1d342e",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5
  }
});
