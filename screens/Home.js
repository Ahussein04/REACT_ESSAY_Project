//home screen of the essay app


import {View, SafeArea, FlatList, Text} from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fafafa',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Home
