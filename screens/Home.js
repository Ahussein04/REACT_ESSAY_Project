import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useEffect } from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList} from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import ActionButton from "../components/ActionButton";
import EssayCard from "../components/EssayCard";
import {firebase} from '../config'


const Home = ({ navigation }) => {

  const [essays, setEssays] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("essays").get().then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        essay: doc.data().essay,
        lastEdited: doc.data().edited,
      }));
      setEssays(data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      {/* <StatusBar style="auto" /> */}

       <FlatList
        //numColumns={2}
        data={essays}
        renderItem={({item}) => <EssayCard data={item} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.addEssayContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter essay title"
          onChangeText={text => setNewEssayTitle(text)}
          value={newEssayTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter essay Questions"
          multiline={true}
          numberOfLines={4}
          onChangeText={text => setNewEssayContent(text)}
          value={newEssayContent}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addNewEssay}
        >
          <Text style={styles.addButtonText}>Add Essay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  addEssayContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Home;
