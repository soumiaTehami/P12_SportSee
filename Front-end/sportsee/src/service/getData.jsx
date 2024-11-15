const baseUrl = `http://localhost:3000/user`;

export const Activities = async (userId) => {
  try {
    const response = await fetch(baseUrl + `/${userId}/activity`);

    if (!response.ok) {
      throw new Error(
        `Erreur de chargement des données : ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    console.error("Erreur lors de la récupération des données:", err);
  }
};
export const AverageSession= async (userId) => {
  try {
    const response = await fetch(baseUrl + `/${userId}/average-sessions`);

    if (!response.ok) {
      throw new Error(
        `Erreur de chargement des données : ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    console.error("Erreur lors de la récupération des données:", err);
  }
};
export const Performance= async (userId) => {
  try {
    const response = await fetch(baseUrl + `/${userId}/performance`);

    if (!response.ok) {
      throw new Error(
        `Erreur de chargement des données : ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    console.error("Erreur lors de la récupération des données:", err);
  }
};
export const Score= async (userId) => {
  try {
    const response = await fetch(baseUrl + `/${userId}/`);

    if (!response.ok) {
      throw new Error(
        `Erreur de chargement des données : ${response.statusText}`
      );
    }

    const r= await response.json();
    console.log(r);
    
  } catch (err) {
    console.error("Erreur lors de la récupération des données:", err);
  }
};
Score (12);
Score(18);
