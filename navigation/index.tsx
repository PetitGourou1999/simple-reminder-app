/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import Colors from "../constants/Colors";
import Strings from "../constants/Strings";
import useColorScheme from "../hooks/useColorScheme";
import IdeasScreen from "../screens/IdeasScreen";
import ModalScreenIdea from "../screens/ModalScreenIdea";
import ModalScreenReminder from "../screens/ModalScreenReminder";
import ModalScreenToDoList from "../screens/ModalScreenToDoList";
import NotFoundScreen from "../screens/NotFoundScreen";
import RemindersScreen from "../screens/RemindersScreen";
import ToDoListScreen from "../screens/ToDoListScreen";
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: Strings.titleNotFound }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="ModalIdea"
          component={ModalScreenIdea}
          options={({ navigation }: RootStackScreenProps<"ModalIdea">) => ({
            title: Strings.titleNewIdea,
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="ModalReminder"
          component={ModalScreenReminder}
          options={({ navigation }: RootStackScreenProps<"ModalReminder">) => ({
            title: Strings.titleNewReminder,
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="ModalToDoList"
          component={ModalScreenToDoList}
          options={({ navigation }: RootStackScreenProps<"ModalToDoList">) => ({
            title: Strings.titleNewToDo,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={IdeasScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: Strings.titleMyIdeas,
          tabBarIcon: ({ color }) => <TabBarIcon name="paste" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("ModalIdea")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="plus-circle"
                size={25}
                color={Colors[colorScheme].secondary}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={RemindersScreen}
        options={({ navigation }: RootTabScreenProps<"TabTwo">) => ({
          title: Strings.titleMyReminders,
          tabBarIcon: ({ color }) => <TabBarIcon name="bell-o" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("ModalReminder")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="plus-circle"
                size={25}
                color={Colors[colorScheme].secondary}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabThree"
        component={ToDoListScreen}
        options={({ navigation }: RootTabScreenProps<"TabThree">) => ({
          title: Strings.titleMyToDos,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="check-square-o" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("ModalToDoList")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="plus-circle"
                size={25}
                color={Colors[colorScheme].secondary}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
