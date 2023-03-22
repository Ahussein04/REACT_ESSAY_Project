
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { COLORS, SIZES } from "../constants/theme";

const TestScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidth = useRef(new Animated.Value(0)).current;

  const Sidebar = () => {
    Animated.timing(sidebarWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    return (
      <Animated.View style={{
        backgroundColor: COLORS.gray,
        width: sidebarWidth.interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', '30%'],
        }),
        height: '100%',
        padding: 20,
      }}>

        <Text>This is the sidebar content</Text>
        
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleSidebar} style = {styles.toggle}>
        <Text>+</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text>This is the main content of your App</Text>
      </View>
      {isSidebarOpen && <Sidebar />}
    </View>
  );
};


const styles = StyleSheet.create({
  toggle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    backgroundColor: COLORS.white,
    flex: 1,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default TestScreen;
