import React, { useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { UserContext } from "../UserContext";
import QRCode from "react-native-qrcode-svg";

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

  const qrData = `https://pmrsae5.github.io/PageQRCode/?nom=${encodeURIComponent(
    user?.name || "Non renseigné"
  )}&prenom=${encodeURIComponent(
    user?.surname || "Non renseigné"
  )}&reservation=${encodeURIComponent(
    billet?.num_reservation || "Non renseigné"
  )}&depart=${encodeURIComponent(
    billet?.lieu_depart || "Non renseigné"
  )}&arrivee=${encodeURIComponent(
    billet?.lieu_arrivee || "Non renseigné"
  )}&bagages=${encodeURIComponent(
    billet?.numBags || "0"
  )}&fauteuilRoulant=${encodeURIComponent(
    Object.keys(billet?.wheelchair || {})
      .filter((key) => billet?.wheelchair[key])
      .join(", ") || "Non"
  )}`;

  const handleConfirm = async () => {
    try {
      const dataToSend = {
        billet: {
          ...billet,
          bagages: billet.bagages || [],
        },
      };

      console.log("Données envoyées à Redis :", dataToSend);

      const response = await fetch(
        "http://172.20.10.2:3000/reservation/addToRedis",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Succès", "Données envoyées à Redis avec succès !");
        navigation.navigate("Confirmation");
      } else {
        Alert.alert("Erreur", result.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      Alert.alert(
        "Erreur",
        "Impossible d'envoyer les données à Redis. Veuillez réessayer."
      );
    }
  };

  return (
    <ScrollView>
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

        {/* Détails des bagages */}
        {billet.bagages && billet.bagages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.label}>Bagages :</Text>
            {billet.bagages.map((bagage, index) => (
              <View key={index} style={styles.bagageContainer}>
                <Text style={styles.bagageTitle}>Bagage {index + 1}</Text>
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
                  value={JSON.stringify({
                    poids: bagage.weight,
                    description: bagage.description,
                    photo: bagage.photo,
                  })}
                  size={100}
                />
              </View>
            ))}
          </View>
        )}

        <View style={styles.qrSection}>
          <Text style={styles.label}>QR Code :</Text>
          <QRCode value={qrData} size={200} />
        </View>

        {/* Bouton pour confirmer */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirmer la Réservation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
