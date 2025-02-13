/**
 * @file Reservation3.js
 * @description Composant pour afficher un résumé détaillé de la réservation de l'utilisateur, y compris les informations personnelles, les détails de la réservation et des QR codes générés dynamiquement.
 */

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { UserContext } from "../UserContext";
import QRCode from "react-native-qrcode-svg";
import TransitionPage from "./TransitionPage";

/**
 * Composant principal Reservation3.
 * Affiche un résumé détaillé de la réservation de l'utilisateur, comprenant :
 * - Les informations personnelles issues du contexte utilisateur.
 * - Les détails du billet, y compris le numéro de réservation, les lieux de départ et d'arrivée.
 * - Les détails supplémentaires comme le nombre de bagages, les notes additionnelles, et l'utilisation de fauteuils roulants.
 * - Les informations d'un éventuel accompagnateur.
 * - Génère des QR codes pour la réservation et pour chaque bagage.
 * - Permet à l'utilisateur de confirmer la réservation et d'envoyer les données à une base de données Redis.
 *
 * @component
 * @example
 * <Reservation3 route={route} navigation={navigation} />
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.route - Contient les données de navigation, notamment les informations du billet.
 * @param {Object} props.navigation - L'objet de navigation pour naviguer entre les écrans.
 *
 * @returns {JSX.Element} Le composant Reservation3.
 */

const Reservation3 = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const { billet } = route.params || {};
  const { user } = useContext(UserContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <TransitionPage />;
  }

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
        email: user.mail,
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
        Alert.alert("Succès", "Données envoyées à Redis et email envoyé !");
        navigation.navigate("Confirmation");
      } else {
        Alert.alert("Erreur", result.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      Alert.alert(
        "Erreur",
        "Impossible d'envoyer les données ou l'email. Veuillez réessayer."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Résumé de votre Enregistrement</Text>
        <Text style={styles.titlesection}>Profile </Text>
        <View style={styles.section}>
          <Text style={styles.label}>Nom :</Text>
          <Text style={styles.value}>{user?.name || "Non renseigné"}</Text>
          <Text style={styles.label}>Prénom :</Text>
          <Text style={styles.value}>{user?.surname || "Non renseigné"}</Text>
        </View>
        <Text style={styles.titlesection}>Détails de la réservation</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Numéro de Réservation :</Text>
          <Text style={styles.value}>{billet.num_reservation}</Text>
          <Text style={styles.label}>Lieu de Départ :</Text>
          <Text style={styles.value}>{billet.lieu_depart}</Text>
          <Text style={styles.label}>Lieu d'Arrivée :</Text>
          <Text style={styles.value}>{billet.lieu_arrivee}</Text>
        </View>

        <View style={styles.qrSection}>
          <Text style={styles.label}>QR Code :</Text>
          <QRCode value={qrData} size={200} />
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirmer la Réservation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.newTripButton}
          onPress={() => navigation.navigate("Reservation")}
        >
          <Text style={styles.newTripButtonText}>Prendre un autre trajet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, paddingBottom: 200 },
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: {
    fontSize: 30,
    color: "#5489CE",
    textAlign: "center",
    marginBottom: 20,
  },
  titlesection: { fontSize: 20, color: "#5489CE", marginBottom: 10 },
  section: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#5489CE",
  },
  label: { fontSize: 18, color: "#436EA5", marginBottom: 10 },
  value: { fontSize: 16, color: "#333", marginBottom: 10 },
  qrSection: { alignItems: "center", marginTop: 10 },
  confirmButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
  },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: { padding: 10, backgroundColor: "#5489CE", borderRadius: 5 },
  backButtonText: { color: "#fff", textAlign: "center", fontSize: 16 },
  newTripButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  newTripButtonText: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
  },
});

export default Reservation3;
