import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
});

export default Home;
