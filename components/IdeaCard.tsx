import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import { IdeaCardParamsList } from "../types";
import { Text, View } from "./Themed";

export default function IdeaCard({ idea, onRemoveItem }: IdeaCardParamsList) {
  return (
    <View style={[globalStyles.containerCard, { backgroundColor: idea.color }]}>
      <View style={[globalStyles.topBarCard, { backgroundColor: idea.color }]}>
        <Text style={globalStyles.titleCard}>{idea.title}</Text>
        <TouchableOpacity onPress={() => onRemoveItem()}>
          <FontAwesome
            name="trash"
            size={20}
            color={Colors["light"].text}
          ></FontAwesome>
        </TouchableOpacity>
      </View>
      <Text style={globalStyles.descriptionCard}>{idea.description}</Text>
    </View>
  );
}
