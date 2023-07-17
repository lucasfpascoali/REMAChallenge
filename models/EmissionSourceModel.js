import { readFileSync } from 'fs';

// Read emissionFactorData.json
const emissionFactorData = JSON.parse(readFileSync('./data/emissionFactorData.json', 'utf-8'));
const northRegion = ['AM', 'PA', 'AC', 'RR', 'RO', 'AP', 'TO'];
const monthsAbreviation = ['jan', 'feb', 'mar', 'apr', 'may',
    'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// EmissionSource.js
export class EmissionSource {
    constructor(name, consumptionAmount, date, state) {
        this.name = name;
        this.consumptionAmount = consumptionAmount;
        this.date = date;
        this.state = state;
    }

    get emission() {
        let year = this.date.slice(0, 4);
        let monthIndex = this.date.indexOf('-') + 1;
        let month = parseInt(this.date.slice(monthIndex, monthIndex + 2));
        let emissionFactor = 0;

        /* We need to use the Sistema Interligado do Amazonas 
        when the state is from the north Region and the year is between 2011 and 2015 */
        if (northRegion.includes(this.state) && parseInt(year) >= 2011 && parseInt(year) <= 2015) {
            emissionFactor = emissionFactorData['SIA'][year]['annual avg'];
        } else {
            emissionFactor = emissionFactorData['SIN'][year][monthsAbreviation[month - 1]];
        }

        /* Replacing the comma by dot, because the parseFloat doesnt works with comma 
        as decimal separator */
        emissionFactor = parseFloat(emissionFactor.replace(',', '.'));

        /* emissionFactor unit is tCO2/MWh so:  emission / consumption = emissionFactor
        Then, emissionFactor * consumptions = emission
        */
        return emissionFactor * this.consumptionAmount;
    }


}