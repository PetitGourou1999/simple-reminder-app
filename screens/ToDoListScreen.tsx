import * as React from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { View } from "../components/Themed";
import ToDoListCard from "../components/ToDoListCard";
import Colors from "../constants/Colors";
import Strings from "../constants/Strings";
import globalStyles from "../constants/Styles";
import useColorScheme from "../hooks/useColorScheme";
import storageHelper from "../storage/StorageHelper";
import { RootTabScreenProps, ToDoList } from "../types";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function ToDoListScreen({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  const colorScheme = useColorScheme();

  const [serachTerm, setSearchTerm] = React.useState("");

  const [ideasLoaded, setIdeasLoaded] = React.useState(false);
  const [ideasElementsLeft, setIdeasElementsLeft] = React.useState<ToDoList[]>(
    []
  );

  const [refreshing, setRefreshing] = React.useState(false);

  const removeItem = (storageKey: string) => {
    storageHelper.removeData(storageKey).then(
      () => {
        setIdeasElementsLeft((ideasElementsLeft) => []);
        setIdeasLoaded(false);
        loadItems();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const loadItems = () => {
    if (ideasElementsLeft.length === 0 && !ideasLoaded) {
      storageHelper.getAllItems().then(
        (value) => {
          setIdeasElementsLeft((ideasElementsLeft) => []);

          if (value !== undefined) {
            let cpt = 0;
            value.forEach((element) => {
              //Vérification pas rappel ou idée
              if (element.toDoItems !== undefined) {
                setIdeasElementsLeft((ideasElementsLeft) => [
                  ...ideasElementsLeft,
                  element,
                ]);

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
    <View style={globalStyles.container}>
      <TextInput
        placeholder={Strings.researchPlaceholder}
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
            <View style={[globalStyles.column]}>
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
                      <ToDoListCard
                        key={val.storageKey}
                        toDoList={val}
                        onRemoveItem={() => removeItem(val.storageKey)}
                      ></ToDoListCard>
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
