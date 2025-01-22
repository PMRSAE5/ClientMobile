import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";

const BilletDetails = ({ route }) => {
  const billet = route?.params?.billet;

  if (!billet) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Impossible de charger les détails du billet.
        </Text>
      </View>
    );
  }

  const qrData = `https://pmrsae5.github.io/PageQRCode/?nom=${encodeURIComponent(
    billet.name || "Non renseigné"
  )}&prenom=${encodeURIComponent(
    billet.surname || "Non renseigné"
  )}&reservation=${encodeURIComponent(
    billet.num_reservation || "Non renseigné"
  )}&depart=${encodeURIComponent(
    billet.lieu_depart || "Non renseigné"
  )}&arrivee=${encodeURIComponent(
    billet.lieu_arrivee || "Non renseigné"
  )}&bagages=${encodeURIComponent(billet.numBags || "0")}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détails du Billet</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Numéro de Réservation :</Text>
        <Text style={styles.value}>{billet.num_reservation}</Text>

        <Text style={styles.label}>Lieu de Départ :</Text>
        <Text style={styles.value}>{billet.lieu_depart}</Text>

        <Text style={styles.label}>Lieu d'Arrivée :</Text>
        <Text style={styles.value}>{billet.lieu_arrivee}</Text>

        <Text style={styles.label}>Heure de Départ :</Text>
        <Text style={styles.value}>
          {new Date(billet.heure_depart).toLocaleString()}
        </Text>

        <Text style={styles.label}>Heure d'Arrivée :</Text>
        <Text style={styles.value}>
          {new Date(billet.heure_arrivee).toLocaleString()}
        </Text>

        <Text style={styles.label}>Bagages :</Text>
        {billet.bagages && billet.bagages.length > 0 ? (
          billet.bagages.map((bagage, index) => (
            <View key={index} style={styles.bagageContainer}>
              <Text style={styles.bagageTitle}>Bagage {index + 1}</Text>
              <Text>ID Bagage : {bagage.id_bagage}</Text>
              <Text>Poids : {bagage.weight} kg</Text>
              <Text>Description : {bagage.description}</Text>
              {bagage.photo && (
                <Image
                  source={{ uri: bagage.photo }}
                  style={styles.bagagePhoto}
                />
              )}
              <Text>QR Code :</Text>
              <QRCode
                value={`https://pmrsae5.github.io/PageQRCode/BagageDetails.html?poids=${encodeURIComponent(
                  bagage.weight
                )}&description=${encodeURIComponent(bagage.description)}`}
                size={100}
              />
            </View>
          ))
        ) : (
          <Text style={styles.value}>Aucun bagage associé.</Text>
        )}
      </View>

      <View style={styles.qrContainer}>
        <Text style={styles.qrLabel}>QR Code de la Réservation :</Text>
        <QRCode value={qrData} size={200} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    paddingBottom: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  detailContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  bagageContainer: {
    marginTop: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  bagageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  bagagePhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  qrLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});

export default BilletDetails;
