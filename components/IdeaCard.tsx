import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IdeaCardParamsList } from "../types";
import { Text, View } from "./Themed";

export default function IdeaCard({ idea, onRemoveItem }: IdeaCardParamsList) {
  return (
    <View style={[styles.container, { backgroundColor: idea.color }]}>
      <View style={[styles.topBar, { backgroundColor: idea.color }]}>
        <Text style={styles.title}>{idea.title}</Text>
        <TouchableOpacity onPress={() => onRemoveItem()}>
          <FontAwesome name="trash" size={20} color={"#000"}></FontAwesome>
        </TouchableOpacity>
      </View>
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
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  title: {
    color: "#000",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    paddingRight: 10,
  },
  description: {
    color: "#000",
    fontSize: 14,
  },
});
