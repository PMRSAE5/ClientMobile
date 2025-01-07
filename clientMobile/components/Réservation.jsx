import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Réservation() {
  const [selectedTransport, setSelectedTransport] = useState(null);

  const transportOptions = [
    "Train - RER - Métro",
    "Avion",
    "Tramway",
    "Bus",
    "Taxi",
  ];

  const handleTransportSelect = (option) => {
    setSelectedTransport(option);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Besoin d'assistance ? Nous sommes là</Text>
      <Text style={styles.subtitle}>Prestations du trajet</Text>

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
        placeholder="Gare de départ"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Gare d'arrivée"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de carte de réduction"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.reserveButton}>
        <Text style={styles.reserveButtonText}>Réserver</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continuer</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  transportContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
  addButton: {
    alignSelf: "center",
    backgroundColor: "#007bff",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
