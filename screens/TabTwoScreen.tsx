import * as React from "react";
import { View } from "../components/Themed";
import { Reminder, RootTabScreenProps } from "../types";

import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import notificationHelper from "../storage/NotificationsHelper";
import useColorScheme from "../hooks/useColorScheme";
import storageHelper from "../storage/StorageHelper";
import globalStyles from "../constants/Styles";
import Colors from "../constants/Colors";
import IdeaCard from "../components/IdeaCard";
import ReminderCard from "../components/ReminderCard";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const colorScheme = useColorScheme();

  const [serachTerm, setSearchTerm] = React.useState("");

  const [ideasLoaded, setIdeasLoaded] = React.useState(false);
  const [ideasElementsLeft, setIdeasElementsLeft] = React.useState<Reminder[]>(
    []
  );
  const [ideasElementsRight, setIdeasElementsRight] = React.useState<
    Reminder[]
  >([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const loadItems = () => {
    if (
      ideasElementsLeft.length === 0 &&
      ideasElementsRight.length === 0 &&
      !ideasLoaded
    ) {
      storageHelper.getAllItems().then(
        (value) => {
          setIdeasElementsLeft((ideasElementsLeft) => []);
          setIdeasElementsRight((ideasElementsRight) => []);
          if (value !== undefined) {
            let cpt = 0;
            value.forEach((element) => {
              //Vérification pas idée
              if (element.dateTime !== undefined) {
                if (cpt % 2 === 0) {
                  setIdeasElementsLeft((ideasElementsLeft) => [
                    ...ideasElementsLeft,
                    element,
                  ]);
                } else {
                  setIdeasElementsRight((ideasElementsRight) => [
                    ...ideasElementsRight,
                    element,
                  ]);
                }
                cpt++;
              }
            });
            setIdeasLoaded(true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  loadItems();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIdeasLoaded(false);

    wait(2000).then(() => {
      loadItems();
      setRefreshing(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={"Rechercher..."}
        onChangeText={(text) => setSearchTerm(text)}
        style={[
          globalStyles.input,
          {
            backgroundColor: Colors[colorScheme].textBackground,
            color: Colors[colorScheme].text,
            alignSelf: "center",
          },
        ]}
      ></TextInput>
      <SafeAreaView style={[{ flex: 1, flexDirection: "row" }]}>
        <ScrollView>
          <View style={[{ flexDirection: "row" }]}>
            <View style={[styles.column]}>
              {ideasElementsLeft
                .filter((value) => {
                  if (serachTerm.trim() === "") {
                    return value;
                  } else if (
                    value.title.toLowerCase().includes(serachTerm.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((val, key) => {
                  return (
                    <ReminderCard
                      key={val.storageKey}
                      storageKey={val.storageKey}
                      color={val.color}
                      title={val.title}
                      description={val.description}
                      dateTime={val.dateTime}
                    ></ReminderCard>
                  );
                })}
            </View>
            <View style={[styles.column]}>
              {ideasElementsRight
                .filter((value) => {
                  if (serachTerm.trim() === "") {
                    return value;
                  } else if (
                    value.title.toLowerCase().includes(serachTerm.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((val, key) => {
                  return (
                    <ReminderCard
                      key={val.storageKey}
                      storageKey={val.storageKey}
                      color={val.color}
                      title={val.title}
                      description={val.description}
                      dateTime={val.dateTime}
                    ></ReminderCard>
                  );
                })}
            </View>
          </View>
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
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
