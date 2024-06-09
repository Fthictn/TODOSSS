import { useState } from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  const [removedCourseGoals, setRemovedCourseGoals] = useState([]);
  
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {

    const goalToDelete = courseGoals.find(goal => goal.id === id);

    setRemovedCourseGoals((removedCourseGoals)=>[
      ...removedCourseGoals,
      goalToDelete
    ]);

    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });

  }

  function deleteDeletedGoalHandler(id){
    setRemovedCourseGoals((currentDeletedCourseGoals) => {
      return currentDeletedCourseGoals.filter((deletedGoal) => deletedGoal.id !== id);
    });
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <View style={styles.centerDividerContainer}>
          <Text style={styles.centerDividerText}>Todo</Text>
        </View>
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
          onContinue={setModalIsVisible}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  item={itemData.item}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.id}
                  isDeleteItem={false}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
        <View style={styles.centerDividerContainer}>
          <Text style={styles.centerDividerText}>Done</Text>
        </View>
        <View style={styles.goalsContainer}>
          <FlatList
            data={removedCourseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  item={itemData.item}
                  onDeleteItem={deleteDeletedGoalHandler}
                  id={itemData.item.id}
                  isDeleteItem={true}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
        <View style={styles.addButtonContainer}>
          <Button
            title="Add An Item"
            color="#579835"
            onPress={startAddGoalHandler}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 16,
    backgroundColor: "#aed58b",
  },

  goalsContainer: {
    flex: 5,
  },
  centerDividerContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  centerDividerText: {
    color: "#579835",
    borderBottomWidth: 1,
    borderBottomColor: "#579835",
    paddingBottom: 10,
    width: "100%",
    fontSize: 17,
    fontWeight:"bold"
  },
  addButtonContainer:{
    flex:1,
    justifyContent:"flex-end"
  }
});
