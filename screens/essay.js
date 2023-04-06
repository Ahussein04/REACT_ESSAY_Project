import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import { useNavigation, useRoute } from '@react-navigation/native';
import {firebase} from './config'


const Essay = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;
  const preWritten = data.essay;
  const [ essay, setEssay] = useState(preWritten);

  const handleEssayChange = async (text) => {
    setEssay(text);
    console.log(data.id);
    const userId = firebase.auth().currentUser.uid;
    const essayRef = firebase.firestore().collection('essays').doc(data.id);
    try {
      await essayRef.update({
        essay: text
      });
      console.log(data.essay);
      console.log(text);
      data.essay = text;
      console.log("Essay updated successfully!");
    } catch (error) {
      console.error("Error updating essay: ", error);
    }
  };
  

  
  const handleExit = () => {
    console.log("hghgfhfgh");
    navigation.navigate('Home');
  };
  

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.container}>
        <Text style={styles.header}>{data.name}</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Write your essay here..."
          value={essay}
          onChangeText={handleEssayChange}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
        <TouchableOpacity style = {styles.save} onPress={handleExit}>
          <Text>Save and Exit</Text>
        </TouchableOpacity>
        {/* <Button title="Save & Exit" style = {styles.save} onPress={handleExit} /> */}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  save: {
    backgroundColor: "#FC6C85",
    padding: 10,
    borderRadius: 30,
  },
});

export default Essay;
