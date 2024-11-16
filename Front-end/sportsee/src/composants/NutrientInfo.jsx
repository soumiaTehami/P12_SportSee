import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Utilisateur } from '../service/getData'; // Importer la fonction Utilisateur
import './NutrientInfo.scss';
import calorie_icon from '../assets/icon-calorie.png';
import glucid_icon from '../assets/icon-carbohydrate.png';
import lipid_icon from '../assets/icon-lipid.png';
import protein_icon from '../assets/icon-protein.png';

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
    type: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
};

export default NutrientInfo;
