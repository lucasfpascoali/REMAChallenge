import { createTable, validateEmissionSourceData } from './controllers/EmissionSource.js';
import { EmissionSource } from './models/EmissionSourceModel.js';

import express from 'express';
const app = express();
app.use(express.json());

createTable();

app.get('/', (req, res) => {

});

app.post('/emissionSource', (req, res) => {
    // let data = validateEmissionSourceData(req.body);
    // if ()

    // let emissionSource = new EmissionSource(
    //     req.body.name,
    //     req.body.consumptionAmount,
    //     req.date
    // );

    console.log(req.body);
    res.json({
        "statusCode": 200
    });
    return;

    console.log('rere');
})

app.listen(3000, () => console.log("Api Rodando."))