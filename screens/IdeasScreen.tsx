import * as React from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import IdeaCard from "../components/IdeaCard";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import useColorScheme from "../hooks/useColorScheme";
import storageHelper from "../storage/StorageHelper";
import { Idea, RootTabScreenProps } from "../types";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function IdeasScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const colorScheme = useColorScheme();

  const [serachTerm, setSearchTerm] = React.useState("");

  const [ideasLoaded, setIdeasLoaded] = React.useState(false);
  const [ideasElementsLeft, setIdeasElementsLeft] = React.useState<Idea[]>([]);
  const [ideasElementsRight, setIdeasElementsRight] = React.useState<Idea[]>(
    []
  );

  const [refreshing, setRefreshing] = React.useState(false);

  const removeItem = (storageKey: string) => {
    storageHelper.removeData(storageKey).then(
      () => {
        setIdeasElementsLeft((ideasElementsLeft) => []);
        setIdeasElementsRight((ideasElementsRight) => []);
        setIdeasLoaded(false);
        loadItems();
      },
      (error) => {
        console.log(error);
      }
    );
  };

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
              //Vérification pas rappel
              if (element.dateTime === undefined) {
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
                  if (val !== null) {
                    return (
                      <IdeaCard
                        key={val.storageKey}
                        idea={val}
                        onRemoveItem={() => removeItem(val.storageKey)}
                      ></IdeaCard>
                    );
                  }
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
                  if (val !== null) {
                    return (
                      <IdeaCard
                        key={val.storageKey}
                        idea={val}
                        onRemoveItem={() => removeItem(val.storageKey)}
                      ></IdeaCard>
                    );
                  }
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
