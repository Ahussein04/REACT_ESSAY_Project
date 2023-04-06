import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { firebase } from "../config";

const AddEssay = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [essay, setEssay] = useState("");

  const handleSave = () => {
    const db = firebase.firestore();
    const currentUser = 'UL4UJuvWClL2RSdJNI8R';

    db.collection("essays")
      .add({
        userId: currentUser,
        title: title,
        essay: essay,
        createdAt: 'hello',
      })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title here"
      />

      <Text style={[styles.label, { marginTop: 20 }]}>Essay:</Text>
      <TextInput
        style={[styles.input, { height: 200 }]}
        value={essay}
        onChangeText={setEssay}
        placeholder="Write your essay here"
        multiline={true}
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save & Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddEssay;
