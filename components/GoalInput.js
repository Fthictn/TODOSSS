import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Image,
  Alert,
} from "react-native";

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText == "") {
      createAlert();
      return;
    }

    props.onAddGoal(enteredGoalText);
    setEnteredGoalText("");
    props.onContinue(true);
  }

  function cancelGoalHandler() {
    props.onCancel();
    setEnteredGoalText("");
  }

  function createAlert() {
    Alert.alert(
      "Uyarı!",
      "Lütfen boş göndermeyiniz!",
      [
        {
          text: "tamam",
          onPress: () => {
            console.log("OK");
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log("DISMISSED"),
      }
    );
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/icon.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="What to do?"
          placeholderTextColor="white"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add" onPress={addGoalHandler} color="#579835" />
          </View>
          <View style={styles.button}>
            <Button title="Close" onPress={cancelGoalHandler} color="#579835" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#aed58b",
  },

  textInput: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    width: "100%",
    padding: 16,
    color: "white",
  },

  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: "100",
    marginHorizontal: 8,
  },

  image: {
    width: 251,
    height: 251,
    margin: 19,
    borderRadius: 50
  },
});
