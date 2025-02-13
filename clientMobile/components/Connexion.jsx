/**
 * @file Connexion.js
 * @description Ce fichier contient le composant Connexion, utilisé pour permettre à un utilisateur de se connecter à l'application. Il offre également des options pour la connexion via des réseaux sociaux.
 */

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
import { UserContext } from "../UserContext";
import {
  useFonts,
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
} from "@expo-google-fonts/raleway";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Composant Connexion.
 * Permet à un utilisateur de se connecter à l'application avec des champs pour l'email et le mot de passe.
 * Offre également des options de connexion via des réseaux sociaux.
 * Après une connexion réussie, redirige vers la page d'accueil ou exécute une fonction de callback.
 *
 * @component
 * @example
 * return (
 *   <Connexion navigation={navigation} onLoginSuccess={onLoginSuccess} />
 * )
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.navigation - L'objet de navigation pour naviguer entre les écrans.
 * @param {Function} [props.onLoginSuccess] - Fonction appelée après une connexion réussie.
 *
 * @returns {JSX.Element} Le composant de connexion.
 */

export default function Connexion({ navigation, onLoginSuccess }) {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  /**
   * Gère la tentative de connexion de l'utilisateur.
   * Vérifie les champs, interroge l'API pour valider les informations et met à jour le contexte utilisateur en cas de succès.
   *
   * @async
   * @function handleLogin
   * @returns {Promise<void>}
   */

  const handleLogin = async () => {
    if (!mail || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const result = await login(mail, password);
      if (!result.user) {
        throw new Error(result.error || "Données utilisateur non disponibles.");
      }

      // Met à jour le contexte utilisateur
      setUser(result.user);

      // **Sauvegarde l'utilisateur complet dans AsyncStorage**
      await AsyncStorage.setItem("user", JSON.stringify(result.user));

      // Sauvegarde aussi l'état de connexion
      await AsyncStorage.setItem("isLoggedIn", "true");

      Alert.alert("Succès", `Bienvenue, ${result.user.name || "Utilisateur"}!`);

      if (onLoginSuccess) {
        onLoginSuccess(result.user); // Passe l'utilisateur à App.js
      }

      navigation.replace("Accueil"); // Navigue vers Accueil
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      Alert.alert("Erreur", error.message || "Échec de la connexion.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/BackLogin.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Connexion</Text>
      {/* Ajout de l'image */}

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
  gradient: {
    flex: 1,
  },
  logo: {
    width: 400,
    height: 400,
    flex: 1,
    resizeMode: "contain",
  },
  container: {
    marginTop: 140,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: "RalewayExtraBold",
    fontWeight: "bold",
    fontSize: 42,
    fontWeight: "bold",
    color: "#5895D6",
    marginBottom: 50,
  },
  form: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontFamily: "RalewayExtraBold",
    fontWeight: "black",
    fontSize: 16,
    color: "#000",
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
    fontFamily: "RalewayBlack",
    fontSize: 14,
    color: "#e53  ",
    textAlign: "right",
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: "#5895D6",
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
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    marginTop: 50,
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
    fontFamily: "RalewayBlack",
    fontSize: 16,
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
    fontFamily: "RalewayBlack",
    fontSize: 14,
    color: "#555",
  },
  signupButtonText: {
    fontFamily: "RalewayBlack",
    fontSize: 14,
    color: "#5895D6",
    fontWeight: "bold",
    marginLeft: 4,
  },
});
