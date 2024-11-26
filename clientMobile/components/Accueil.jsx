import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Accueil({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue !</Text>
      <Text style={styles.subtitle}>Choisissez une option pour continuer.</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonTextPrimary}>Se connecter</Text>
        </TouchableOpacity>

        {/* Bouton Inscription */}
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonTextSecondary}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Le conteneur occupe tout l'espace disponible
    justifyContent: "center", // Centre verticalement
    alignItems: "center", // Centre horizontalement
    paddingHorizontal: 20, // Ajoute du padding horizontal
    backgroundColor: "#f3f4f6", // Couleur de fond
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff", // Couleur bleue
    marginBottom: 10, // Espace sous le titre
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555", // Couleur grise pour le texte
    marginBottom: 20,
  },

  buttonContainer: {
    width: "100%", // Les boutons prennent toute la largeur
  },

  buttonPrimary: {
    backgroundColor: "#007bff", // Couleur bleue
    paddingVertical: 12,
    borderRadius: 8, // Coins arrondis
    marginBottom: 12, // Espace entre les boutons
  },
  buttonTextPrimary: {
    color: "#fff", // Texte blanc
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "#e0e0e0", // Couleur grise claire
    paddingVertical: 12,
    borderRadius: 8,
  },

  buttonTextSecondary: {
    color: "#333", // Texte gris foncé
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
