import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import ActionButton from "../components/ActionButton";
import TestScreen from "../components/TestScreen";
import { Header } from 'react-native-elements';


const Home = () => {
  return (

    <View>

      <View style = {styles.header}>
       <StatusBar style="auto" />
        <Text style = {styles.headText}>Essay Home</Text>
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: COLORS.red,
  }

});

export default Home;
