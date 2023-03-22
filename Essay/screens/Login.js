import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { auth } from "../constants/firebase";
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("hello");
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User logged in successfully: ", user.uid);
        navigation.navigate('Home');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Error signing in: ", errorMessage);
      });
  };


  const handleEmailChange = (text) => {
    setEmail(text);
  };
  
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed up successfully: ", user.uid);
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Error signing up: ", errorMessage);
      });
  };

  return (
    <View>
      <Text>Login</Text>
      <Text>Email</Text>
      <TextInput 
        placeholder="Type Email Here"
        onChangeText={handleEmailChange}
        value={email}
      />
      <Text>Password</Text>
      <TextInput 
        placeholder="Type Password Here"
        onChangeText={handlePasswordChange}
        value = {password}
        />
        <Button onPress={handleLogin} title="Login"/>
        </View>
  )
}
  export default Login;
