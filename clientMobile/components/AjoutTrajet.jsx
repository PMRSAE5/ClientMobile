import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
  Keyboard,
} from "react-native";
import { checkReservation } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export default function AjoutTrajet({ route }) {
  const navigation = useNavigation();
  const billet = route.params?.billet || {}; // Récupère le billet principal
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [numReservation, setNumReservation] = useState("");

  const transportOptions = [
    { name: "RATP", image: require("../assets/RATP.png") },
    { name: "SNCF", image: require("../assets/SNCF.png") },
    { name: "AirFrance", image: require("../assets/AirFrance.png") },
  ];

  const handleTransportSelect = (option) => {
    setSelectedTransport(option);
  };

  const handleCheckReservation = async () => {
    if (!numReservation || !selectedTransport) {
      Alert.alert(
        "Erreur",
        "Veuillez entrer un numéro de réservation et sélectionner un transport."
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

      // Trouver le prochain index de réservation (ex: num_reservation2, num_reservation3...)
      let index = 2;
      while (billet[`num_reservation${index}`]) {
        index++;
      }

      // Ajouter un NOUVEAU détail de réservation sous un nom spécifique
      const updatedBillet = {
        ...billet,
        [`num_reservation${index}`]: response.reservation.num_reservation,
        [`lieu_depart${index}`]: response.reservation.lieu_depart,
        [`lieu_arrivee${index}`]: response.reservation.lieu_arrivee,
        [`heure_depart${index}`]: response.reservation.heure_depart,
        [`heure_arrivee${index}`]: response.reservation.heure_arrivee,
        [`transport${index}`]: selectedTransport,
      };

      // Naviguer vers Reservation3.js en gardant tout le reste du billet
      navigation.navigate("Reservation3", { billet: updatedBillet });
    } catch (error) {
      Alert.alert(
        "Erreur",
        error.message || "Aucune réservation correspondante n'a été trouvée."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Ajoutez un nouveau trajet</Text>

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
              <Image source={option.image} style={styles.transportImage} />
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

        <TouchableOpacity
          style={styles.reserveButton}
          onPress={handleCheckReservation}
        >
          <Text style={styles.reserveButtonText}>Vérifier et ajouter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, paddingBottom: 50 },
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5489CE",
    textAlign: "center",
  },
  transportContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  transportButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#5489CE",
  },
  selectedButton: { backgroundColor: "#B0C4DE" },
  transportImage: { width: 50, height: 50, resizeMode: "contain" },
  input: {
    borderWidth: 1,
    borderColor: "#5489CE",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  reserveButton: {
    backgroundColor: "#5489CE",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  reserveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
