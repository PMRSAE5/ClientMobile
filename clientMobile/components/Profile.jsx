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
import { update as updateUser } from "../services/api"; // Renommé l'import pour éviter les conflits

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  // États pour gérer les modifications
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [mail, setMail] = useState(user?.mail || "");
  const [num, setNum] = useState(user?.num || "");

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ID_Client: user.ID_Client,
        name,
        surname,
        mail,
        num,
      };
      console.log("Données envoyées :", updatedData);

      const response = await updateUser(updatedData); // Utilise la fonction importée `updateUser`
      console.log("Réponse de l'API :", response);

      if (response.success) {
        Alert.alert("Succès", "Vos informations ont été mises à jour.");
        setUser({ ...user, name, surname, mail, num }); // Met à jour le contexte utilisateur
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
      <Text style={styles.title}>Profil</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Nom :</Text>
        {isEditing ? (
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        ) : (
          <Text style={styles.value}>{name}</Text>
        )}

        <Text style={styles.label}>Prénom :</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={surname}
            onChangeText={setSurname}
          />
        ) : (
          <Text style={styles.value}>{surname}</Text>
        )}

        <Text style={styles.label}>Email :</Text>
        {isEditing ? (
          <TextInput style={styles.input} value={mail} onChangeText={setMail} />
        ) : (
          <Text style={styles.value}>{mail}</Text>
        )}

        <Text style={styles.label}>Numéro :</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={num}
            onChangeText={setNum}
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.value}>{num}</Text>
        )}
      </View>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});
