import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import ActionButton from "../components/ActionButton";
import TestScreen from "../components/TestScreen";


const Home = () => {
  return (
    <View style={styles.container}>
      <Text>ome</Text>
      <StatusBar style="auto" />

      <TestScreen/>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }

});

export default Home;
