import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { Text, View } from "../components/Themed";
import cardColors from "../constants/CardColors";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import useColorScheme from "../hooks/useColorScheme";
import { RootStackScreenProps, ToDoItem, ToDoList } from "../types";

export default function ModalScreenToDoList({
  navigation,
}: RootStackScreenProps<"ModalToDoList">) {
  const colorScheme = useColorScheme();
  const [selectedColor, setSlectedColor] = React.useState(cardColors[0].color);
  const [toDoTitle, setToDoTitle] = React.useState("");
  const [toDoItems, setToDoItems] = React.useState<ToDoItem[]>([]);

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

  const renderItem = React.useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<ToDoItem>) => {
      return (
        <TouchableOpacity
          style={{
            height: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
          onLongPress={drag}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 32,
            }}
          >
            {item.description}
          </Text>
        </TouchableOpacity>
      );
    },
    []
  );

  const addData = () => {};

  var myToDoList: ToDoList = {
    storageKey: "",
    color: "",
    title: "",
    toDoItems: [],
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Couleur : </Text>
        <View
          style={[
            {
              minWidth: "80%",
              flexDirection: "row",
              justifyContent: "space-around",
            },
          ]}
        >
          {buttonsListArr}
        </View>
        <Text>Titre de la liste : </Text>
        <TextInput
          onChangeText={(text) => setToDoTitle(text)}
          style={[
            globalStyles.input,
            {
              backgroundColor: Colors[colorScheme].textBackground,
              color: Colors[colorScheme].text,
            },
          ]}
        />
        <Text>Ajouter une tâche : </Text>
        <View
          style={[
            {
              minWidth: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <TextInput
            style={[
              globalStyles.input,
              {
                backgroundColor: Colors[colorScheme].textBackground,
                color: Colors[colorScheme].text,
              },
            ]}
          />
          <Pressable
            onPress={() => setToDoItems((toDoItems) => [...toDoItems])}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <FontAwesome
              name="plus-circle"
              size={30}
              color={Colors[colorScheme].quaternary}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.container}>
        <DraggableFlatList
          data={toDoItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.order}`}
          onDragEnd={({ data }) => setToDoItems(data)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
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
