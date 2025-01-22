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

export default function Accueil() {
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
    paddingTop: 100, // Ajout de la marge supérieure
    paddingBottom: 150, // Ajout de la marge supérieure
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  textBox: {
    backgroundColor: "#ffffff",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#5895D6",
    textAlign: "center",
  },
  subtitle: {
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
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});
