import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import plus from '../assets/plus.png';

const ActionButton = () => {
  return (
    <TouchableOpacity style={styles.addButton}>
        <Image source={plus} style = {styles.icon} />
        <StatusBar style="auto" />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  addButton: {
    width: 77,
    height: 77,
    borderRadius: 100,
    backgroundColor: '#808080',
    display: 'flex',
    bottom: 0,
    right: 0,
    position: 'absolute',
    marginRight: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 49,
    height: 49,

  }

});

export default ActionButton