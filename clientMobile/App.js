import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Accueil from "./components/Accueil.jsx";
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Accueil"
          component={Accueil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Connexion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Inscription}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
