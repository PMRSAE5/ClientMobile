import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { UserContext } from "../UserContext";
import { ThemeContext } from "../ThemeContext"; // Contexte du thème
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Settings({ onLogout }) {
  const { setUser } = useContext(UserContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  if (isDarkMode === undefined || toggleTheme === undefined) {
    console.error("ThemeContext non défini ou mal configuré");
    return null; // Retourne null si le contexte est absent
  }

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Oui",
        onPress: () => {
          setUser(null);
          onLogout();
          navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      {/* Titre */}
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>
        Paramètres
      </Text>

      {/* Option de mode sombre */}
      <View
        style={[
          styles.optionContainer,
          isDarkMode && styles.optionContainerDark,
        ]}
      >
        <Icon name="moon-o" size={24} color={isDarkMode ? "#fff" : "#333"} />
        <Text style={[styles.optionText, isDarkMode && styles.optionTextDark]}>
          Mode sombre
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? "#007bff" : "#ccc"}
          trackColor={{ false: "#ccc", true: "#007bff" }}
        />
      </View>

      {/* Lien vers la page de profil */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode && styles.optionContainerDark,
        ]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="user" size={24} color={isDarkMode ? "#fff" : "#333"} />
        <Text style={[styles.optionText, isDarkMode && styles.optionTextDark]}>
          Mon profil
        </Text>
      </TouchableOpacity>

      {/* Lien vers l’aide */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode && styles.optionContainerDark,
        ]}
        onPress={() =>
          Alert.alert("Aide", "Contactez-nous à support@pmove.com.")
        }
      >
        <Icon
          name="question-circle"
          size={24}
          color={isDarkMode ? "#fff" : "#333"}
        />
        <Text style={[styles.optionText, isDarkMode && styles.optionTextDark]}>
          Aide
        </Text>
      </TouchableOpacity>

      {/* Bouton de déconnexion */}
      <TouchableOpacity
        style={[styles.logoutButton, isDarkMode && styles.logoutButtonDark]}
        onPress={handleLogout}
      >
        <Icon
          name="sign-out"
          size={20}
          color="#fff"
          style={styles.logoutIcon}
        />
        <Text style={styles.logoutButtonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20,
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  titleDark: {
    color: "#fff",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionContainerDark: {
    backgroundColor: "#1e1e1e",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  optionTextDark: {
    color: "#fff",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  logoutButtonDark: {
    backgroundColor: "#8b0000",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutIcon: {
    marginRight: 10,
  },
});
