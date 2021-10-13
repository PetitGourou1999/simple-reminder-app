import * as React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import { Reminder, RootStackScreenProps } from "../types";
import cardColors from "../constants/CardColors";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import storageHelper from "../storage/StorageHelper";
import { FontAwesome } from "@expo/vector-icons";
import notificationHelper from "../storage/NotificationsHelper";
import useIsMounted from "../hooks/useIsMounted";

/*function NotificationSender(reminder: Reminder) {
  const isMounted = useIsMounted();
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);

  React.useEffect(() => {
    notificationHelper.askPermissions().then(
      (token) => {
        if (token !== undefined) {
          setExpoPushToken(token);
          notificationHelper
            .scheduleNotification(reminder.title, "", reminder.dateTime)
            .then(
              () => {
                console.log("Sent");
              },
              (error) => {
                console.log(error);
              }
            );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, [isMounted]);
  return <View></View>;
}*/

export default function ModalScreenReminder({
  navigation,
}: RootStackScreenProps<"ModalReminder">) {
  const colorScheme = useColorScheme();

  const [selectedColor, setSlectedColor] = React.useState(cardColors[0].color);

  const [reminderTitle, setReminderTitle] = React.useState("");
  const [reminderDescription, setReminderDescritpion] = React.useState("");

  const [reminderDateStart, setReminderDateStart] = React.useState(new Date());

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setReminderDateStart(date);
    hideDatePicker();
  };

  var myReminder: Reminder = {
    key: "",
    color: "",
    title: "",
    description: "",
    dateTime: new Date("1900-01-01"),
  };

  const buttonsListArr = cardColors.map((colorInfo) => (
    <TouchableOpacity
      key={colorInfo.color}
      onPress={() => setSlectedColor(colorInfo.color)}
      style={[
        styles.touchableColor,
        {
          backgroundColor: colorInfo.color,
          borderColor: Colors[colorScheme].selectedColor,
          borderWidth: selectedColor === colorInfo.color ? 2 : 0,
        },
      ]}
    ></TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={[styles.container]}>
          <Text>Couleur : </Text>
          <View
            style={[
              {
                width: "80%",
                flexDirection: "row",
                justifyContent: "space-around",
              },
            ]}
          >
            {buttonsListArr}
          </View>
          <Text>Date du rappel : </Text>
          <View
            style={[
              styles.datePickerContainer,
              globalStyles.input,
              {
                backgroundColor: Colors[colorScheme].textBackground,
              },
            ]}
          >
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
              locale="fr-FR"
            />
            <Text>
              {reminderDateStart.toLocaleTimeString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
              }}
              style={[
                {
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  borderRadius: 20,
                  marginLeft: -50,
                },
              ]}
            >
              <FontAwesome
                name="calendar"
                size={25}
                color={Colors[colorScheme].text}
              ></FontAwesome>
            </TouchableOpacity>
          </View>
          <Text>Titre du rappel : </Text>
          <TextInput
            onChangeText={(text) => setReminderTitle(text)}
            style={[
              globalStyles.input,
              {
                backgroundColor: Colors[colorScheme].textBackground,
                color: Colors[colorScheme].text,
              },
            ]}
          />
          <Text>Description du rappel : </Text>
          <TextInput
            onChangeText={(text) => setReminderDescritpion(text)}
            multiline={true}
            numberOfLines={3}
            style={[
              globalStyles.input,
              {
                backgroundColor: Colors[colorScheme].textBackground,
                color: Colors[colorScheme].text,
                minHeight: "20%",
              },
            ]}
          />
          <TouchableOpacity
            onPress={() => {
              myReminder.key = storageHelper.makeid(8);
              myReminder.color = selectedColor;
              myReminder.title = reminderTitle;
              myReminder.description = reminderDescription;
              if (
                reminderTitle.trim() === "" ||
                reminderDescription.trim() === "" ||
                reminderDateStart === new Date("1900-01-01")
              ) {
                Alert.alert(
                  "Saisie invalide",
                  "L'un des champs n'a pas été renseigné"
                );
              } else {
                storageHelper.storeData(myReminder.key, myReminder).then(
                  () => {
                    //NotificationSender(myReminder);
                    navigation.goBack();
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
            }}
            style={[
              globalStyles.button,
              { backgroundColor: Colors[colorScheme].primary },
            ]}
          >
            <Text>Ajouter</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  datePickerContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
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
