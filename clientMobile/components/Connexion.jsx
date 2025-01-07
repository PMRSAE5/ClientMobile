import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { login } from "../services/api";
import { UserContext } from "../UserContext"; // Import du UserContext

export default function Connexion({ navigation, onLoginSuccess }) {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext); // Récupère le setter de l'utilisateur

  const handleLogin = async () => {
    console.log("Début de la méthode handleLogin.");

    if (!mail || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      console.log("Envoi des données au serveur :", { mail, password });

      const result = await login(mail, password);
      console.log("Résultat brut de l'API :", result);

      if (!result.user) {
        console.log("Réponse API sans utilisateur :", result);
        throw new Error(result.error || "Données utilisateur non disponibles.");
      }

      // Met à jour le contexte utilisateur
      setUser(result.user);
      console.log("Utilisateur trouvé :", result.user);
      console.log("Utilisateur mis à jour dans le contexte :", result.user);

      // Succès
      Alert.alert("Succès", `Bienvenue, ${result.user.name || "Utilisateur"}!`);

      // Appelle onLoginSuccess si défini
      if (onLoginSuccess) {
        console.log("Appel de onLoginSuccess...");
        onLoginSuccess();
      }

      console.log("Redirection vers la page Accueil...");
      navigation.navigate("Accueil"); // Navigue vers "Accueil"
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      Alert.alert("Erreur", error.message || "Échec de la connexion.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Ajout de l'image */}
      <ImageBackground
        source={require("../assets/BackLogin.png")} // Image locale
        style={styles.logo}
      />

      <Text style={styles.title}>Connexion</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Adresse mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={mail}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Mot de passe oublié */}
        <TouchableOpacity onPress={() => alert("Mot de passe oublié")}>
          <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        {/* Bouton Connexion */}
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
          <Text style={styles.buttonPrimaryText}>Se connecter</Text>
        </TouchableOpacity>
      </View>

      {/* Ouverture sociale */}
      <Text style={styles.socialText}>ou connectez-vous avec</Text>

      {/* Boutons sociaux */}
      <View style={styles.socialButtons}>
        {/* Google */}
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome
            name="google"
            size={24}
            color="red"
            style={styles.icon}
          />
          <Text style={styles.socialButtonText}>Continuer avec Google</Text>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome
            name="facebook"
            size={24}
            color="blue"
            style={styles.icon}
          />
          <Text style={styles.socialButtonText}>Continuer avec Facebook</Text>
        </TouchableOpacity>

        {/* Twitter */}
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome
            name="twitter"
            size={24}
            color="blue"
            style={styles.icon}
          />
          <Text style={styles.socialButtonText}>Continuer avec Twitter</Text>
        </TouchableOpacity>
      </View>

      {/* Lien vers Inscription */}
      <View style={styles.signupLink}>
        <Text style={styles.signupText}>Vous n'avez pas de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupButtonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 400,
    height: 400,
    marginBottom: 10,
    flex: 1,
  },
  container: {
    marginTop: 120,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
  },
  form: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#007bff",
    textAlign: "right",
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonPrimary: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  socialButtons: {
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 8,
  },
  signupLink: {
    flexDirection: "row",
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: "#555",
  },
  signupButtonText: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
    marginLeft: 4,
  },
});
