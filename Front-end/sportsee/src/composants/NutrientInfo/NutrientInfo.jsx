/**
 * @file NutrientInfo.jsx
 * @description Composant React pour afficher des informations nutritionnelles (calories, glucides, lipides, protéines)
 * d'un utilisateur en fonction de son ID.
 */

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Utilisateur } from '../../service/getData'; // Importer la fonction Utilisateur
import './NutrientInfo.scss';
import calorie_icon from '../../assets/icon-calorie.png';
import glucid_icon from '../../assets/icon-carbohydrate.png';
import lipid_icon from '../../assets/icon-lipid.png';
import protein_icon from '../../assets/icon-protein.png';

/**
 * NutrientInfo
 *
 * @component
 * @description Ce composant affiche une carte contenant une icône, une valeur, et un type (calories, glucides, lipides, protéines)
 * pour représenter une information nutritionnelle spécifique de l'utilisateur.
 *
 * @param {Object} props Les propriétés du composant.
 * @param {string} props.type Le type d'information nutritionnelle à afficher (e.g., "Calories", "Glucides").
 * @param {number} props.userId L'identifiant unique de l'utilisateur pour récupérer ses données.
 *
 * @returns {JSX.Element} Une carte contenant une icône, une valeur et le type nutritionnel correspondant.
 *
 * @example
 * <NutrientInfo type="Calories" userId={12} />
 * <NutrientInfo type="Glucides" userId={12} />
 *
 * @throws {Error} Si les données ne peuvent pas être récupérées depuis l'API.
 */
const NutrientInfo = ({ type, userId }) => {
    const [value, setValue] = useState(null);
    const [icon, setIcon] = useState(null);
    const [unit, setUnit] = useState('');
    const [colorClass, setColorClass] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Utilisateur(userId); // Utilisation de la fonction Utilisateur
                
                const userData = result.data; // Accéder aux données utilisateur dans `result.data`

                if (userData) {
                    let nutrientValue;
                    let iconImage;
                    let unitLabel;
                    let colorClassName;

                    switch(type) {
                        case "Calories":
                            nutrientValue = userData.keyData.calorieCount;
                            iconImage = calorie_icon;
                            unitLabel = "kCal";
                            colorClassName = "nutrient-info--calories";
                            break;
                        case "Glucides":
                            nutrientValue = userData.keyData.carbohydrateCount;
                            iconImage = glucid_icon;
                            unitLabel = "g";
                            colorClassName = "nutrient-info--glucides";
                            break;
                        case "Lipides":
                            nutrientValue = userData.keyData.lipidCount;
                            iconImage = lipid_icon;
                            unitLabel = "g";
                            colorClassName = "nutrient-info--lipides";
                            break;
                        case "Proteines":
                            nutrientValue = userData.keyData.proteinCount;
                            iconImage = protein_icon;
                            unitLabel = "g";
                            colorClassName = "nutrient-info--proteines";
                            break;
                        default:
                            nutrientValue = null;
                            iconImage = '';
                            unitLabel = '';
                            colorClassName = '';
                    }

                    setValue(nutrientValue);
                    setIcon(iconImage);
                    setUnit(unitLabel);
                    setColorClass(colorClassName);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };

        fetchData();
    }, [type, userId]);

    if (value === null) {
        return <p>Chargement...</p>;
    }

    return (
        <div className={`nutrient-info ${colorClass}`}>
            <img src={icon} alt={`${type} icon`} className="nutrient-info__icon" />
            <div className="nutrient-info__content">
                <p className="nutrient-info__value">{value}{unit}</p>
                <p className="nutrient-info__type">{type}</p>
            </div>
        </div>
    );
};

NutrientInfo.propTypes = {
    /** Le type d'information nutritionnelle à afficher. Doit être l'un des suivants : "Calories", "Glucides", "Lipides", "Proteines". */
    type: PropTypes.string.isRequired,
    /** L'identifiant unique de l'utilisateur pour récupérer ses données. */
    userId: PropTypes.number.isRequired,
};

export default NutrientInfo;
