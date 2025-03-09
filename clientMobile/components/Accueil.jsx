/**
 * @file Accueil.js
 * @description Composant principal pour afficher la page d'accueil.
 * Récupère les billets réservés par l'utilisateur connecté et les affiche sous forme de liste.
 */

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { UserContext } from "../UserContext";
import LottieView from "lottie-react-native";
import { getTickets } from "../services/api";
import Billet from "../components/Billet";
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
import { ThemeContext } from "../ThemeContext";

/**
 * @typedef {Object} Ticket
 * @property {number} num_reservation - Numéro de réservation unique du billet.
 * @property {string} lieu_depart - Lieu de départ du voyage.
 * @property {string} lieu_arrivee - Lieu d'arrivée du voyage.
 * @property {Date} heure_depart - Heure de départ prévue.
 * @property {Date} heure_arrivee - Heure d'arrivée prévue.
 */

/**
 * @function Accueil
 * @description Affiche les billets réservés pour l'utilisateur connecté.
 *
 * @returns {JSX.Element} Composant affichant la liste des billets.
 */

export default function Accueil() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Contexte pour le thème
  const { user } = useContext(UserContext); // Contexte pour l'utilisateur connecté
  const [tickets, setTickets] = useState([]); // Liste des billets
  const [loading, setLoading] = useState(false); // Indicateur de chargement

  /**
   * @function fetchTickets
   * @description Récupère les billets via une API en fonction de l'utilisateur connecté.
   * Met à jour l'état des billets et de l'indicateur de chargement.
   *
   * @async
   * @returns {Promise<void>}
   */
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setTickets([]);
      if (user) {
        try {
          const fetchedTickets = await getTickets(user.name, user.surname);

          // 🔥 Transformation pour créer un billet distinct par réservation 🔥
          const transformedTickets = fetchedTickets.flatMap((billet) => {
            return Object.keys(billet)
              .filter((key) => key.startsWith("num_reservation")) // On prend toutes les réservations existantes
              .map((key) => {
                const index = key.replace("num_reservation", ""); // Ex: "2", "3", etc.
                return {
                  num_reservation: billet[key], // Numéro de réservation
                  lieu_depart:
                    billet[`lieu_depart${index}`] || billet.lieu_depart,
                  lieu_arrivee:
                    billet[`lieu_arrivee${index}`] || billet.lieu_arrivee,
                  heure_depart:
                    billet[`heure_depart${index}`] || billet.heure_depart,
                  heure_arrivee:
                    billet[`heure_arrivee${index}`] || billet.heure_arrivee,
                  transport: billet[`transport${index}`] || billet.transport,
                  name: billet.name,
                  surname: billet.surname,
                  companion: billet.companion,
                  wheelchair: billet.wheelchair,
                  phone: billet.phone,
                  email: billet.email,
                  numBags: billet.numBags,
                  additionalInfo: billet.additionalInfo,
                };
              });
          });

          setTickets(transformedTickets);
        } catch (error) {
          console.error("Erreur lors de la récupération des billets :", error);
          setTickets([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTickets();
  }, [user]);

  // Chargement des polices Raleway via Expo
  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  return (
    <FlatList
      data={tickets}
      keyExtractor={(item) => item.num_reservation.toString()}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <View style={styles.textBox}>
            <Text style={styles.welcomeText}>
              Bon retour parmi nous, {user?.name || "Utilisateur"}{" "}
              {user?.surname || ""} !
            </Text>
          </View>
          <LottieView
            source={require("../assets/welcome-animation.json")}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.subtitle}>Vos Enregistrement :</Text>
        </View>
      }
      ListEmptyComponent={
        !loading && (
          <View style={styles.emptyContainer}>
            <Text style={styles.noTickets}>Aucun enregistrement fait...</Text>
          </View>
        )
      }
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => <Billet ticket={item} />}
      ListFooterComponent={
        loading && <ActivityIndicator size="large" color="#5895D6" />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 100,
    paddingBottom: 150,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  textBox: {
    borderColor: "#5895D6",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  animation: {
    width: 400,
    height: 400,
  },
  welcomeText: {
    fontFamily: "RalewayBlack",
    fontSize: 24,
    fontWeight: "bold",
    color: "#5895D6",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "RalewayBold",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  noTickets: {
    fontFamily: "RalewayRegular",
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});
