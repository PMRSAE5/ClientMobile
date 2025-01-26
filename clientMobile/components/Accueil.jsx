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

export default function Accueil() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setTickets([]);
      if (user) {
        setLoading(true);
        try {
          const fetchedTickets = await getTickets(user.name, user.surname);
          setTickets(fetchedTickets);
        } catch (error) {
          console.error("Erreur lors de la récupération des billets :", error);
          setTickets([]); // Définit un tableau vide en cas d'erreur
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTickets();
  }, [user]);

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
          <Text style={styles.subtitle}>Vos Réservations :</Text>
        </View>
      }
      ListEmptyComponent={
        !loading && (
          <View style={styles.emptyContainer}>
            <Text style={styles.noTickets}>Aucune réservation faite.</Text>
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
