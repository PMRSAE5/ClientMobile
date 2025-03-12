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
  Image,
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
 *
 * @description
 * Fonctionnalités principales :
 * - Affiche un résumé des informations utilisateur issues du contexte.
 * - Affiche les détails de la réservation, y compris le billet, les bagages et l'accompagnateur.
 * - Génère un QR code global pour la réservation, ainsi que des QR codes pour chaque bagage.
 * - Envoie les données de la réservation à un serveur Redis via une API.
 * - Gère les erreurs (données manquantes) avec une interface utilisateur adaptée.
 * - Simule une transition avec un écran de chargement (TransitionPage) avant d'afficher le contenu principal.
 */

const Reservation3 = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const { billet, trajets = [] } = route.params || {};

  const { user } = useContext(UserContext);

  /**
   * Effet useEffect.
   * Simule une période de transition de 5 secondes avant d'afficher le contenu principal.
   *
   * @function
   * @returns {void}
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Bascule sur le contenu après 5 secondes
    }, 5000);

    return () => clearTimeout(timer); // Nettoie le timer au démontage
  }, []);

  if (loading) {
    // Affiche la page de transition si loading est true
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
  /**
   * Fonction handleConfirm.
   * Envoie les données de la réservation (billet, utilisateur, etc.) à un serveur Redis via une API.
   * Confirme la réservation et redirige l'utilisateur vers l'écran de confirmation.
   * Affiche un message d'erreur en cas de problème avec l'envoi des données.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */

  const handleConfirm = async () => {
    try {
      const dataToSend = {
        billet: {
          ...billet,
          bagages: billet.bagages || [],
        },
        email: user.mail,
      };

      console.log(
        "📤 Données envoyées à Redis :",
        JSON.stringify(dataToSend, null, 2)
      );

      const response = await fetch(
        "http://172.20.10.2:3000/reservation/addToRedis",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      const result = await response.json();

      console.log(
        "📥 Réponse reçue de Redis :",
        JSON.stringify(result, null, 2)
      );

      if (response.ok) {
        Alert.alert("Succès", "Données envoyées à Redis et email envoyé !");
        navigation.navigate("Confirmation");
      } else {
        Alert.alert("Erreur", result.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("🚨 Erreur lors de l'envoi des données :", error);
      Alert.alert(
        "Erreur",
        "Impossible d'envoyer les données ou l'email. Veuillez réessayer."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Résumé de votre Enregistrement </Text>
        <Text style={styles.titlesection}>Profile </Text>
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
        <Text style={styles.titlesection}>Détails de l'enregistrement</Text>
        {/* Détails du billet */}
        <View style={styles.section}>
          <Text style={styles.label}>Numéro de Réservation :</Text>
          <Text style={styles.value}>{billet.num_reservation}</Text>
          <Text style={styles.label}>Lieu de Départ :</Text>
          <Text style={styles.value}>{billet.lieu_depart}</Text>
          <Text style={styles.label}>Lieu d'Arrivée :</Text>
          <Text style={styles.value}>{billet.lieu_arrivee}</Text>
          <Text style={styles.label}>Transport :</Text>
          <Text style={styles.value}>{billet.transport}</Text>
          <Text style={styles.label}>Heure de Départ :</Text>
          <Text style={styles.value}>{billet.heure_depart}</Text>
          <Text style={styles.label}>Heure d'Arrivée :</Text>
          <Text style={styles.value}>{billet.heure_arrivee}</Text>
        </View>

        {Object.keys(billet)
          .filter(
            (key) =>
              key.startsWith("num_reservation") && key !== "num_reservation"
          ) // Récupère uniquement les clés des réservations supplémentaires
          .map((key, index) => {
            const numIndex = key.replace("num_reservation", ""); // Récupère l'index du billet (ex: 2, 3, 4...)

            return (
              <View key={numIndex} style={{ marginBottom: 10 }}>
                {/* Titre de la réservation placé en dehors du rectangle */}
                <Text style={styles.titlesection}>
                  Détails de l'enregistrement {numIndex}
                </Text>

                {/* Rectangle contenant les infos de la réservation */}
                <View style={styles.section}>
                  <Text style={styles.label}>Numéro :</Text>
                  <Text style={styles.value}>
                    {billet[`num_reservation${numIndex}`]}
                  </Text>
                  <Text style={styles.label}>Départ :</Text>
                  <Text style={styles.value}>
                    {billet[`lieu_depart${numIndex}`]}
                  </Text>
                  <Text style={styles.label}>Arrivée :</Text>
                  <Text style={styles.value}>
                    {billet[`lieu_arrivee${numIndex}`]}
                  </Text>
                  <Text style={styles.label}>Transport :</Text>
                  <Text style={styles.value}>
                    {billet[`transport${numIndex}`]}
                  </Text>
                  <Text style={styles.label}>Heure de Départ :</Text>
                  <Text style={styles.value}>
                    {billet[`heure_depart${numIndex}`]}
                  </Text>
                  <Text style={styles.label}>Heure d'Arrivée :</Text>
                  <Text style={styles.value}>
                    {billet[`heure_arrivee${numIndex}`]}
                  </Text>
                </View>
              </View>
            );
          })}

        {/* Détails supplémentaires */}
        <Text style={styles.titlesection}>Détails supplémentaires</Text>
        <View style={styles.section}>
          <Text style={styles.value}>
            Nombre de Bagages : {billet.numBags || "Non spécifié"}
          </Text>
          <Text style={styles.value}>
            Type de fauteuil roulant : {billet.wheelchair || "Non spécifié"}
          </Text>
          <Text style={styles.value}>
            Prise de notes : {billet.additionalInfo || "Non spécifié"}
          </Text>
        </View>
        <Text style={styles.titlesection}>Données de l'accompagnateur</Text>
        <View style={styles.section}>
          <Text style={styles.label}>
            {billet.hasCompanion
              ? "Voici votre accompagnateur "
              : "Pas d'accompagnateur pour votre trajet"}
          </Text>
          {billet.hasCompanion && (
            <>
              <Text style={styles.value}>
                Nom : {billet.companion?.name || "Non renseigné"}
              </Text>
              <Text style={styles.value}>
                Prénom : {billet.companion?.surname || "Non renseigné"}
              </Text>
              <Text style={styles.value}>
                Téléphone : {billet.companion?.phone || "Non renseigné"}
              </Text>
              <Text style={styles.value}>
                Email : {billet.companion?.email || "Non renseigné"}
              </Text>
            </>
          )}
        </View>

        {/* Détails des bagages */}
        {billet.bagages && billet.bagages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.label}>Bagages :</Text>
            {billet.bagages.map((bagage, index) => (
              <View key={index} style={styles.bagageContainer}>
                <View style={styles.bagageRow}>
                  {/* Infos du bagage à gauche */}
                  <View style={styles.bagageInfoContainer}>
                    <Text style={styles.bagageTitle}>Bagage {index + 1}</Text>
                    <Text style={styles.bagageLabel}>ID :</Text>
                    <Text style={styles.bagageValue}>{bagage.id_bagage}</Text>
                    <Text style={styles.bagageLabel}>Poids :</Text>
                    <Text style={styles.bagageValue}>{bagage.weight} kg</Text>
                    <Text style={styles.bagageLabel}>Description :</Text>
                    <Text style={styles.bagageValue}>{bagage.description}</Text>
                  </View>
                  {/* QR Code à droite */}
                  <View style={styles.qrCodeContainer}>
                    <QRCode
                      value={`https://pmrsae5.github.io/PageQRCode/BagageDetails.html?poids=${encodeURIComponent(
                        bagage.weight
                      )}&description=${encodeURIComponent(bagage.description)}`}
                      size={100}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.addTripButton}
          onPress={() => navigation.navigate("AjoutTrajet", { billet })}
        >
          <Text style={styles.addTripButtonText}>+ Ajouter un trajet</Text>
        </TouchableOpacity>

        {/* Bouton pour confirmer */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirmer la Réservation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 200, // Ajout d'espace en bas pour garantir que le dernier contenu est visible
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontFamily: "RalewayBlack",
    fontSize: 30,
    color: "#5489CE",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "#B0C4DE",
  },
  titlesection: {
    fontFamily: "RalewayBlack",
    fontSize: 20,
    color: "#5489CE",

    marginBottom: 10,
    textShadowColor: "#B0C4DE",
  },
  section: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#5489CE",
  },
  label: {
    fontFamily: "RalewayExtraBold",
    fontSize: 18,
    color: "#436EA5",
    marginBottom: 10,
  },
  value: {
    fontFamily: "RalewayMedium",
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  bagageContainer: {
    backgroundColor: "#B0C4DE",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#5489CE",
  },
  bagageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bagageInfoContainer: {
    flex: 2,
    paddingRight: 10, // Espacement entre les infos et le QR Code
  },
  qrCodeContainer: {
    flex: 1,
    alignItems: "center",
  },
  bagageTitle: {
    fontFamily: "RalewayBold",
    fontSize: 18,
    color: "#5489CE",
    marginBottom: 10,
  },
  bagageLabel: {
    fontFamily: "RalewayBold",
    fontSize: 16,
    color: "#436EA5",
    marginBottom: 5,
  },
  bagageValue: {
    fontFamily: "RalewayMedium",
    fontSize: 16,
    color: "#000000",
    marginBottom: 10,
  },

  qrSection: {
    alignItems: "center",
    marginTop: 10,
  },
  qrLabel: {
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    color: "#5489CE",
    marginBottom: 8,
  },
  confirmButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  confirmButtonText: {
    fontFamily: "RalewayExtraBold",
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontFamily: "RalewayBold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#5489CE",
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontFamily: "RalewayBold",
    textAlign: "center",
    fontSize: 16,
  },
  addTripButton: {
    backgroundColor: "#FFA500", // Orange pour le différencier
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addTripButtonText: {
    fontFamily: "RalewayExtraBold",
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
  },
});

export default Reservation3;
