import React, { useContext, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { UserContext } from "../UserContext";
import QRCode from "react-native-qrcode-svg";
import { addBilletToRedis } from "../services/api";

const Reservation3 = ({ route, navigation }) => {
  const { billet } = route.params || {};
  const { user } = useContext(UserContext);

  if (!billet) {
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

  console.log("Utilisateur :", user);

  // Contenu du QR Code
  const qrData = JSON.stringify({
    nom: user?.name,
    prenom: user?.surname,
    reservation: billet?.num_reservation,
    depart: billet?.lieu_depart,
    arrivee: billet?.lieu_arrivee,
    bagages: billet?.numBags || "0",
    fauteuilRoulant:
      Object.keys(billet?.wheelchair || {})
        .filter((key) => billet?.wheelchair[key])
        .join(", ") || "Non",
  });

  const handleConfirm = async () => {
    try {
      console.log("Tentative d'ajout du billet à Redis :", billet);
      const response = await addBilletToRedis(billet);
      console.log("Réponse après ajout à Redis :", response);

      Alert.alert(
        "Confirmation",
        "Votre réservation a été confirmée et ajoutée à Redis avec succès."
      );

      // Naviguer ou effectuer une autre action
    } catch (error) {
      console.error("Erreur lors de l'ajout du billet à Redis :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de l'ajout à Redis. Veuillez réessayer."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résumé de votre Réservation</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.value}>{user?.name || "Non renseigné"}</Text>
        <Text style={styles.label}>Prénom :</Text>
        <Text style={styles.value}>{user?.surname || "Non renseigné"}</Text>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{user?.num || "Non renseigné"}</Text>
        <Text style={styles.label}>Prénom :</Text>
        <Text style={styles.value}>{user?.mail || "Non renseigné"}</Text>
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
        <Text>Nombre de Bagages : {billet.numBags || "Non spécifié"}</Text>
        <Text>
          Fauteuil Roulant :
          {Object.keys(billet.wheelchair || {})
            .filter((key) => billet.wheelchair[key])
            .join(", ") || "Non"}
        </Text>
        <Text>
          Informations Supplémentaires :{" "}
          {billet.additionalInfo || "Non spécifié"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          Données de l'accompagnateur :{" "}
          {billet.hasCompanion ? "Oui" : "Pas d'accompagnateur"}
        </Text>
        {billet.hasCompanion && (
          <>
            <Text>Nom : {billet.name}</Text>
            <Text>Prénom : {billet.surname}</Text>
            <Text>Téléphone : {billet.phone}</Text>
            <Text>Email : {billet.email}</Text>
          </>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>QR Code de la Réservation :</Text>
        <QRCode value={qrData} size={200} />
      </View>

      {/* Bouton pour confirmer */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmer la Réservation</Text>
      </TouchableOpacity>
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
