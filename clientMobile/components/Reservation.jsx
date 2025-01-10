import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { checkReservation } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native"; // Import supplémentaire

export default function Reservation() {
  const navigation = useNavigation();
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [numReservation, setNumReservation] = useState("");
  const [billet, setBillet] = useState(null);

  const transportOptions = ["RATP", "SNCF", "AirFrance"];

  const handleTransportSelect = (option) => {
    setSelectedTransport(option);
  };

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
    <View style={styles.container}>
      <Text style={styles.title}>Besoin d'aide pour votre trajet ?</Text>
      <View style={styles.transportContainer}>
        {transportOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.transportButton,
              selectedTransport === option && styles.selectedButton,
            ]}
            onPress={() => handleTransportSelect(option)}
          >
            <Text
              style={[
                styles.transportButtonText,
                selectedTransport === option && styles.selectedButtonText,
              ]}
            >
              {option}
            </Text>
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
        <Text style={styles.reserveButtonText}>Vérifier la réservation</Text>
      </TouchableOpacity>

      {billet && (
        <View style={styles.billetContainer}>
          <Text style={styles.billetTitle}>Détails du Billet :</Text>
          <Text>Numéro de Réservation : {billet.num_reservation}</Text>
          <Text>Lieu de Départ : {billet.lieu_depart}</Text>
          <Text>Lieu d'Arrivée : {billet.lieu_arrivee}</Text>
          <Text>
            Heure de Départ : {new Date(billet.heure_depart).toLocaleString()}
          </Text>
          <Text>
            Heure d'Arrivée : {new Date(billet.heure_arrivee).toLocaleString()}
          </Text>

          {/* Bouton pour confirmer le billet */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              Alert.alert("Confirmation", "Votre billet a été confirmé !");
              console.log("Redirection vers Reservation2...");
              navigation.navigate("Reservation2", { billet });
            }}
          >
            <Text style={styles.confirmButtonText}>Confirmer</Text>
          </TouchableOpacity>

          {/* Bouton pour annuler ou vérifier un autre billet */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 30,
    textAlign: "center",
  },
  transportContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 50,
    gap: 30,
    marginBottom: 20,
  },
  transportButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#007bff",
  },
  transportButtonText: {
    color: "#333",
    fontSize: 14,
  },
  selectedButtonText: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  reserveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  billetContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  billetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  billetContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  billetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
