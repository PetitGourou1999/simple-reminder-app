import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalStyles from "../constants/Styles";
import { ReminderCardParamsList } from "../types";
import { Text, View } from "./Themed";

export default function ReminderCard({
  reminder,
  onRemoveItem,
}: ReminderCardParamsList) {
  return (
    <View
      style={[globalStyles.containerCard, { backgroundColor: reminder.color }]}
    >
      <View
        style={[globalStyles.topBarCard, { backgroundColor: reminder.color }]}
      >
        <Text style={globalStyles.titleCard}>{reminder.title}</Text>
        <TouchableOpacity onPress={() => onRemoveItem()}>
          <FontAwesome name="trash" size={20} color={"#000"}></FontAwesome>
        </TouchableOpacity>
      </View>
      <Text style={[globalStyles.descriptionCard, { marginBottom: 10 }]}>
        {reminder.description}
      </Text>
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
  dateText: {
    color: "#000",
    fontSize: 12,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
  },
});
