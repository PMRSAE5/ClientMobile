import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function PageStart({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/PMoveLogoSANSTITRE.png")}
        style={styles.logo}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue</Text>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonTextPrimary}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonTextSecondary}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  logo: {
    width: 200,
    height: 200,
  },
  content: {
    marginTop: 10, // Adjust this value to move the content down
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5895d6",
    fontFamily: "Raleway",
  },
  buttonPrimary: {
    backgroundColor: "#5895d6",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
  },
  buttonTextPrimary: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
  },
  buttonTextSecondary: {
    color: "#333",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
