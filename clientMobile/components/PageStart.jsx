/**
 * @file PageStart.js
 * @description Page d'accueil animée avec logo, texte et boutons de navigation.
 */

import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, Button } from "react-native-paper";
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

/**
 * Composant PageStart.
 * Page d'accueil de l'application avec un logo animé, une phrase d'accroche et des boutons de navigation.
 *
 * @component
 * @example
 * return (
 *   <PageStart navigation={navigation} />
 * )
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.navigation - L'objet de navigation pour naviguer entre les écrans.
 *
 * @returns {JSX.Element} Le composant PageStart.
 */

export default function PageStart({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
  });

  useEffect(() => {
    const startZoomAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startZoomAnimation();
  }, [scaleAnim]);

  return (
    <LinearGradient colors={["#5895d6", "#f0f0f0"]} style={styles.gradient}>
      <View style={styles.container}>
        {/* Gros logo animé en haut */}
        <Animated.Image
          source={require("../assets/PMoveLogoSANSTITRE.png")}
          style={[styles.largeLogo, { transform: [{ scale: scaleAnim }] }]}
        />

        {/* Texte "Bienvenue sur PMove" */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title]}>Bienvenue sur</Text>
          <Text style={[styles.title2]}>PMove</Text>
        </View>

        {/* Phrase d'accroche */}
        <Text style={styles.subtitle}>
          Simplifions vos trajets, réinventons l'accessibilité.
        </Text>

        {/* Boutons */}
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Login")}
          style={styles.buttonPrimary}
          labelStyle={[styles.buttonTextPrimary]}
          contentStyle={styles.buttonContent}
        >
          Se connecter
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("Signup")}
          style={styles.buttonSecondary}
          labelStyle={[styles.buttonTextSecondary]}
          contentStyle={styles.buttonContent}
        >
          S'inscrire
        </Button>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  largeLogo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row", // Alignement horizontal entre le texte et "PMove"
    alignItems: "center", // Alignement vertical
    marginBottom: 20,
  },
  title: {
    fontFamily: "RalewayBold",
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginRight: 8, // Espacement entre "Bienvenue sur" et "PMove"
  },
  title2: {
    fontFamily: "RalewayBold",
    fontSize: 24,
    fontWeight: "bold",
    color: "#5895D6",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "RalewayExtraBold",
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: "#5895d6",
    marginBottom: 10,
    borderRadius: 8,
    width: "100%",
  },
  buttonTextPrimary: {
    fontFamily: "RalewayExtraBold",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondary: {
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
  },
  buttonTextSecondary: {
    fontFamily: "RalewayBold",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContent: {
    height: 50,
    justifyContent: "center",
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5895d6",
  },
});
