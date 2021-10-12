import * as React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import cardColors from "../constants/CardColors";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import useColorScheme from "../hooks/useColorScheme";
import storageHelper from "../storage/StorageHelper";
import { Idea, RootStackScreenProps } from "../types";

export default function ModalScreenIdea({
  navigation,
}: RootStackScreenProps<"ModalIdea">) {
  const colorScheme = useColorScheme();
  const [selectedColor, setSlectedColor] = React.useState(cardColors[0].color);

  const [ideaTitle, setIdeaTitle] = React.useState("");
  const [ideaDescription, setIdeaDescritpion] = React.useState("");

  var myIdea: Idea = {
    key: "",
    color: "",
    title: "",
    description: "",
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
                minWidth: "80%",
                flexDirection: "row",
                justifyContent: "space-around",
              },
            ]}
          >
            {buttonsListArr}
          </View>
          <Text>Titre de l'idée : </Text>
          <TextInput
            onChangeText={(text) => setIdeaTitle(text)}
            style={[
              globalStyles.input,
              {
                backgroundColor: Colors[colorScheme].textBackground,
                color: Colors[colorScheme].text,
              },
            ]}
          />
          <Text>Description de l'idée : </Text>
          <TextInput
            onChangeText={(text) => setIdeaDescritpion(text)}
            multiline={true}
            numberOfLines={5}
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
              myIdea.key = storageHelper.makeid(8);
              myIdea.color = selectedColor;
              myIdea.title = ideaTitle;
              myIdea.description = ideaDescription;
              if (ideaTitle.trim() === "" || ideaDescription.trim() === "") {
                Alert.alert(
                  "Saisie invalide",
                  "L'un des champs n'a pas été renseigné"
                );
              } else {
                storageHelper.storeData(myIdea.key, myIdea).then(
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
