import { StyleSheet, View, Button, Text, Pressable } from "react-native";

function GoalItem(props) {
  function deleteGoalItem() {
    props.onDeleteItem(props.id);
  }

  return (
    <View style={[styles.goalItem,props.isDeleteItem && styles.deletedItemContainer]}>
      <Pressable onPress={deleteGoalItem} android_ripple={{ color: "#210644" }}>
        <Text
          style={[
            styles.goalItemText,
            props.isDeleteItem && styles.toUnderlineText,
          ]}
        >
          {props.item.text}
        </Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#579835",
    color: "white",
  },
  toUnderlineText: {
    textDecorationStyle: "solid",
    textDecorationLine: "line-through",
  },
  deletedItemContainer:{
    backgroundColor:"#71bd46"
  },
  goalItemText: {
    color: "#FFFFFF",
    padding: 8,
  },
});
