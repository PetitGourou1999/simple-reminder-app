import * as React from "react";
import { Alert, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import cardColors from "../constants/CardColors";
import Colors from "../constants/Colors";
import Strings from "../constants/Strings";
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
    storageKey: "",
    color: "",
    title: "",
    description: "",
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
    <View style={globalStyles.containerModal}>
      <Text>{Strings.colorLabel}</Text>
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
      <Text>{Strings.ideaTitlelabel}</Text>
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
      <Text>{Strings.ideaDescriptionLabel}</Text>
      <TextInput
        onChangeText={(text) => setIdeaDescritpion(text)}
        multiline={true}
        numberOfLines={5}
        style={[
          globalStyles.input,
          {
            backgroundColor: Colors[colorScheme].textBackground,
            color: Colors[colorScheme].text,
            minHeight: 150,
          },
        ]}
      />
      <TouchableOpacity
        onPress={() => {
          myIdea.storageKey = storageHelper.makeid(8);
          myIdea.color = selectedColor;
          myIdea.title = ideaTitle;
          myIdea.description = ideaDescription;
          if (ideaTitle.trim() === "" || ideaDescription.trim() === "") {
            Alert.alert(Strings.alertSaisieTitle, Strings.alertSaisieLabel);
          } else {
            storageHelper.storeData(myIdea.storageKey, myIdea).then(
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
        <Text>{Strings.buttonAjouterLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
