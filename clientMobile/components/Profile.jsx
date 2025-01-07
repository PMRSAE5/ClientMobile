import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../UserContext"; // Assurez-vous que le chemin est correct
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();

  // Fonction pour se déconnecter

  // Affichage conditionnel si l'utilisateur n'est pas trouvé
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Utilisateur non trouvé.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Nom:</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Prénom:</Text>
        <Text style={styles.value}>{user.surname}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.mail}</Text>

        <Text style={styles.label}>Numéro:</Text>
        <Text style={styles.value}>{user.num}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
