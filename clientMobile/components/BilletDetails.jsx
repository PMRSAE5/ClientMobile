import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { deleteReservationFromRedis } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import Billet from "../components/Billet";
import {
  useFonts,
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
} from "@expo-google-fonts/raleway";

const BilletDetails = ({ route }) => {
  const billet = route?.params?.billet;
  const navigation = useNavigation();

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayMedium: Raleway_500Medium,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

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

  const handleDeleteReservation = async () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer cette réservation ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              const response = await deleteReservationFromRedis(
                billet.num_reservation
              );

              Alert.alert(
                "Succès",
                response.message ||
                  "La réservation a été supprimée avec succès."
              );
              navigation.navigate("Accueil");
            } catch (error) {
              Alert.alert(
                "Erreur",
                error.message ||
                  "Une erreur est survenue lors de la suppression."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détails du Billet</Text>
      <Billet ticket={billet} />

      {/* Détails de la réservation */}
      <View style={styles.detailContainer}>
        {/* Affichage des informations deux par deux */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Numéro de Réservation :</Text>
            <Text style={styles.value}>{billet.num_reservation}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Lieu de Départ :</Text>
            <Text style={styles.value}>{billet.lieu_depart}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Lieu d'Arrivée :</Text>
            <Text style={styles.value}>{billet.lieu_arrivee}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Heure de Départ :</Text>
            <Text style={styles.value}>
              {new Date(billet.heure_depart).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Heure d'Arrivée :</Text>
            <Text style={styles.value}>
              {new Date(billet.heure_arrivee).toLocaleString()}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Type de Fauteuil Roulant :</Text>
            <Text style={styles.value}>{billet.wheelchair || "Aucun"}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Informations Supplémentaires :</Text>
            <Text style={styles.value}>
              {billet.additionalInfo || "Non spécifié"}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Nombre de Bagages :</Text>
            <Text style={styles.value}>{billet.numBags || "0"}</Text>
          </View>
        </View>

        {/* Informations accompagnateur */}
        <Text style={styles.label}>Accompagnateur :</Text>
        {billet.hasCompanion ? (
          <View style={styles.companionContainer}>
            <Text style={styles.value}>Nom : {billet.companion.name}</Text>
            <Text style={styles.value}>
              Prénom : {billet.companion.surname}
            </Text>
            <Text style={styles.value}>
              Téléphone : {billet.companion.phone}
            </Text>
            <Text style={styles.value}>Email : {billet.companion.email}</Text>
          </View>
        ) : (
          <Text style={styles.value}>Pas d'accompagnateur</Text>
        )}

        {/* Détails des bagages */}
        <Text style={styles.label}>Bagages :</Text>
        {billet.bagages && billet.bagages.length > 0 ? (
          billet.bagages.map((bagage, index) => (
            <View key={index} style={styles.bagageContainer}>
              <Text style={styles.bagageTitle}>Bagage {index + 1}</Text>
              <View style={styles.bagageDetails}>
                <View style={styles.bagageInfo}>
                  <Text style={styles.bagageLabel}>Poids :</Text>
                  <Text style={styles.bagageValue}>{bagage.weight} kg</Text>

                  <Text style={styles.bagageLabel}>Description :</Text>
                  <Text style={styles.bagageValue}>{bagage.description}</Text>
                </View>

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
          ))
        ) : (
          <Text style={styles.value}>Aucun bagage associé.</Text>
        )}
      </View>

      <View style={styles.qrContainer}>
        <Text style={styles.qrLabel}>QR Code de la Réservation :</Text>
        <QRCode value={qrData} size={200} />
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteReservation}
      >
        <Text style={styles.deleteButtonText}>Supprimer la Réservation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    flexGrow: 1,
    padding: 20,

    paddingBottom: 200,
  },
  title: {
    fontFamily: "RalewayBlack",
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  detailContainer: {
    alignSelf: "stretch",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontFamily: "RalewayMedium",
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  companionContainer: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  bagageContainer: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#5489CE",
    borderRadius: 10,
    backgroundColor: "#B0C4DE",
  },
  bagageTitle: {
    fontFamily: "RalewayBlack",
    fontSize: 20,
    color: "#5489CE",
    marginBottom: 10,
  },
  bagageDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bagageInfo: {
    flex: 1,
  },
  bagageLabel: {
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bagageValue: {
    fontFamily: "RalewayMedium",
    fontSize: 16,
    marginBottom: 10,
  },
  qrCodeContainer: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#5489CE",
  },
  qrContainer: {
    alignItems: "center",

    alignSelf: "stretch",
  },
  qrLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
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
