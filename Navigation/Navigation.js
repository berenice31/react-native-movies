import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../components/Search";
import React from "react";
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Rechercher" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
