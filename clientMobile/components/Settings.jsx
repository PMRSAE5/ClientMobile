import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../UserContext"; // Assurez-vous que le chemin est correct
import { useNavigation } from "@react-navigation/native";

export default function Settings({ onLogout }) {
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  // Fonction de déconnexion
  const handleLogout = () => {
    setUser(null); // Réinitialise les données utilisateur
    onLogout(); // Appelle la méthode onLogout pour mettre à jour isLoggedIn
    navigation.navigate("Login"); // Retourne à la page de connexion
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
