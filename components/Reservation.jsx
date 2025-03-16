/**
 * @file Reservation.js
 * @description Permet de vérifier une réservation ou d'accéder à des options de réservation externes.
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Linking,
  ScrollView,
  Keyboard,
} from "react-native";
import { checkReservation } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
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
 * Composant Reservation.
 * Gère la sélection d'un transport, la vérification d'une réservation existante
 * et affiche les détails du billet si une réservation est trouvée.
 * Fournit également des liens pour effectuer une réservation sur des plateformes externes.
 *
 * @component
 * @example
 * return (
 *   <Reservation />
 * )
 *
 * @returns {JSX.Element} Le composant Reservation.
 *
 * @description
 * Ce composant permet aux utilisateurs de :
 * - Sélectionner un mode de transport (RATP, SNCF, AirFrance).
 * - Saisir un numéro de réservation.
 * - Vérifier l'existence de cette réservation via une API.
 * - Afficher les détails du billet si la réservation est trouvée.
 * - Naviguer vers d'autres pages pour effectuer une réservation si nécessaire.
 * - Interagir avec une animation et des options de navigation dynamiques.
 *
 * @param {Object} props - Les propriétés du composant.
 */

export default function Reservation() {
  const navigation = useNavigation();
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [numReservation, setNumReservation] = useState("");
  const [billet, setBillet] = useState(null);

  const transportOptions = [
    { name: "RATP", image: require("../assets/RATP.png") },
    { name: "SNCF", image: require("../assets/SNCF.png") },
    { name: "AirFrance", image: require("../assets/AirFrance.png") },
  ];

  const transportLinks = [
    { name: "Réservez sur RATP", url: "https://www.ratp.fr" },
    { name: "Réservez sur SNCF", url: "https://www.sncf.com" },
    { name: "Réservez sur AirFrance", url: "https://www.airfrance.fr" },
  ];

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayMedium: Raleway_500Medium,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  /**
   * Sélectionne une option de transport.
   *
   * @param {string} option - L'option de transport sélectionnée.
   */
  const handleTransportSelect = (option) => {
    setSelectedTransport(option);
  };

  /**
   * Vérifie une réservation en fonction du numéro de réservation et de l'option de transport sélectionnée.
   * Affiche une alerte en cas de succès ou d'erreur.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */

  const handleCheckReservation = async () => {
    if (!numReservation || !selectedTransport) {
      Alert.alert(
        "Erreur",
        "Veuillez entrer un numéro de réservation et sélectionner une base."
      );
      return;
    }

    try {
      const response = await checkReservation(
        parseInt(numReservation, 10),
        selectedTransport
      );
      Alert.alert("Succès", "Réservation trouvée !");

      Keyboard.dismiss();
      setBillet(response.reservation); // Stocke les informations du billet
    } catch (error) {
      Alert.alert(
        "Erreur",
        error.message || "Aucune réservation correspondante n'a été trouvée."
      );
      setBillet(null); // Réinitialise le billet en cas d'erreur
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Besoin d'aide pour votre trajet ?</Text>
        <Text style={styles.texte}>PMove est prêt à vous reçevoir !</Text>
        <View style={styles.transportContainer}>
          {transportOptions.map((option) => (
            <TouchableOpacity
              key={option.name}
              style={[
                styles.transportButton,
                selectedTransport === option.name && styles.selectedButton,
              ]}
              onPress={() => handleTransportSelect(option.name)}
            >
              <Image
                source={option.image}
                style={[
                  styles.transportImage,
                  selectedTransport === option.name && styles.selectedImage,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Numéro de réservation"
          value={numReservation}
          onChangeText={setNumReservation}
          keyboardType="numeric"
        />

        <View style={styles.divider} />

        <View style={styles.rowContainer}>
          <View style={styles.linksContainer}>
            <Text style={styles.subtitle}>
              Vous n'avez pas de réservation ?
            </Text>
            {transportLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkButton}
                onPress={() => Linking.openURL(link.url)}
              >
                <Text style={styles.linkButtonText}>{link.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <LottieView
            source={require("../assets/reservation-animation.json")}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        <TouchableOpacity
          style={styles.reserveButton}
          onPress={handleCheckReservation}
        >
          <Text style={styles.reserveButtonText}>Vérifier la réservation</Text>
        </TouchableOpacity>

        {billet && (
          <View
            style={[
              styles.billetContainer,
              selectedTransport === "RATP"
                ? { backgroundColor: "#D8F3DC" } // Vert pastel
                : selectedTransport === "SNCF"
                ? { backgroundColor: "#FAD2D2" } // Rouge pastel
                : { backgroundColor: "#D0E8F2" }, // Bleu pastel pour AirFrance
            ]}
          >
            <Text style={styles.billetTitle}>Votre Billet</Text>

            <View style={styles.billetRow}>
              <View style={styles.billetColumn}>
                <Text style={styles.billetLabel}>N° Réservation :</Text>
                <Text style={styles.billetInfo}>{billet.num_reservation}</Text>
              </View>
              <View style={styles.billetColumn}>
                <Text style={styles.billetLabel}>Transport :</Text>
                <Text style={styles.billetInfo}>{selectedTransport}</Text>
              </View>
            </View>

            <View style={styles.billetRow}>
              <View style={styles.billetColumn}>
                <Text style={styles.billetLabel}>Départ :</Text>
                <Text style={styles.billetInfo}>{billet.lieu_depart}</Text>
                <Text style={styles.billetInfo}>
                  {new Date(billet.heure_depart).toLocaleString()}
                </Text>
              </View>
              <View style={styles.billetColumn}>
                <Text style={styles.billetLabel}>Arrivée :</Text>
                <Text style={styles.billetInfo}>{billet.lieu_arrivee}</Text>
                <Text style={styles.billetInfo}>
                  {new Date(billet.heure_arrivee).toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Boutons */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                Alert.alert("Confirmation", "Votre billet a été confirmé !");
                navigation.navigate("Reservation2", {
                  billet: {
                    num_reservation: billet.num_reservation,
                    lieu_depart: billet.lieu_depart,
                    lieu_arrivee: billet.lieu_arrivee,
                    heure_depart: billet.heure_depart,
                    heure_arrivee: billet.heure_arrivee,
                    transport: selectedTransport,
                  },
                });
              }}
            >
              <Text style={styles.confirmButtonText}>Confirmer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setBillet(null)} // Réinitialise les informations du billet
            >
              <Text style={styles.cancelButtonText}>
                Vérifier un autre billet
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1, // Permet de scroller au besoin
    paddingBottom: 160, // Ajoute un espace en bas pour le défilement
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontFamily: "RalewayBlack",
    fontWeight: "bold",
    color: "#5489CE",
    marginBottom: 30,
    textAlign: "center",
  },
  texte: {
    fontFamily: "RalewayExtraBold",
    fontWeight: "bold",
    fontSize: 18,
    color: "#436EA5",
    marginBottom: 30,
    textAlign: "center",
  },
  transportContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  transportButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: 90,
    height: 60,
    justifyContent: "center",
    borderColor: "#5489CE",
    borderWidth: 2,
  },
  selectedButton: {
    backgroundColor: "#B0C4DE",
  },
  transportImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  selectedImage: {
    tintColor: "#fff",
  },
  input: {
    fontFamily: "RalewayRegular",
    fontWeight: "bold",
    textShadowColor: "#5489CE",
    borderWidth: 1,
    borderColor: "#5489CE",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  animation: {
    width: 250,
    height: 250,
    transform: [{ translateX: -50 }],
  },

  billetContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#5489CE",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  billetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  billetColumn: {
    flex: 1,
    paddingHorizontal: 10,
  },
  billetLabel: {
    fontFamily: "RalewayExtraBold",
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  billetInfo: {
    fontFamily: "RalewayMedium",
    fontSize: 16,
    color: "#000",
  },
  billetTitle: {
    fontFamily: "RalewayBlack",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  confirmButtonText: {
    fontFamily: "RalewayBlack",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "RalewayBlack",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  subtitle: {
    fontFamily: "RalewayExtraBold",
    fontSize: 18,
    color: "#436EA5",
    marginBottom: 20,
  },
  linksContainer: {
    marginBottom: 30,
  },
  linkButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#5489CE",
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  linkButtonText: {
    fontFamily: "RalewayBlack",
    fontWeight: "bold",
    fontSize: 14,
    color: "#5489CE",
  },
  reserveButton: {
    backgroundColor: "#5489CE",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
