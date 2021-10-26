import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import DraggableFlatList, {
  RenderItemParams
} from "react-native-draggable-flatlist";
import { Text, View } from "../components/Themed";
import cardColors from "../constants/CardColors";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import useColorScheme from "../hooks/useColorScheme";
import storageHelper from "../storage/StorageHelper";
import { RootStackScreenProps, ToDoItem, ToDoList } from "../types";

export default function ModalScreenToDoList({
  navigation,
}: RootStackScreenProps<"ModalToDoList">) {
  const colorScheme = useColorScheme();
  const [selectedColor, setSlectedColor] = React.useState(cardColors[0].color);
  const [toDoTitle, setToDoTitle] = React.useState("");

  const [counter, setCounter] = React.useState(1);
  const [toDoItems, setToDoItems] = React.useState<ToDoItem[]>([]);

  var myToDoList: ToDoList = {
    storageKey: "",
    color: "",
    title: "",
    toDoItems: [],
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

  const renderItem = React.useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<ToDoItem>) => {
      return (
        <TouchableOpacity
          style={{
            height: 70,
            width: "100%",
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderColor: Colors[colorScheme].text,
            borderBottomWidth: 1,
          }}
          onLongPress={drag}
        >
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontSize: 16,
            }}
          >
            {item.order.toString() + ". " + item.description}
          </Text>
          <Pressable
            onPress={() => {
              removeData(item);
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <FontAwesome
              name="trash-o"
              size={30}
              color={Colors[colorScheme].primary}
            />
          </Pressable>
        </TouchableOpacity>
      );
    },
    []
  );

  const addData = (desc: string) => {
    var newItem: ToDoItem = {
      storageKey: storageHelper.makeid(8),
      order: counter,
      description: desc,
      done: 0,
    };
    setCounter((counter) => counter + 1);
    setToDoItems((toDoItems) => [...toDoItems, newItem]);
  };

  const removeData = React.useCallback((itemToDelete: ToDoItem) => {
    setToDoItems((toDoItems) =>
      toDoItems.filter((item2) => item2.storageKey !== itemToDelete.storageKey)
    );
    setToDoItems((toDoItems) =>
      toDoItems.map((item2, index) => {
        var tmp = item2;
        tmp.order = index + 1;
        return tmp;
      })
    );
    setCounter((counter) => counter - 1);
  }, []);

  const handleDrag = (data: ToDoItem[]) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      element.order = index + 1;
    }
    setToDoItems(data);
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
              maxWidth: "80%",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <TextInput
            style={[
              {
                minWidth: "60%",
                borderRadius: 15,
                padding: 10,
                margin: 10,
                backgroundColor: Colors[colorScheme].textBackground,
                color: Colors[colorScheme].text,
              },
            ]}
          />
          <Pressable
            onPress={() => addData(toDoTitle)}
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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DraggableFlatList
          data={toDoItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.order}`}
          onDragEnd={({ data }) => handleDrag(data)}
          containerStyle={{ maxWidth: "80%" }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          myToDoList.storageKey = storageHelper.makeid(8);
          myToDoList.color = selectedColor;
          myToDoList.title = toDoTitle;
          myToDoList.toDoItems = toDoItems;
          if (toDoTitle.trim() === "" || toDoItems.length == 0) {
            Alert.alert(
              "Saisie invalide",
              "L'un des champs n'a pas été renseigné"
            );
          } else {
            storageHelper.storeData(myToDoList.storageKey, myToDoList).then(
              () => {
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
