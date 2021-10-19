import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

class NotificationsHelper {
  public askPermissions = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  public scheduleNotification = async (
    title: string,
    body: string,
    date: Date
  ) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: {
        date: date,
        repeats: false,
      },
    });
  };
}

const notificationHelper = new NotificationsHelper();
export default notificationHelper;
