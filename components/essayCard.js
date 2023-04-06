import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants/theme';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import thumb from "../assets/thumb1.png";

const EssayCard =  ({data}) => {


  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Essay', { data });
  };


  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
      <Image source={thumb} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.date}>{data.lastEdited}</Text>
      </View>
    </View>
  </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  content: {},
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default EssayCard;