import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList} from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import {EssayData} from "../constants/dummyData"
import ActionButton from "../components/ActionButton";
import EssayCard from "../components/EssayCard";
import Header from "../components/header";



const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Home = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header => ({ "Home",navigation.navigate(Home)  )?> */}

      {/* <StatusBar style="auto" /> */}

       <FlatList
        //numColumns={2}
        data={EssayData}
        renderItem={({item}) => <EssayCard data = {item}/> }
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
