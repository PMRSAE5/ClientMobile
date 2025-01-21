import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

const BagageDetails = ({ route, navigation }) => {
  const { billet } = route.params || {};
  const [bagages, setBagages] = useState([]);
  const [bagageDetails, setBagageDetails] = useState({
    weight: "",
    description: "",
  });

  const generateUniqueId = () => {
    return `id_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleAddBagage = () => {
    if (!bagageDetails.weight || !bagageDetails.description) {
      Alert.alert(
        "Erreur",
        "Veuillez remplir tous les champs pour ajouter un bagage."
      );
      return;
    }
    if (bagages.length >= parseInt(billet.numBags, 10)) {
      Alert.alert(
        "Erreur",
        `Vous avez déjà ajouté tous les ${billet.numBags} bagages prévus.`
      );
      return;
    }

    const newBagage = {
      id_bagage: generateUniqueId(),
      weight: bagageDetails.weight,
      description: bagageDetails.description,
    };

    setBagages([...bagages, newBagage]);
    setBagageDetails({ weight: "", description: "" });
  };

  const handleContinue = () => {
    if (bagages.length !== parseInt(billet.numBags, 10)) {
      Alert.alert(
        "Erreur",
        `Le nombre de bagages ajoutés (${bagages.length}) ne correspond pas au nombre prévu (${billet.numBags}).`
      );
      return;
    }
    const updatedBillet = {
      ...billet,
      bagages,
    };
    navigation.navigate("Reservation3", { billet: updatedBillet });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détails des Bagages</Text>

      {bagages.map((bagage, index) => (
        <View key={index} style={styles.bagageContainer}>
          <Text>Bagage {index + 1}</Text>
          <Text>Poids : {bagage.weight} kg</Text>
          <Text>Description : {bagage.description}</Text>
          <Text>QR Code :</Text>
          <QRCode
            value={`https://pmrsae5.github.io/PageQRCode/BagageDetails.html?poids=${encodeURIComponent(
              bagage.weight
            )}&description=${encodeURIComponent(bagage.description)}`}
            size={100}
          />
        </View>
      ))}

      <Text style={styles.label}>Poids (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Poids du bagage"
        keyboardType="numeric"
        value={bagageDetails.weight}
        onChangeText={(text) =>
          setBagageDetails({ ...bagageDetails, weight: text })
        }
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description du bagage"
        value={bagageDetails.description}
        onChangeText={(text) =>
          setBagageDetails({ ...bagageDetails, description: text })
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddBagage}>
        <Text style={styles.addButtonText}>Ajouter le Bagage</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  bagageContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  continueButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default BagageDetails;
