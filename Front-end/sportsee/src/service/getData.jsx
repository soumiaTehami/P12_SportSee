/**
 * @file getData.js
 * @description Ce fichier contient des fonctions pour interagir avec l'API utilisateur. Chaque fonction permet de
 * récupérer des données spécifiques en fonction de l'ID utilisateur.
 */
import data from "../dataMock/data";
const baseUrl = `http://localhost:3000/user`;

/**
 * Récupère les informations générales d'un utilisateur.
 *
 * @async
 * @function Utilisateur
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object>} Les données utilisateur sous forme d'objet JSON.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
export const Utilisateur = async (userId) => {
  try {
    const response = await fetch(baseUrl + `/${userId}`);

    if (!response.ok) {
      console.log(userId + "data walo");

      throw new Error(
        `Erreur de chargement des données : ${response.statusText}`
      );
    }

    const res = await response.json();

    return res.data;
  } catch (err) {
    console.error("Erreur lors de la récupération des données:", err);
    return data.USER_MAIN_DATA.find((user) => user.id === userId);
  }
};

/**
 /**
 * Récupère les données d'activité quotidienne d'un utilisateur.
 *
 * @async
 * @function Activities
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object>} Les données d'activité sous forme d'objet JSON.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
export const Activities = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/${userId}/activity`);

    if (!response.ok) {
      throw new Error(
        `Erreur de chargement des données : ${response.statusText}`
      );
    }

    const res = await response.json();
    return res.data; // Retourne les données d'activité spécifiques.
  } catch (err) {
    console.error("Erreur lors de la récupération des données d'activité:", err);
    // Retourne les données locales mockées en cas d'échec.
    return data.USER_ACTIVITY.find((activity) => activity.userId === userId);
  }
};


/**
 * 
 /**
 * Récupère les données des sessions moyennes d'un utilisateur.
 *
 * @async
 * @function AverageSession
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object>} Les données de sessions moyennes sous forme d'objet JSON.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
export const AverageSession = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/${userId}/average-sessions`);

    if (!response.ok) {
      throw new Error(
        `Erreur de chargement des données : ${response.statusText}`
      );
    }

    const res = await response.json();
    return res.data; // Retourne les données des sessions moyennes spécifiques.
  } catch (err) {
    console.error("Erreur lors de la récupération des données des sessions moyennes:", err);
    // Retourne les données locales mockées en cas d'échec.
    return data.USER_AVERAGE_SESSIONS.find(
      (session) => session.userId === userId
    );
  }
};


/**
 * /**
 * Récupère les données de performance d'un utilisateur.
 *
 * @async
 * @function Performance
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object>} Les données de performance sous forme d'objet JSON.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
export const Performance = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/${userId}/performance`);

    if (!response.ok) {
      throw new Error(
        `Erreur de chargement des données : ${response.statusText}`
      );
    }

    const res = await response.json();
    return res.data; // Retourne les données de performance spécifiques.
  } catch (err) {
    console.error("Erreur lors de la récupération des données de performance:", err);
    // Retourne les données locales mockées en cas d'échec.
    return data.USER_PERFORMANCE.find((perf) => perf.userId === userId);
  }
};

 

/**
 * Récupère le score quotidien d'un utilisateur.
 *
 * @async
 * @function Score
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object>} Les données de score sous forme d'objet JSON.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
export const Score = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/${userId}/`);

    if (!response.ok) {
      throw new Error(
        `Erreur de chargement des données : ${response.statusText}`
      );
    }

    const res = await response.json();
    return res.data; // Retourne les données spécifiques du score.
  } catch (err) {
    console.error("Erreur lors de la récupération des données de score:", err);
    // Retourne les données locales mockées en cas d'échec.
    return data.USER_MAIN_DATA.find((user) => user.id === userId);
  }
};
