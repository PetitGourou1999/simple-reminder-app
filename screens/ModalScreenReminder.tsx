import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function ModalScreenReminder({
  navigation,
}: RootStackScreenProps<"ModalReminder">) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    width: "80%",
    marginVertical: 5,
    justifyContent: "center",
    height: 1,
  },
  touchableColor: {
    width: 25,
    height: 25,
    borderRadius: 13,
  },
});
