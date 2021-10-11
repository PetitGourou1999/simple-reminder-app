import * as React from "react";
import { StyleSheet } from "react-native";

import { Idea } from "../types";
import { View, Text } from "./Themed";

export default function IdeaCard(idea: Idea) {
  return (
    <View style={[styles.container, { backgroundColor: idea.color }]}>
      <Text style={styles.title}>{idea.title}</Text>
      <Text style={styles.description}>{idea.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 5,
    padding: 20,
    marginVertical: 10,
  },
  title: {
    color: "#000",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  description: {
    color: "#000",
    fontSize: 14,
  },
});
