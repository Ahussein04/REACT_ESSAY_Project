import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { COLORS, SIZES } from "../constants/theme";

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { initializeApp } from "../node_modules/firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyDKPd_A_n95kHrh4pk7I9iITG-K9eFqg54",
    authDomain: "fir-auth-react-960c1.firebaseapp.com",
    projectId: "fir-auth-react-960c1",
    storageBucket: "fir-auth-react-960c1.appspot.com",
    messagingSenderId: "614950462876",
    appId: "1:614950462876:web:2318e9665d3abf1be3d459",
    measurementId: "G-SJZVBGTXNX"
};

initializeApp(firebaseConfig);





const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    try {
      // check if user exists in Firebase database
 
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      


    
      const uid = userCredential.user.uid;
  
      // log in user and navigate to home screen
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Error',
        description: error.message,
        type: 'danger',
        icon: 'auto',
      });
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Text style={styles.title}>
        EssayApp
      </Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          keyboardType="email-address"
          activeUnderlineColor="green"
          onChangeText={ (email) => setEmail(email)}
        /> 
      </View> 

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity>



    </View> 
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontSize: 34,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  inputView: {
    backgroundColor: "#ffff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    borderRadius: 30,
    backgroundColor: '#ececec',
  },
  forgot_button: {
    height: 30,
    marginBottom: 0,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#ffffff",
  },
});

export default Login;