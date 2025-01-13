import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../UserContext";

export default function Reservation2({ route }) {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext); // Utilisation du contexte utilisateur
  const [hasCompanion, setHasCompanion] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [numBags, setNumBags] = useState("");
  const [wheelchair, setWheelchair] = useState({
    RM: false,
    RE: false,
    Emprunt: false,
  });
  const [additionalInfo, setAdditionalInfo] = useState("");
  const { billet } = route.params || {}; // Récupérer les données du billet

  useEffect(() => {
    console.log("Billet dans Reservation2 :", user?.billet);
  }, [user]);

  const handleSubmit = () => {
    const formData = {
      hasCompanion,
      numBags,
      wheelchair,
      additionalInfo,
    };

    // Inclure les données de l'accompagnateur si elles sont remplies
    if (hasCompanion) {
      formData.name = name;
      formData.surname = surname;
      formData.phone = phone;
      formData.email = email;
    }

    console.log("FormData soumis :", formData);

    // Naviguer vers Reservation3 avec billet + formData
    navigation.navigate("Reservation3", { billet, formData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informations Personnelles</Text>
      <Text style={styles.subtitle}>
        Veuillez fournir vos informations pour une assistance personnalisée :
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Avez-vous un accompagnateur ?</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.checkboxButton,
              hasCompanion === true && styles.activeButton,
            ]}
            onPress={() => setHasCompanion(true)}
          >
            <Text
              style={[
                styles.checkboxText,
                hasCompanion === true && styles.activeText,
              ]}
            >
              Oui
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkboxButton,
              hasCompanion === false && styles.activeButton,
            ]}
            onPress={() => setHasCompanion(false)}
          >
            <Text
              style={[
                styles.checkboxText,
                hasCompanion === false && styles.activeText,
              ]}
            >
              Non
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {hasCompanion && (
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={surname}
            onChangeText={setSurname}
          />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      )}

      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de bagages"
          keyboardType="numeric"
          value={numBags}
          onChangeText={setNumBags}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Utilisation d'un fauteuil roulant :</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.checkboxButton,
              wheelchair.RM && styles.activeButton,
            ]}
            onPress={() => setWheelchair((prev) => ({ ...prev, RM: !prev.RM }))}
          >
            <Text
              style={[styles.checkboxText, wheelchair.RM && styles.activeText]}
            >
              RM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkboxButton,
              wheelchair.RE && styles.activeButton,
            ]}
            onPress={() => setWheelchair((prev) => ({ ...prev, RE: !prev.RE }))}
          >
            <Text
              style={[styles.checkboxText, wheelchair.RE && styles.activeText]}
            >
              RE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkboxButton,
              wheelchair.Emprunt && styles.activeButton,
            ]}
            onPress={() =>
              setWheelchair((prev) => ({ ...prev, Emprunt: !prev.Emprunt }))
            }
          >
            <Text
              style={[
                styles.checkboxText,
                wheelchair.Emprunt && styles.activeText,
              ]}
            >
              Emprunt
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Décrivez votre situation pour une assistance optimale"
          multiline={true}
          numberOfLines={4}
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Envoyer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  checkboxButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    minWidth: 100,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  checkboxText: {
    fontSize: 16,
    color: "#333",
  },
  activeText: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
