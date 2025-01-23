import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { UserContext } from "../UserContext";
import QRCode from "react-native-qrcode-svg";

export default function Profile() {
  const { user } = useContext(UserContext);

  // Fonction pour formater la date en français
  const formatDateToFrench = (dateString) => {
    if (!dateString) return "Non renseigné";
    const options = { year: "numeric", month: "long", day: "numeric" };
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("fr-FR", options).format(date);
    } catch (error) {
      console.error("Erreur lors du formatage de la date :", error);
      return "Non valide";
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Mon espace PMOVE</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("../assets/PMoveLogoSANSTITRE.png")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>
          {user?.name || "Non renseigné"} {user?.surname || "Non renseigné"}
        </Text>
      </View>

      {/* Information Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Informations personnelles</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email :</Text>
          <Text style={styles.infoValue}>{user?.mail || "Non renseigné"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Téléphone :</Text>
          <Text style={styles.infoValue}>{user?.num || "Non renseigné"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date de naissance :</Text>
          <Text style={styles.infoValue}>
            {formatDateToFrench(user?.birth) || "Non renseigné"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Handicap :</Text>
          <Text style={styles.infoValue}>
            {user?.handicap || "Non renseigné"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Contact d'urgence :</Text>
          <Text style={styles.infoValue}>
            {user?.contact_num || "Non renseigné"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email Contact d'urgence :</Text>
          <Text style={styles.infoValue}>
            {user?.contact_mail || "Non renseigné"}
          </Text>
        </View>
      </View>

      {/* QR Code Section */}
      <View style={styles.qrCodeSection}>
        <Text style={styles.infoTitle}>QR Code</Text>
        <QRCode
          value={`https://pmrsae5.github.io/PageQRCode/client.html?name=${encodeURIComponent(
            user?.name || "Non renseigné"
          )}&surname=${encodeURIComponent(
            user?.surname || "Non renseigné"
          )}&mail=${encodeURIComponent(
            user?.mail || "Non renseigné"
          )}&num=${encodeURIComponent(
            user?.num || "Non renseigné"
          )}&handicap=${encodeURIComponent(
            user?.handicap || "Non renseigné"
          )}&birth=${encodeURIComponent(
            user?.birth || "Non renseigné"
          )}&contact_mail=${encodeURIComponent(
            user?.contact_mail || "Non renseigné"
          )}&contactnum=${encodeURIComponent(
            user?.contact_num || "Non renseigné"
          )}`}
          size={200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5895D6",
    textAlign: "center",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  infoSection: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5895D6",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  qrCodeSection: {
    alignItems: "center",
    marginTop: 20,
  },
});
