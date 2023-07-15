import { PdfReader } from "pdfreader";
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const pdfReader = new PdfReader();

// Paths
const pdfFilePath = "./pdf/conta2.pdf";
const pdfOutcomeDir = "./data";
const pdfOutcomePath = `${pdfOutcomeDir}/PDFData.Json`;

let pages = [];

pdfReader.parseFileItems(pdfFilePath, (err, item) => {
    if (err) {
        console.error(err);
        return;
    } else if (!item) {
        // This code executes when is EOF
        const jsonObj = {
            dueDate: pages[0],
            totalBilledConsumption: pages[1]
        }

        // Writign .json file
        if (!existsSync(pdfOutcomeDir)) {
            mkdirSync(pdfOutcomeDir)
        }

        writeFileSync(pdfOutcomePath, JSON.stringify(jsonObj, null, 2), "utf-8", (err) => {
            console.log(err);
        })

    } else if (item.text) {
        /* The data that we need to retrieve is located on this coordinates of the PDF */
        if (item.y > 4 && item.y < 7 && item.x > 27) {
            pages.push(item.text);
        }
    }
})

