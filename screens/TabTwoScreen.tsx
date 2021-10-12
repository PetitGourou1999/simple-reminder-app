import * as React from "react";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import { StyleSheet } from "react-native";

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
