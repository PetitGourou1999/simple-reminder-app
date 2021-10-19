import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function ToDoListScreen({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
