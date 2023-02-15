//home screen of the essay app
import {View, SafeArea, FlatList, Text} from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';


const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <StatusBar style="auto" />
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
