import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { UserContext } from "../UserContext";
import { ThemeContext } from "../ThemeContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Settings({ onLogout }) {
  const { setUser } = useContext(UserContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [selectedLanguage, setSelectedLanguage] = useState("Français");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#007bff");

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

      {/* Mode sombre */}
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
          thumbColor={isDarkMode ? primaryColor : "#ccc"}
          trackColor={{ false: "#ccc", true: primaryColor }}
        />
      </View>

      {/* Langue */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode && styles.optionContainerDark,
        ]}
        onPress={() =>
          Alert.alert(
            "Changer de langue",
            null,
            [
              {
                text: "Français",
                onPress: () => setSelectedLanguage("Français"),
              },
              {
                text: "Anglais",
                onPress: () => setSelectedLanguage("Anglais"),
              },
              {
                text: "Espagnol",
                onPress: () => setSelectedLanguage("Espagnol"),
              },
            ],
            { cancelable: true }
          )
        }
      >
        <Icon name="globe" size={24} color={isDarkMode ? "#fff" : "#333"} />
        <Text style={[styles.optionText, isDarkMode && styles.optionTextDark]}>
          Langue ({selectedLanguage})
        </Text>
      </TouchableOpacity>

      {/* Notifications */}
      <View
        style={[
          styles.optionContainer,
          isDarkMode && styles.optionContainerDark,
        ]}
      >
        <Icon name="bell" size={24} color={isDarkMode ? "#fff" : "#333"} />
        <Text style={[styles.optionText, isDarkMode && styles.optionTextDark]}>
          Notifications
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={notificationsEnabled ? primaryColor : "#ccc"}
          trackColor={{ false: "#ccc", true: primaryColor }}
        />
      </View>

      {/* Modifier le mot de passe */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode && styles.optionContainerDark,
        ]}
        onPress={() => Alert.alert("Modifier votre mot de passe")}
      >
        <Icon name="lock" size={24} color={isDarkMode ? "#fff" : "#333"} />
        <Text style={[styles.optionText, isDarkMode && styles.optionTextDark]}>
          Modifier le mot de passe
        </Text>
      </TouchableOpacity>

      {/* Modifier le profil */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode && styles.optionContainerDark,
        ]}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Icon
          name="user-circle"
          size={24}
          color={isDarkMode ? "#fff" : "#333"}
        />
        <Text style={[styles.optionText, isDarkMode && styles.optionTextDark]}>
          Modifier le profil
        </Text>
      </TouchableOpacity>

      {/* À propos */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode && styles.optionContainerDark,
        ]}
        onPress={() =>
          Alert.alert(
            "À propos",
            "Version 1.0.0\nPolitique de confidentialité."
          )
        }
      >
        <Icon
          name="info-circle"
          size={24}
          color={isDarkMode ? "#fff" : "#333"}
        />
        <Text style={[styles.optionText, isDarkMode && styles.optionTextDark]}>
          À propos de l'application
        </Text>
      </TouchableOpacity>

      {/* Support */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode && styles.optionContainerDark,
        ]}
        onPress={() => Alert.alert("Contactez-nous à support@pmove.com")}
      >
        <Icon name="envelope" size={24} color={isDarkMode ? "#fff" : "#333"} />
        <Text style={[styles.optionText, isDarkMode && styles.optionTextDark]}>
          Support
        </Text>
      </TouchableOpacity>

      {/* Déconnexion */}
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
    gap: 10,
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
