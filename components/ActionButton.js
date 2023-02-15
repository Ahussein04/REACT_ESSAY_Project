import { View, Text } from 'react-native'
import React from 'react'

const actionButton = () => {
  return (
    <View style={styles.container}>
      <Text>actionButton</Text>
      <StatusBar style="auto" />
    </View>
    
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default actionButton