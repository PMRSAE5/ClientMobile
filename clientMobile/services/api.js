import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (mail, password) => {
  try {
    console.log("Tentative de connexion à l'API avec :", { mail, password });
    const response = await api.post("/users/userLog", { mail, password });
    console.log("Réponse reçue de l'API :", response.data); // Ajoute ce log
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la requête à l'API :", error);

    if (error.response) {
      console.log(
        "Erreur réponse API :",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.log("Erreur réseau : Aucune réponse reçue.");
    } else {
      console.log("Erreur inconnue :", error.message);
    }

    throw (
      error.response?.data || { message: "Erreur de connexion au serveur." }
    );
  }
};

export const checkReservation = async (num_reservation, base) => {
  try {
    const response = await api.post("/traj/checkReservation", {
      num_reservation: num_reservation,
      base: base,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Erreur lors de la vérification de la réservation.",
      }
    );
  }
};
