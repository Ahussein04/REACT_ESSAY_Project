import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const Menu = ({ onClose }) => {
  const animation = new Animated.Value(-200);

  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  const handleClose = () => {
    Animated.timing(animation, {
      toValue: -200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const translateX = animation.interpolate({
    inputRange: [-200, 0],
    outputRange: [-200, 0],
  });

  return (
    <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Ionicons name="close" size={32} color="#444" />
      </TouchableOpacity>
      <Text style={styles.menuItem}>Menu Item 1</Text>
      <Text style={styles.menuItem}>Menu Item 2</Text>
      <Text style={styles.menuItem}>Menu Item 3</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: '100%',
    backgroundColor: COLORS.red,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default Menu;
