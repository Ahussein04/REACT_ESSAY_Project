
import Home from './screens/Home';
import Login from './screens/Login';
import Essay from './screens/Essay';
import TestScreen from './components/TestScreen';
import TestLogIn from './screens/testLogin'
// import Navigator from './components/DrawerNavigator';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const Stack = createStackNavigator();

const App = () => {
  
  return (
    
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="TestLogIn"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Essay" component={Essay} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TestLogIn" component ={TestLogIn}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;