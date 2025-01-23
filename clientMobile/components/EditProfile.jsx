import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { UserContext } from "../UserContext";
import { update as updateUser } from "../services/api";

export default function EditProfile({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [mail, setMail] = useState(user?.mail || "");
  const [num, setNum] = useState(user?.num || "");
  const [contact_num, setContactnum] = useState(user?.contact_num || "");
  const [birth, setBirth] = useState(user?.birth || "");
  const [handicap, setHandicap] = useState(user?.handicap || "");
  const [emergencyMail, setEmergencyMail] = useState(user?.contact_mail || "");

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ID_Client: user.ID_Client,
        name,
        surname,
        mail,
        num,
        contact_num,
        birth,
        handicap,
        contact_mail: emergencyMail,
      };

      const response = await updateUser(updatedData);

      if (response.success) {
        Alert.alert("Succès", "Vos informations ont été mises à jour.");
        setUser({ ...user, ...updatedData });
        navigation.goBack(); // Retourne à la page précédente après l'enregistrement
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
      <Text style={styles.header}>Modifier le profil</Text>

      <Text style={styles.label}>Prénom</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={mail}
        onChangeText={setMail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Téléphone</Text>
      <TextInput
        style={styles.input}
        value={num}
        onChangeText={setNum}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Contact d'urgence</Text>
      <TextInput
        style={styles.input}
        value={contact_num}
        onChangeText={setContactnum}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Date de naissance</Text>
      <TextInput style={styles.input} value={birth} onChangeText={setBirth} />

      <Text style={styles.label}>Handicap</Text>
      <TextInput
        style={styles.input}
        value={handicap}
        onChangeText={setHandicap}
      />

      <Text style={styles.label}>Email Contact d'urgence</Text>
      <TextInput
        style={styles.input}
        value={emergencyMail}
        onChangeText={setEmergencyMail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#007bff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  saveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
