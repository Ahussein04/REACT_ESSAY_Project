import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ActionButton from '../components/ActionButton';
import EssayCard from '../components/EssayCard';
import { firebase } from './config';

const Home = ({ navigation }) => {
  const [essays, setEssays] = useState([]);
  const [newEssayTitle, setNewEssayTitle] = useState('');
  const [newEssayContent, setNewEssayContent] = useState('');


  const fetchEssays = () => {
    const db = firebase.firestore();
    db.collection('essays')
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          essay: doc.data().essay,
          lastEdited: doc.data().lastEdited,
        }));
        setEssays(data);
      })
      .catch((error) => {
        console.error('Error getting essays:', error);
      });
  }

  fetchEssays();

  const handleAddEssay = () => {
    navigation.navigate('Add');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={essays}
        renderItem={({ item }) => <EssayCard data={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddEssay}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  addEssayContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.gray,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Home;
