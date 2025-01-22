import React, { useState } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider } from "./UserContext"; // Import du UserProvider
import { Provider as PaperProvider } from "react-native-paper";
import PageStart from "./components/PageStart.jsx";
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import Inscription2 from "./components/Inscription2.jsx";
import Accueil from "./components/Accueil.jsx";
import NavBar from "./components/Navbar.jsx";
import Settings from "./components/Settings.jsx";
import Profile from "./components/Profile.jsx";
import Reservation from "./components/Reservation.jsx";
import Reservation2 from "./components/Reservation2.jsx";
import Reservation3 from "./components/Reservation3.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import BagageDetails from "./components/BagageDetails.jsx";
import ConfirmationPage from "./components/ConfirmationPage.jsx";
import { ThemeProvider, ThemeContext } from "./ThemeContext";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Ignorer les logs spécifiques
  LogBox.ignoreLogs([
    "Request failed with status code 404", // Erreurs spécifiques à ignorer
    "VirtualizedLists should never be nested", // Avertissement FlatList
    "Erreur lors de la récupération des billets", // Erreur de récupération des billets dans Accueil
    "Erreur réponse API : 404", // Erreur de réponse API dans Connexion
  ]);

  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            {/* PageStart */}
            <Stack.Screen
              name="PageStart"
              component={PageStart}
              options={{ headerShown: false }}
            />

            {/* Login */}
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => (
                <Connexion
                  {...props}
                  onLoginSuccess={() => setIsLoggedIn(true)} // Définit isLoggedIn à true lors de la connexion
                />
              )}
            </Stack.Screen>

            {/* Signup */}
            <Stack.Screen
              name="Signup"
              component={Inscription}
              options={{ headerShown: false }}
            />

            {/* Inscription2 */}
            <Stack.Screen
              name="Inscription2"
              component={Inscription2}
              options={{ headerShown: false }}
            />

            {/* Accueil */}
            <Stack.Screen
              name="Accueil"
              component={Accueil}
              options={{ headerShown: false }}
            />

            {/* Settings */}
            <Stack.Screen name="Settings" options={{ headerShown: false }}>
              {(props) => (
                <Settings
                  {...props}
                  onLogout={() => setIsLoggedIn(false)} // Met à jour isLoggedIn lors de la déconnexion
                />
              )}
            </Stack.Screen>

            {/* Profile */}
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />

            {/* Réservation */}
            <Stack.Screen
              name="Reservation"
              component={Reservation}
              options={{ headerShown: false }}
            />
            {/* 2eme page de Réservation */}
            <Stack.Screen
              name="Reservation2"
              component={Reservation2}
              options={{ headerShown: false }}
            />

            {/* Détails des bagages */}
            <Stack.Screen
              name="BagageDetails"
              component={BagageDetails}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Reservation3"
              component={Reservation3}
              options={{ headerShown: false }}
            />

            {/* Page de confirmation */}
            <Stack.Screen
              name="Confirmation"
              component={ConfirmationPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>

          {/* NavBar: affichée seulement si l'utilisateur est connecté */}
          {isLoggedIn && <NavBar />}
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
  );
}
