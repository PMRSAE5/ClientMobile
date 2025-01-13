import React, { useContext, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { UserContext } from "../UserContext";
import QRCode from "react-native-qrcode-svg";

const Reservation3 = ({ route, navigation }) => {
  const { billet, formData } = route.params || {};
  const { user } = useContext(UserContext);

  if (!billet || !formData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur : Données manquantes.</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  console.log("=== Données reçues dans Reservation3 ===");
  console.log("Billet :", billet);
  console.log("FormData :", formData);
  console.log("Utilisateur :", user);

  // Contenu du QR Code
  const qrData = JSON.stringify({
    nom: user?.name,
    prenom: user?.surname,
    reservation: billet?.num_reservation,
    depart: billet?.lieu_depart,
    arrivee: billet?.lieu_arrivee,
    bagages: formData?.numBags || "0",
    fauteuilRoulant:
      Object.keys(formData?.wheelchair || {})
        .filter((key) => formData?.wheelchair[key])
        .join(", ") || "Non",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résumé de votre Réservation</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.value}>{user?.name || "Non renseigné"}</Text>
        <Text style={styles.label}>Prénom :</Text>
        <Text style={styles.value}>{user?.surname || "Non renseigné"}</Text>
      </View>

      {/* Détails du billet */}
      <View style={styles.section}>
        <Text style={styles.label}>Numéro de Réservation :</Text>
        <Text style={styles.value}>{billet.num_reservation}</Text>
        <Text style={styles.label}>Lieu de Départ :</Text>
        <Text style={styles.value}>{billet.lieu_depart}</Text>
        <Text style={styles.label}>Lieu d'Arrivée :</Text>
        <Text style={styles.value}>{billet.lieu_arrivee}</Text>
      </View>

      {/* Détails supplémentaires */}
      <View style={styles.section}>
        <Text style={styles.label}>Informations Personnelles</Text>
        <Text>Nombre de Bagages : {formData?.numBags || "Non spécifié"}</Text>
        <Text>
          Fauteuil Roulant :
          {Object.keys(formData?.wheelchair || {})
            .filter((key) => formData?.wheelchair[key])
            .join(", ") || "Non"}
        </Text>
        <Text>
          Informations Supplémentaires :{" "}
          {formData?.additionalInfo || "Non spécifié"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          Données de l'accompagnateur :{" "}
          {formData?.hasCompanion ? "Oui" : "Pas d'accompagnateur"}
        </Text>
        {formData?.hasCompanion && (
          <>
            <Text>Nom : {formData?.name}</Text>
            <Text>Prénom : {formData?.surname}</Text>
            <Text>Téléphone : {formData?.phone}</Text>
            <Text>Email : {formData?.email}</Text>
          </>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>QR Code de la Réservation :</Text>
        <QRCode value={qrData} size={200} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  section: { marginBottom: 20 },
  label: { fontWeight: "bold", marginBottom: 5 },
  value: { marginBottom: 10 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 18, textAlign: "center" },
  backButton: { padding: 10, backgroundColor: "#007bff", borderRadius: 5 },
  backButtonText: { color: "#fff", textAlign: "center" },
});

export default Reservation3;
