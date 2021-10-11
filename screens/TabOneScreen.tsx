import * as React from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import IdeaCard from "../components/IdeaCard";

import { Text, View } from "../components/Themed";
import storageHelper from "../storage/StorageHelper";
import { Idea, RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [ideasLoaded, setIdeasLoaded] = React.useState(false);
  const [ideasElementsLeft, setIdeasElementsLeft] = React.useState<
    JSX.Element[]
  >([]);
  const [ideasElementsRight, setIdeasElementsRight] = React.useState<
    JSX.Element[]
  >([]);

  if (
    ideasElementsLeft.length === 0 &&
    ideasElementsRight.length === 0 &&
    !ideasLoaded
  ) {
    storageHelper.getAllItems().then(
      (value) => {
        if (value !== undefined) {
          let cpt = 0;
          value.forEach((element) => {
            cpt++;
            if (cpt % 2 === 1) {
              setIdeasElementsLeft((ideasElementsLeft) => [
                ...ideasElementsLeft,
                <IdeaCard
                  key={element.key}
                  color={element.color}
                  title={element.title}
                  description={element.description}
                ></IdeaCard>,
              ]);
            } else {
              setIdeasElementsRight((ideasElementsRight) => [
                ...ideasElementsRight,
                <IdeaCard
                  key={element.key}
                  color={element.color}
                  title={element.title}
                  description={element.description}
                ></IdeaCard>,
              ]);
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

  return (
    <View style={styles.container}>
      <SafeAreaView style={[{ flex: 1, flexDirection: "row" }]}>
        <ScrollView>
          <View style={[{ flexDirection: "row" }]}>
            <View style={[styles.column]}>{ideasElementsRight}</View>
            <View style={[styles.column]}>{ideasElementsLeft}</View>
          </View>
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
