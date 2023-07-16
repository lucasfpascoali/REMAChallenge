import { readFileSync } from 'fs';

// Read emissionFactorData.json
const emissionFactorData = JSON.parse(readFileSync('./data/emissionFactorData.json', 'utf-8'));
const northRegion = ['AM', 'PA', 'AC', 'RR', 'RO', 'AP', 'TO'];
const monthsAbreviation = ['jan', 'feb', 'mar', 'apr', 'may',
    'jun', 'jul', 'aug', 'sep', 'nov', 'dec'];

// EmissionSource.js
export class EmissionSource {
    constructor(name, consumptionAmount, date, state) {
        this.name = name;
        this.consumptionAmount = consumptionAmount;
        this.date = date;
        this.state = state;
    }

    get emission() {
        return calcEmission();
    }

    calcEmission() {
        let year = this.date.slice(0, 4);
        let monthIndex = this.date.indexOf('-') + 1;
        let month = parseInt(this.date.slice(monthIndex, monthIndex + 2));
        let emissionFactor = 0;
        if (northRegion.includes(this.state)) {
            emissionFactor = emissionFactorData.sia[year]['annual avg'];
        } else {
            emissionFactor = emissionFactorData.sin[year][monthsAbreviation[month - 1]];
        }

        /* Replacing the comma by dot, because the parseFloat doesnt works with comma 
        as decimal separator */
        emissionFactor = parseFloat(emissionFactor.replace(',', '.'));

        /* emissionFactor unit is tCO2/MWh and our consumptionAmount is on kWh,
         so we need to convert dividing by 1000 */
        return emissionFactor * (this.consumptionAmount / 1000);
    }
}