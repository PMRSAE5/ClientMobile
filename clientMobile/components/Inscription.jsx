import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";

export default function Signup({ navigation }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    num: "",
    mail: "",
    handicap: "",
    civilite: "",
    birth: "",
    password: "",
    contact_mail: "",
    contact_num: "",
    note: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/userAdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert("Succès", "Client ajouté avec succès");
      } else {
        Alert.alert("Erreur", result.error || "Erreur inconnue");
      }
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de l'envoi des données");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/BackSingup.jpg")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>S'inscrire</Text>

        {/* Civilité */}
        <Text style={styles.label}>Civilité</Text>
        <View style={styles.radioGroup}>
          {["Mr", "Mme", "Autre"].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.radioOption}
              onPress={() => handleChange("civilite", option)}
            >
              <View
                style={[
                  styles.radioCircle,
                  formData.civilite === option && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nom et Prénom */}
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Prénom</Text>
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={formData.surname}
              onChangeText={(value) => handleChange("surname", value)}
            />
          </View>
        </View>

        {/* Email et Téléphone */}
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Adresse e-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.mail}
              onChangeText={(value) => handleChange("mail", value)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="Téléphone"
              keyboardType="phone-pad"
              value={formData.num}
              onChangeText={(value) => handleChange("num", value)}
            />
          </View>
        </View>

        {/* Handicap et Date de naissance */}
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Handicap</Text>
            <TextInput
              style={styles.input}
              placeholder="Handicap (ex: Fauteuil)"
              value={formData.handicap}
              onChangeText={(value) => handleChange("handicap", value)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Date anniversaire</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={formData.birth}
              onChangeText={(value) => handleChange("birth", value)}
            />
          </View>
        </View>

        {/* Contact Mail et Contact Num */}
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Contact Mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Contact Mail"
              value={formData.contact_mail}
              onChangeText={(value) => handleChange("contact_mail", value)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Contact Num</Text>
            <TextInput
              style={styles.input}
              placeholder="Contact Num"
              keyboardType="phone-pad"
              value={formData.contact_num}
              onChangeText={(value) => handleChange("contact_num", value)}
            />
          </View>
        </View>

        {/* Mot de passe */}
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
            />
          </View>
        </View>

        {/* Conditions générales */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity>
            <Text style={styles.linkText}>
              J'ai lu et j'accepte les Conditions générales
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bouton d'inscription */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>S'inscrire</Text>
        </TouchableOpacity>

        <View style={styles.signupLink}>
          <Text style={styles.signupText}>Déja un compte ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signupButtonText}>Connectez-vous ! </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingVertical: 120,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007bff",
    marginRight: 5,
  },
  radioSelected: {
    backgroundColor: "#007bff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupLink: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 72,
  },
  signupText: {
    fontSize: 14,
    color: "#555",
  },
  signupButtonText: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
    marginLeft: 4,
  },
});
