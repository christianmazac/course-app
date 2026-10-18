import { Tabs } from "expo-router";
import { AppIcon } from "../../src/components/AppIcon";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#244b43",
        tabBarInactiveTintColor: "#81918a",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarStyle: {
          backgroundColor: "#fffefa",
          borderTopColor: "#e8ebe4",
          height: 66,
          paddingBottom: 8,
          paddingTop: 7
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: ({ color }) => <AppIcon name="home" size={19} color={typeof color === "string" ? color : "#81918a"} /> }}
      />
      <Tabs.Screen
        name="path"
        options={{ title: "Branches", tabBarIcon: ({ color }) => <AppIcon name="map" size={19} color={typeof color === "string" ? color : "#81918a"} /> }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: "Search", tabBarIcon: ({ color }) => <AppIcon name="search" size={19} color={typeof color === "string" ? color : "#81918a"} /> }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Settings", tabBarIcon: ({ color }) => <AppIcon name="settings" size={19} color={typeof color === "string" ? color : "#81918a"} /> }}
      />
    </Tabs>
  );
}