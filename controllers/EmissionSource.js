import { openDb } from '../configDB.js';

// Create EmissionSource Table if not exist
export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS EmissionSource ( id INTEGER PRIMARY KEY, name TEXT NOT NULL, consumptionAmount REAL NOT NULL, date TEXT NOT NULL, state TEXT NOT NULL, emission REAL NOT NULL)');
    });
}

// Insert new EmissionSource on database
export async function insert(emissionSource) {
    openDb().then(db => {
        db.run('INSERT into EmissionSource (name, consumptionAmount, date, state, emission VALUES (?, ?, ?, ?, ?)',
            [
                emissionSource.name,
                emissionSource.consumptionAmount,
                emissionSource.date,
                emissionSource.state,
                emissionSource.emission
            ]);
    });
}