import { createTable, insert, validateEmissionSourceData } from './controllers/EmissionSource.js';
import { EmissionSource } from './models/EmissionSourceModel.js';

import express from 'express';
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.urlencoded({ extended: true }));

createTable();

app.get('/', (req, res) => {
    res.render('register');
});

app.post('/emissionSource', (req, res) => {
    let data = validateEmissionSourceData(req.body);
    if (!data) {
        res.render('register')
        return;
    }

    let emissionSource = new EmissionSource(
        data.name,
        data.consumptionAmount,
        data.date,
        data.state
    );

    insert(emissionSource);

    res.redirect(200, '/');
})

app.listen(3000, () => console.log("Api Rodando."))