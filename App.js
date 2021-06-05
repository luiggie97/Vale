import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login';
import Listar from './components/Listar';
import Adicionar from './components/Adicionar';
import Editar from './components/Editar';
const Stack = createStackNavigator();
function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <View>
        <StatusBar hidden={true}/>   
      </View>     
    <NavigationContainer style={{backgroundColor:'#00746f'}}> 
      <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Listar" component={Listar} />
        <Stack.Screen name="Adicionar" component={Adicionar} />
        <Stack.Screen name="Editar" component={Editar} />
      </Stack.Navigator>     
    </NavigationContainer>
    </SafeAreaView>
  );
}
export default App;