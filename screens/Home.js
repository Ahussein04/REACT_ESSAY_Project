import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList} from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import {EssayData} from "../constants/dummyData"
import ActionButton from "../components/ActionButton";
import EssayCard from "../components/EssayCard";


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];


const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Home = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="auto" /> */}
       <FlatList
        // numColumns={2}
        data={EssayData}
        renderItem={({item}) => 
          <TouchableOpacity onPress={() => navigation.navigate('Login', item)}>
            <Text >{ item.name }</Text>
            </TouchableOpacity>
      
        }
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
