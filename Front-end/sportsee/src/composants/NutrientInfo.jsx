import PropTypes from 'prop-types';
import './NutrientInfo.scss';
import calorie_icon from '../assets/icon-calorie.png';
import glucid_icon from '../assets/icon-carbohydrate.png';
import lipid_icon from '../assets/icon-lipid.png';
import protein_icon from '../assets/icon-protein.png';

/**
 * NutrientInfo component to display nutrient information in a badge format
 * @param {Object} props - The props for the component
 * @param {string} props.type - The type of nutrient (e.g., "Calories", "Glucides", "Lipides", "Proteines")
 * @param {number} props.value - The value of the nutrient
 * @returns {JSX.Element} The NutrientInfo component
 */
const NutrientInfo = ({ type, value }) => {
    let icon, unit, colorClass;

    switch(type) {
        case "Calories":
            icon = calorie_icon;
            unit = "kCal";
            colorClass = "nutrient-info--calories";
            break;
        case "Glucides":
            icon = glucid_icon;
            unit = "g";
            colorClass = "nutrient-info--glucides";
            break;
        case "Lipides":
            icon = lipid_icon;
            unit = "g";
            colorClass = "nutrient-info--lipides";
            break;
        case "Proteines":
            icon = protein_icon;
            unit = "g";
            colorClass = "nutrient-info--proteines";
            break;
        default:
            icon = '';
            unit = '';
            colorClass = '';
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

// Définition des types pour les props
NutrientInfo.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

export default NutrientInfo;
