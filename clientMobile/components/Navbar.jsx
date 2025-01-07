import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function NavBar() {
  const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
      {/* Home */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Accueil")}
      >
        <Icon name="home" size={24} color="#fff" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      {/* Add */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Réservation")}
      >
        <Icon name="plus-circle" size={24} color="#fff" />
        <Text style={styles.navText}>Réserver</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="user-circle" size={24} color="#fff" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity
        style={[styles.navButton, styles.settingsButton]}
        onPress={() => navigation.navigate("Settings")}
      >
        <Icon name="cogs" size={24} color="#fff" />
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4682B4",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navButton: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    marginTop: 5,
    color: "#fff",
    fontSize: 12,
  },
  settingsButton: {
    borderRadius: 50,
    backgroundColor: "#0C3E6D",
    padding: 10,
    marginLeft: 10,
  },
});
