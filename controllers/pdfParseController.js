import { PdfReader } from "pdfreader";
import { EmissionSource } from "../models/EmissionSourceModel.js";
import { insert, validateEmissionSourceData } from "./EmissionSource.js";
import * as fs from 'fs';

const pdfReader = new PdfReader();

export async function createEmissionSourceFromPdf(pdfFileName, sourceName) {
    let pages = [];
    let jsonObj = {};
    let pdfPath = `./uploads/${pdfFileName}`;

    pdfReader.parseFileItems(pdfPath, (err, item) => {
        if (err) {
            console.error(err);
            return;
        } else if (!item) {
            // This code executes when is EOF

            const year = pages[0].slice(pages[0].lastIndexOf('/') + 1);
            const month = pages[0].slice(pages[0].indexOf('/') + 1, pages[0].lastIndexOf('/'));
            const date = `${year}-${month}`;

            const consumptionAmount = pages[1].slice(0, pages[1].indexOf(' '));

            const data = validateEmissionSourceData({
                name: sourceName,
                consumptionAmount: consumptionAmount,
                date: date,
                state: 'SC'// state from pdf is always SC
            })

            if (!data) {
                return;
            }

            /* Bill Pdf has the total consumption in kWH,
             we need to divide by 1000 to convert to MWh */
            data.consumptionAmount /= 1000;

            console.log(data);
            const emissionSource = new EmissionSource(
                data.name,
                data.consumptionAmount,
                data.date,
                data.state
            );

            insert(emissionSource);

            fs.rmSync(pdfPath);

            return;
        } else if (item.text) {
            /* The data that we need to retrieve is located on this coordinates of the PDF */
            if (item.y > 4 && item.y < 7 && item.x > 27) {
                pages.push(item.text);
            }
        }
    })

    return jsonObj;
}