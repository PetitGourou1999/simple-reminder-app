import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Alert, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import storageHelper from "../storage/StorageHelper";

import { Idea } from "../types";
import { View, Text } from "./Themed";

export default function IdeaCard(idea: Idea) {
  return (
    <View style={[styles.container, { backgroundColor: idea.color }]}>
      <View style={[styles.topBar, { backgroundColor: idea.color }]}>
        <Text style={styles.title}>{idea.title}</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Attention",
              "Voulez-vous vraiment supprimer cette idée ?",
              [
                {
                  text: "Non",
                  style: "cancel",
                },
                {
                  text: "Oui",
                  onPress: () => {
                    console.log(idea);
                    storageHelper.removeData(idea.storageKey).then(
                      () => {
                        console.log("Item removed");
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
                  },
                },
              ]
            );
          }}
        >
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
  },
  description: {
    color: "#000",
    fontSize: 14,
  },
});
