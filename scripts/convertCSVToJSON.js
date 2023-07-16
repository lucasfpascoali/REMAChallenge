import csvtojson from 'csvtojson';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

// Paths
const csvFilePath = "./data/DataCSV.csv";
const jsonOutcomeDir = "./data";
const jsonOutcomePath = `${jsonOutcomeDir}/convertedCSVData.Json`;

// Filter Pattern to get only the years (4 digits strings)
const regexPattern = RegExp("^\\d\\d\\d\\d$");

// SIN is Sistema Interligado Nacional and SIA is Sistema Isolado do Amazonas
const readyToConvertJson = {
    "SIN": {},
    "SIA": {}
};
const jsonHeaders = ['Parameter', 'unit', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'annual avg'];

csvtojson({ delimiter: ";" })
    .fromFile(csvFilePath)
    .then((rawArr) => {
        for (let i = 0; i < rawArr.length; i++) {
            let year = rawArr[i]['Dados Sazonais para o Brasil'];
            if (regexPattern.test(year)) {
                delete rawArr[i]['Dados Sazonais para o Brasil']; // Unnecessary field

                // Change object keys name for better syntax (Used for loop to avoid hard code)
                for (let j = 0; j < jsonHeaders.length; j++) {
                    if (i >= 56) {
                        /* if i >= 56, the data belongs to Sistema Interligado do Amazonas 
                        and has less fields */
                        delete rawArr[i][`field${j + 4}`];
                        continue;
                    }

                    changeObjKeyName(rawArr[i], `field${j + 2}`, jsonHeaders[j]);
                }

                if (i >= 56) {
                    /* if i >= 56, the data belongs to Sistema Interligado do Amazonas 
                    and has different fields and will be on SIA object key */
                    changeObjKeyName(rawArr[i], "field3", "annual avg");
                    changeObjKeyName(rawArr[i], "field2", "unit");
                    readyToConvertJson["SIA"][year] = rawArr[i];
                    continue;
                }

                readyToConvertJson["SIN"][year] = rawArr[i];
            }
        }

        // Writign .json file
        if (!existsSync(jsonOutcomeDir)) {
            mkdirSync(jsonOutcomeDir)
        }

        writeFileSync(jsonOutcomePath, JSON.stringify(readyToConvertJson, null, 2), "utf-8", (err) => {
            console.log(err);
        })
    });

function changeObjKeyName(obj, oldName, newName) {
    obj[newName] = obj[oldName];
    delete obj[oldName];
}