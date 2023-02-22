import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { COLORS, SIZES } from "../constants/theme";


const Essay = () => {
  return (
    <View style={styles.container}>
      <Text>EssayScreen</Text>
      <StatusBar style="auto" />

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

export default Essay;
