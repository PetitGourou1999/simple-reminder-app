import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import storageHelper from "../storage/StorageHelper";
import { ToDoItemCheckBoxState, ToDoListCardParamsList } from "../types";
import { Text, View } from "./Themed";

export default function ToDoListCard({ toDoList, onRemoveItem }: ToDoListCardParamsList) {
    const [itemsDone, setItemsDone] = React.useState<ToDoItemCheckBoxState[]>([])

    const initItemsDone = () => {
        setItemsDone([])
        toDoList.toDoItems.forEach((item) => {
            var newItem: ToDoItemCheckBoxState = {
                item: item,
                value: item.done == 0 ? false : true
            }
            setItemsDone((itemsDone) => [...itemsDone, newItem])
        })
    }

    if (itemsDone.length === 0) {
        initItemsDone();
    }

    const setItemValue = React.useCallback((wrapper: ToDoItemCheckBoxState) => {
        setItemsDone((itemsDone) =>
            itemsDone.map((wrapper2, index) => {
                if (wrapper2.item.storageKey === wrapper.item.storageKey) {
                    wrapper2.value = !wrapper2.value
                    var tmp = toDoList
                    tmp.toDoItems.forEach((item) => {
                        if (item.storageKey === wrapper.item.storageKey) {
                            if (item.done == 1)
                                item.done = 0
                            else
                                item.done = 1
                        }
                    })
                    storageHelper.storeData(tmp.storageKey, tmp)
                }
                return wrapper2;
            })
        );
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: toDoList.color }]}>
            <View style={[styles.topBar, { backgroundColor: toDoList.color }]}>
                <Text style={styles.title}>{toDoList.title}</Text>
                <TouchableOpacity onPress={() => console.log(toDoList)}>
                    <FontAwesome name="trash" size={20} color={"#000"}></FontAwesome>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column' }}>
                {itemsDone.map((wrapper, key) => {
                    return (<View key={wrapper.item.storageKey} style={[styles.item, { backgroundColor: toDoList.color }]}>
                        <CheckBox
                            uncheckedColor={"#000"}
                            checkedColor={"#000"}
                            containerStyle={{ margin: 0, padding: 0, borderWidth: 0, backgroundColor: toDoList.color }}
                            onPress={() => setItemValue(wrapper)}
                            title={wrapper.item.description}
                            checked={wrapper.value}
                        />
                    </View>)
                })}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "90%",
        borderRadius: 5,
        padding: 20,
        marginVertical: 10,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    title: {
        color: "#000",
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold",
        paddingRight: 10,
    },
    description: {
        color: "#000",
        fontSize: 14,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'baseline',
        minHeight: 30
    }
});