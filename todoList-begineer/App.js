import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";

export default function App() {
  const [task, setTask] = useState({
    current: "",
    allTasks: [],
  });

  function pressEvent(enteredText) {
    setTask((prev) => {
      return {
        ...prev,
        current: enteredText,
      };
    });
  }

  function handleClick() {
    setTask((prev) => {
      let prevTask = prev.allTasks;
      prevTask.push(prev.current);

      return {
        allTasks: prevTask,
        current: "",
      };
    });
  }

  function deleteItem(ind){
    setTask((prev)=>{
      return {
        ...prev,
        allTasks: prev.allTasks.filter((item,index)=>(index !== ind ))
      }
    })
  }

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Your Tasks"
          style={styles.input}
          onChangeText={pressEvent}
          value={task.current}
        />
        <Button title="ADD" onPress={handleClick} />
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={task.allTasks}
        renderItem={itemData => (
          <View style={styles.listItems}>
            <Text onPress={()=>(deleteItem(itemData.index))}>* {itemData.item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    paddingTop: 70
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
  listItems: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 2,
  },
});
