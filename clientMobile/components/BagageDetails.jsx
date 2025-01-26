import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
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
import { useEffect } from "react";
import TransitionPage from "./TransitionPage";

const BagageDetails = ({ route }) => {
  const [loading, setLoading] = useState(true);
  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayMedium: Raleway_500Medium,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  console.log(route.params.billet);

  const { billet } = route.params || {};
  const [bagages, setBagages] = useState([]);
  const [bagageDetails, setBagageDetails] = useState({
    weight: "",
    description: "",
  });
  const navigation = useNavigation();
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

  const bagageRestrictions = {
    SNCF: {
      info: `Depuis le 15 septembre 2024, chaque voyageur peut transporter :\n
- 2 bagages (max. 70 x 90 x 50 cm)\n
- 1 bagage à main (max. 40 x 30 x 15 cm)\n
Tous les bagages doivent être étiquetés et portés en une fois. Non-conformité : 50 € par bagage, 150 € si obstruction.`,
    },
    RATP: {
      info: `Le bagage ne doit pas dépasser les 15kg, l'agent sera en interdiction de le porter. La RATP recommande des bagages de taille raisonnable pour ne pas gêner les passagers, surtout aux heures de pointe. Les bagages doivent être placés sans obstruer les allées ou les portes.`,
    },
    AirFrance: {
      info: `Conditions selon la cabine choisie :\n
Bagage cabine :\n
- Economy : 1 bagage cabine + 1 accessoire (max. 12 kg)\n
- Premium/Business/La Première : jusqu'à 2 bagages cabine et 1 accessoire (max. 18 kg).\n
Bagage en soute :\n
- Economy : 1 bagage (max. 23 kg)\n
- Premium Economy : 2 bagages (max. 23 kg chacun)\n
- Business : 2 bagages (max. 32 kg chacun)\n
- La Première : 3 bagages (max. 32 kg chacun)\n
Dimensions soute : max. 158 cm (L+l+H).`,
    },
  };

  const selectedTransport = billet?.transport;

  const generateUniqueId = () => {
    return `id_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleAddBagage = () => {
    if (!bagageDetails.weight || !bagageDetails.description) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs pour le bagage.");
      return;
    }

    if (bagages.length >= parseInt(billet.numBags, 10)) {
      Alert.alert(
        "Erreur",
        `Vous avez déjà ajouté tous les ${billet.numBags} bagages prévus.`
      );
      return;
    }

    const newBagage = {
      id_bagage: generateUniqueId(),
      weight: bagageDetails.weight,
      description: bagageDetails.description,
    };

    setBagages([...bagages, newBagage]);
    setBagageDetails({
      weight: "",
      description: "",
    });

    Alert.alert("Succès", "Le bagage a été ajouté avec succès !");
  };

  const handleDeleteBagage = (id) => {
    setBagages((prevBagages) =>
      prevBagages.filter((bagage) => bagage.id_bagage !== id)
    );
    Alert.alert("Bagage supprimé", "Le bagage a été supprimé avec succès !");
  };

  const handleContinue = () => {
    if (bagages.length !== parseInt(billet.numBags, 10)) {
      Alert.alert(
        "Erreur",
        `Le nombre de bagages ajoutés (${bagages.length}) ne correspond pas au nombre prévu (${billet.numBags}).`
      );
      return;
    }
    const updatedBillet = {
      ...billet,
      bagages,
    };
    navigation.navigate("Reservation3", { billet: updatedBillet });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détails des Bagages</Text>

      {bagages.map((bagage, index) => (
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
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteBagage(bagage.id_bagage)}
          >
            <Text style={styles.deleteButtonText}>Supprimer le Bagage</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.label}>Poids (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Poids du bagage"
        keyboardType="numeric"
        value={bagageDetails.weight}
        onChangeText={(text) =>
          setBagageDetails({ ...bagageDetails, weight: text })
        }
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description du bagage"
        value={bagageDetails.description}
        onChangeText={(text) =>
          setBagageDetails({ ...bagageDetails, description: text })
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddBagage}>
        <Text style={styles.addButtonText}>Ajouter le Bagage</Text>
      </TouchableOpacity>

      {selectedTransport && (
        <View style={styles.rulesContainer}>
          <View style={styles.rulesContent}>
            <View style={styles.rulesTextContainer}>
              <Text style={styles.rulesTitle}>
                Restrictions des Bagages pour{" "}
                <Text
                  style={[
                    styles.transport,
                    selectedTransport === "SNCF"
                      ? { color: "#FF6347" }
                      : selectedTransport === "RATP"
                      ? { color: "#32CD32" }
                      : { color: "#1E90FF" },
                  ]}
                >
                  {selectedTransport}
                </Text>
              </Text>
              <Text style={styles.rulesText}>
                {bagageRestrictions[selectedTransport]?.info}
              </Text>
            </View>
            {/* Animation à droite */}
            <LottieView
              source={require("../assets/baggage.json")}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 80,
    paddingBottom: 150,
  },
  animation: {
    width: 168,
    height: 168,
  },
  title: {
    fontFamily: "RalewayBlack",
    color: "#5489CE",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontFamily: "RalewayBlack",
    fontSize: 18,
    fontWeight: "bold",
    color: "#436EA5",
    marginBottom: 10,
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
  rulesContainer: {
    fontFamily: "RalewayBlack",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    overflow: "hidden",
  },
  transport: {
    fontFamily: "RalewayBlack",
    fontSize: 20,
  },
  rulesContent: {
    flexDirection: "row", // Affiche les éléments côte à côte
    alignItems: "center", // Centre les éléments verticalement
    justifyContent: "space-between", // Espace entre le texte et l'animation
  },
  rulesTextContainer: {
    flex: 1, // Le texte occupe l'espace disponible
    paddingRight: 10, // Espace entre le texte et l'animation
  },
  rulesTitle: {
    fontFamily: "RalewayExtraBold",
    color: "#5489CE",
    fontSize: 20,
    marginBottom: 10,
  },
  rulesText: {
    fontFamily: "RalewayRegular",
    color: "#5489CE",
    fontSize: 16,
    lineHeight: 20,
  },

  addButton: {
    backgroundColor: "#5489CE",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  addButtonText: {
    fontFamily: "RalewayExtraBold",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    fontFamily: "RalewayExtraBold",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  bagageContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#5989CE",
    borderRadius: 10,
    backgroundColor: "#B0C4DE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bagageTitle: {
    fontFamily: "RalewayBlack",
    fontSize: 20,
    color: "#5489CE",
    marginBottom: 10,

    textDecorationLine: "underline",
  },
  bagageDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bagageInfo: {
    flex: 1,
  },
  bagageLabel: {
    fontFamily: "RalewayBlack",
    fontSize: 16,

    marginBottom: 4,
  },
  bagageValue: {
    fontFamily: "RalewayRegular",
    fontSize: 16,

    marginBottom: 10,
  },
  qrCodeContainer: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#5489CE",
  },
  deleteButton: {
    marginTop: 15,
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    fontFamily: "RalewayExtraBold",
    color: "#fff",
    fontSize: 16,
  },
});

export default BagageDetails;
