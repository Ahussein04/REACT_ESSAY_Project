import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Picker } from "react-native";
import { firebase } from "../config";
import fetch from 'react-native-fetch-polyfill';
import axios from 'axios';
import 'react-native-override-ua';


const AddEssay = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [essay, setEssay] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [questions, setQuestions] = useState("");
  const asking = "";
  const your_api_key = "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";

  const fetchQuestions = async (categoryName) => {

    console.log("current title: " + title);
    console.log("made it into selected category")
    runCompletion("Generate questions someone would asking when writing an " + categoryName + " essay about " + title)

  };


  const handleTemplateChange = (itemValue) => {
    setSelectedCategory(itemValue); // Update the selected category

    if (questions[itemValue]) {
      setEssay(questions[itemValue]); // Load the corresponding questions into the essay state
    } else {
      setEssay(""); // Clear the essay state if no questions are available
    }
  };





  const { Configuration, OpenAIApi } = require("openai");
  require('dotenv').config()
  
  
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  const headers = {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  async function runCompletion (input) {
    console.log("gpt called");
    console.log("gpt input: " , input);
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: input,
    max_tokens:4000
    });
    console.log("gpt response: " , completion.data.choices[0].text);
    console.log(completion.data.choices[0].text);
    asking = completion.data.choices[0].text;
  }


  

  async function createCompletion(params = {}) {
    console.log("gpt called");
    const DEFAULT_PARAMS = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Generate questions someone would asking when writing an " + selectedCategory + " essay about " + title }],
      // max_tokens: 4096,
      temperature: 0,
      // frequency_penalty: 1.0,
      // stream: true,
    };
    const params_ = { ...DEFAULT_PARAMS, ...params };
  
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', params_, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + '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',
        },
      });
  
      const output = await fetchStream(response.data);
      setEssay(output);
      console.log(output);
    } catch (error) {
      console.error('Error fetching completion:', error);
    }
  }


  async function fetchStream(stream) {
    const reader = stream.getReader();
    let charsReceived = 0;
    const li = document.createElement("li");

    // read() returns a promise that resolves
    // when a value has been received
    const result = await reader.read().then(
        function processText({ done, value }) {
            // Result objects contain two properties:
            // done  - true if the stream has already given you all its data.
            // value - some data. Always undefined when done is true.
            if (done) {
                console.log("Stream complete");
                return li.innerText;
            }
            // value for fetch streams is a Uint8Array
            charsReceived += value.length;
            const chunk = value;
            console.log(`Received ${charsReceived} characters so far. Current chunk = ${chunk}`);
            li.appendChild(document.createTextNode(chunk));
            return reader.read().then(processText);
        });
    const list = result.split(",")
    const numList = list.map((item) => {
        return parseInt(item)
    })
    const text = String.fromCharCode(...numList);
    const response = JSON.parse(text)
    return response
  }


  useEffect(() => {
    const db = firebase.firestore();

    

    db.collection("Template")
      .get()
      .then((querySnapshot) => {
        const categories = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const categoryName = data.name;
          categories.push({ id: doc.id, name: categoryName });
        });
        setCategories(categories);
        setSelectedCategory(categories[0]?.name); // Set the first category as the selected category
      })
      .catch((error) => {
        console.log("Error getting categories: ", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      if (questions[selectedCategory]) {
        createCompletion();
      } else {
        setEssay(""); // Clear the essay state if no questions are available
      }
    }
  }, [asking, selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      fetchQuestions(selectedCategory);
    }
  }, [selectedCategory]);

  const handleSave = () => {
    const db = firebase.firestore();
    const currentUser = 'UL4UJuvWClL2RSdJNI8R';
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const answer = "NFT stands for Non-Fungible Token.";

    db.collection("essays")
      .add({
        userId: currentUser,
        category: selectedCategory,
        title: title,
        essay: answer,
        createdAt: timestamp,
      })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Topic:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter Topic here"
      />

    <Text style={[styles.label, { marginTop: 20 }]}>Templates:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={handleTemplateChange} // Call the modified handler function
      >
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.name} />
        ))}
      </Picker>

      <Text style={[styles.label, { marginTop: 20 }]}>Questions:</Text>
      <TextInput
        style={[styles.input, { height: 200 }]}
        value={essay}
        onChangeText={setEssay}
        placeholder="Your questions here"
        multiline={true}
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save & Exit</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddEssay;
