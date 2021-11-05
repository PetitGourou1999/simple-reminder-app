import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text, View } from "../components/Themed";
import cardColors from "../constants/CardColors";
import Colors from "../constants/Colors";
import Strings from "../constants/Strings";
import globalStyles from "../constants/Styles";
import useColorScheme from "../hooks/useColorScheme";
import storageHelper from "../storage/StorageHelper";
import { Reminder, RootStackScreenProps } from "../types";

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
    storageKey: "",
    color: "",
    title: "",
    description: "",
    dateTime: new Date(),
  };

  const buttonsListArr = cardColors.map((colorInfo) => (
    <TouchableOpacity
      key={colorInfo.color}
      onPress={() => setSlectedColor(colorInfo.color)}
      style={[
        globalStyles.touchableColor,
        {
          backgroundColor: colorInfo.color,
          borderColor: Colors[colorScheme].selectedColor,
          borderWidth: selectedColor === colorInfo.color ? 2 : 0,
        },
      ]}
    ></TouchableOpacity>
  ));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.containerModal}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={globalStyles.containerModal}>
          <Text>{Strings.colorLabel}</Text>
          <View style={[globalStyles.touchableColorContainer]}>
            {buttonsListArr}
          </View>
          <Text>{Strings.reminderDateLabel}</Text>
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
              onCancel={handleConfirm}
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
              style={[styles.calendarButton]}
            >
              <FontAwesome
                name="calendar"
                size={25}
                color={Colors[colorScheme].text}
              ></FontAwesome>
            </TouchableOpacity>
          </View>
          <Text>{Strings.reminderTitlelabel}</Text>
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
          <Text>{Strings.reminderDescriptionLabel}</Text>
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
              myReminder.storageKey = storageHelper.makeid(8);
              myReminder.color = selectedColor;
              myReminder.title = reminderTitle;
              myReminder.description = reminderDescription;
              myReminder.dateTime = reminderDateStart;
              if (
                reminderTitle.trim() === "" ||
                reminderDescription.trim() === ""
              ) {
                Alert.alert(Strings.alertSaisieTitle, Strings.alertSaisieLabel);
              } else {
                storageHelper.storeData(myReminder.storageKey, myReminder).then(
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
            <Text>{Strings.buttonAjouterLabel}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  datePickerContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  calendarButton: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
    marginLeft: -50,
  },
});
