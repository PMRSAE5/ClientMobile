import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Billet = ({ ticket }) => {
  const navigation = useNavigation();

  const formatDateTime = (isoString) => {
    if (!isoString)
      return { date: "Date non spécifiée", time: "Heure non spécifiée" };

    const dateObj = new Date(isoString);
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();

    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}`,
    };
  };

  const departDateTime = formatDateTime(ticket?.heure_depart);
  const arriveeDateTime = formatDateTime(ticket?.heure_arrivee);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity
        onPress={() => navigation.navigate("BilletDetails", { billet: ticket })}
        style={styles.ticketContainer}
      >
        <View style={styles.ticketHeader}>
          <Text style={styles.departArrivee}>
            {ticket.lieu_depart} {"\n"}à {"\n"}
            {ticket.lieu_arrivee}
          </Text>

          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Départ :</Text>
            <Text style={styles.time}>{departDateTime.time}</Text>
            <Text style={styles.date}>{departDateTime.date}</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Arrivée :</Text>
            <Text style={styles.time}>{arriveeDateTime.time}</Text>
            <Text style={styles.date}>{arriveeDateTime.date}</Text>
          </View>

          <Text style={styles.transportType}>
            {ticket.transport || "Transport non spécifié"}
          </Text>
        </View>

        <View style={styles.ticketBody}>
          <Text style={styles.ticketInfo}>
            {ticket.name} {ticket.surname}
          </Text>
          <Text style={styles.ticketInfo}>
            Accompagnateur : {ticket.acc || "Non spécifié"}
          </Text>
          <Text style={styles.ticketInfo}>
            Type d'assistance : {ticket.assistance || "Non spécifiée"}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  scrollContent: {
    paddingBottom: 5,
  },
  ticketContainer: {
    backgroundColor: "#B0C4DE", // Bleu clair
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderColor: "#5895D6",
    borderWidth: 1,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  departArrivee: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    flex: 2,
  },
  timeContainer: {
    alignItems: "center",
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 3,
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  transportType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "right",
  },
  ticketBody: {
    marginTop: 10,
  },
  ticketInfo: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
});

export default Billet;
