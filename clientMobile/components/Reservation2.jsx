import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../UserContext";
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
import LottieView from "lottie-react-native";
import TransitionPage from "./TransitionPage";

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
  const [loading, setLoading] = useState(true);
  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayMedium: Raleway_500Medium,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  // Simule une période de transition (5 secondes)
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

  const handleSubmit = () => {
    if (!numBags) {
      Alert.alert("Erreur", "Veuillez spécifier le nombre de bagages.");
      return;
    }

    if (numBags === "0") {
      Alert.alert(
        "Aucun bagage",
        "Vous n'avez pas de bagages, redirection vers la page suivante..."
      );

      // Naviguer directement vers Reservation3
      const updatedBillet = {
        ...billet,
        name: user?.name,
        surname: user?.surname,
        phone: user?.num,
        email: user?.mail,
        numBags: "0",
        additionalInfo,
        wheelchair,
        hasCompanion,
        companion: hasCompanion
          ? {
              name,
              surname,
              phone,
              email,
            }
          : null, // Si l'utilisateur a un accompagnateur, inclure ses informations
      };

      console.log("Billet mis à jour sans bagages :", updatedBillet);

      navigation.navigate("Reservation3", { billet: updatedBillet });
      return; // Arrête l'exécution ici pour ne pas continuer
    }

    // Ajouter les données du formulaire au billet existant
    const updatedBillet = {
      ...billet,
      name: user?.name,
      surname: user?.surname,
      phone: user?.num,
      email: user?.mail,
      numBags,
      additionalInfo,
      wheelchair,
      hasCompanion,
      companion: hasCompanion
        ? {
            name,
            surname,
            phone,
            email,
          }
        : null, // Si l'utilisateur a un accompagnateur, inclure ses informations
    };

    console.log("Billet mis à jour :", updatedBillet);

    // Naviguer vers Reservation3 avec le billet mis à jour
    navigation.navigate("BagageDetails", { billet: updatedBillet });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Informations Supplémentaires</Text>
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
          <Text style={styles.label}>Sélectionner le nombre de bagages</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de bagages "
            keyboardType="numeric"
            value={numBags}
            onChangeText={setNumBags}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Utilisation d'un fauteuil roulant </Text>
          <View style={styles.row2}>
            {/* Animation Lottie à gauche */}
            <LottieView
              source={require("../assets/handicap-animation.json")}
              autoPlay
              loop
              style={styles.animation}
            />

            {/* Choix du fauteuil roulant à droite */}
            <View style={styles.wheelchairOptions}>
              <TouchableOpacity
                style={[
                  styles.checkboxButton,
                  wheelchair === "RM" && styles.activeButton,
                ]}
                onPress={() => setWheelchair("RM")} // Sélectionne uniquement "RM"
              >
                <Text
                  style={[
                    styles.checkboxText,
                    wheelchair === "RM" && styles.activeText,
                  ]}
                >
                  RM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.checkboxButton,
                  wheelchair === "RE" && styles.activeButton,
                ]}
                onPress={() => setWheelchair("RE")} // Sélectionne uniquement "RE"
              >
                <Text
                  style={[
                    styles.checkboxText,
                    wheelchair === "RE" && styles.activeText,
                  ]}
                >
                  RE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.checkboxButton,
                  wheelchair === "Emprunt" && styles.activeButton,
                ]}
                onPress={() => setWheelchair("Emprunt")} // Sélectionne uniquement "Emprunt"
              >
                <Text
                  style={[
                    styles.checkboxText,
                    wheelchair === "Emprunt" && styles.activeText,
                  ]}
                >
                  Emprunt
                </Text>
              </TouchableOpacity>
            </View>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 80,
    paddingBottom: 150,
  },
  title: {
    fontFamily: "RalewayBlack",
    fontSize: 26,
    fontWeight: "bold",
    color: "#5489CE",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    color: "#436EA5",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "RalewayBlack",
    fontSize: 18,
    fontWeight: "bold",
    color: "#436EA5",
    marginBottom: 10,
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  animation: {
    width: 150,
    height: 150,
  },
  wheelchairOptions: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
  },
  checkboxButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#5489CE",
    minWidth: 100,
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxButton2: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#5489CE",
    minWidth: 100,
    alignItems: "center",
    marginBottom: 10,
  },
  activeButton: {
    backgroundColor: "#B0C4DE",
  },
  checkboxText: {
    fontFamily: "RalewayBlack",
    color: "#5489CE",
    fontSize: 16,
  },
  activeText: {
    color: "#fff",
  },
  input: {
    marginBottom: 10,
    fontFamily: "RalewayMedium",
    borderWidth: 1,
    borderColor: "#5489CE",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  textarea: {
    fontFamily: "RalewayMedium",
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#5489CE",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    fontFamily: "RalewayExtraBold",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
