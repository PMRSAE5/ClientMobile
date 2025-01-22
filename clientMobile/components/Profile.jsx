import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { UserContext } from "../UserContext";
import { update as updateUser } from "../services/api";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [mail, setMail] = useState(user?.mail || "");
  const [num, setNum] = useState(user?.num || "");
  const [contactnum, setContactnum] = useState(user?.contact_num || "");

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ID_Client: user.ID_Client,
        name,
        surname,
        mail,
        num,
        contact_num,
      };
      const response = await updateUser(updatedData);

      if (response.success) {
        Alert.alert("Succès", "Vos informations ont été mises à jour.");
        setUser({ ...user, name, surname, mail, num, contactnum });
        setIsEditing(false);
      } else {
        Alert.alert(
          "Erreur",
          response.message || "Impossible de mettre à jour vos informations."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour.");
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
          source={require("../assets/icon.png")} // Image de profil par défaut
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>
          {name} {surname}
        </Text>
      </View>

      {/* Information Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Informations personnelles</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Prénom :</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.infoValue}>{name || "Non renseigné"}</Text>
            )}
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Nom :</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={surname}
                onChangeText={setSurname}
              />
            ) : (
              <Text style={styles.infoValue}>{surname || "Non renseigné"}</Text>
            )}
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Téléphone :</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={num}
                onChangeText={setNum}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.infoValue}>{num || "Non renseigné"}</Text>
            )}
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Contact d'urgence :</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={contactnum}
                onChangeText={setContactnum}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.infoValue}>
                {contactnum || "Non renseigné"}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Email :</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={mail}
                onChangeText={setMail}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.infoValue}>{mail || "Non renseigné"}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Button Section */}
      <View style={styles.buttonSection}>
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  infoColumn: {
    flex: 1,
    marginHorizontal: 5,
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 14,
  },
  buttonSection: {
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
