import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ReminderCardParamsList } from "../types";
import { Text, View } from "./Themed";

export default function ReminderCard({
  reminder,
  onRemoveItem,
}: ReminderCardParamsList) {
  return (
    <View style={[styles.container, { backgroundColor: reminder.color }]}>
      <View style={[styles.topBar, { backgroundColor: reminder.color }]}>
        <Text style={styles.title}>{reminder.title}</Text>
        <TouchableOpacity onPress={() => onRemoveItem()}>
          <FontAwesome name="trash" size={20} color={"#000"}></FontAwesome>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{reminder.description}</Text>
      <Text style={styles.dateText}>
        {"le " +
          new Date(reminder.dateTime).toLocaleDateString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
      </Text>
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
    marginBottom: 10,
  },
  dateText: {
    color: "#000",
    fontSize: 12,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
  },
});
