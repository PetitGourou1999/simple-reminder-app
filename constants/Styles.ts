import { StyleSheet } from "react-native";
import Colors from "./Colors";

const globalStyles = StyleSheet.create({
  /*-----------SCREENS-----------*/
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
  /*-----------MODALS-----------*/
  containerModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  touchableColor: {
    width: 25,
    height: 25,
    borderRadius: 13,
  },
  touchableColorContainer: {
    minWidth: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  /*-----------FORMS-----------*/
  input: {
    minWidth: "80%",
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    minWidth: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
  },
  /*-----------CARDS-----------*/
  containerCard: {
    width: "90%",
    borderRadius: 5,
    padding: 20,
    marginVertical: 10,
  },
  topBarCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  titleCard: {
    color: Colors["light"].text,
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    paddingRight: 10,
  },
  descriptionCard: {
    color: Colors["light"].text,
    fontSize: 14,
  },
});

export default globalStyles;
