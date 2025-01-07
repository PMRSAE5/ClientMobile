import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../UserContext"; // Importation du UserContext

export default function Accueil() {
  const { user } = useContext(UserContext); // Récupération de l'utilisateur connecté

  return (
    <View style={styles.container}>
      {user ? (
        // Affiche le message de bienvenue si un utilisateur est connecté
        <Text style={styles.welcomeText}>
          Bon retour parmi nous, {user.name} {user.surname} !
        </Text>
      ) : (
        // Affiche un message d'erreur si aucun utilisateur n'est trouvé
        <Text style={styles.errorText}>Utilisateur non trouvé.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  errorText: {
    fontSize: 20,
    color: "red",
  },
});
