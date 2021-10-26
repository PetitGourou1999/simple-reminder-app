/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type Idea = {
  storageKey: string;
  color: string;
  title: string;
  description: string;
};

export type Reminder = {
  storageKey: string;
  color: string;
  title: string;
  description: string;
  dateTime: Date;
};

export type ToDoItem = {
  storageKey: string;
  order: number;
  description: string;
  done: number;
};

export type ToDoList = {
  storageKey: string;
  color: string;
  title: string;
  toDoItems: ToDoItem[];
};

export type ToDoItemCheckBoxState = {
  item: ToDoItem,
  value: boolean
}

export type IdeaCardParamsList = {
  idea: Idea;
  onRemoveItem: any;
};

export type ReminderCardParamsList = {
  reminder: Reminder;
  onRemoveItem: any;
};

export type ToDoListCardParamsList = {
  toDoList: ToDoList;
  onRemoveItem: any;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  ModalIdea: undefined;
  ModalReminder: undefined;
  ModalToDoList: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
