import { openDb } from '../configDB.js';


export function validateEmissionSourceData(obj) {
    if (!obj) return null;

    const requiredFields = ['name', 'consumptionAmount', 'date', 'state'];
    if (!Object.keys(obj).every((key => requiredFields.includes(key)))) {
        return null;
    }

    // Verify if they are not empty
    if (!Object.values(obj).every((value => value.length > 0))) {
        return null;
    }

    // Verify if consumptionAmount is a valid number
    let consumption = parseFloat(obj.consumptionAmount.replace(',', '.'));
    if (isNaN(consumption)) {
        return null;
    }
    obj.consumptionAmount = consumption;

    const validStates = [
        'AC', 'AL', 'AP', 'AM',
        'BA', 'CE', 'DF', 'ES',
        'GO', 'MA', 'MT', 'MS',
        'MG', 'PA', 'PB', 'PR',
        'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC',
        'SP', 'SE', 'TO'
    ];

    if (obj.state.length != 2 || !validStates.includes(obj.state))
        return null;

    // Verify if date is on valid format (YYYY-MM)
    const regexPattern = RegExp('^\\d{4}-\\d{2}$');
    if (!regexPattern.test(obj.date))
        return null;

    let monthIndex = obj.date.indexOf('-') + 1;
    let month = parseInt(obj.date.slice(monthIndex, monthIndex + 2));
    if (month < 1 || month > 12)
        return null;

    return obj;
}

// Create EmissionSource Table if not exist
export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS EmissionSource ( id INTEGER PRIMARY KEY, name TEXT NOT NULL, consumptionAmount REAL NOT NULL, date TEXT NOT NULL, state TEXT NOT NULL, emission REAL NOT NULL)');
    });
}

// Insert new EmissionSource on database
export async function insert(emissionSource) {
    openDb().then(db => {
        db.run('INSERT into EmissionSource (name, consumptionAmount, date, state, emission) VALUES (?, ?, ?, ?, ?)',
            [
                emissionSource.name,
                emissionSource.consumptionAmount,
                emissionSource.date,
                emissionSource.state,
                emissionSource.emission
            ]);
    });
}