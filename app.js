import { createTable, getAll, insert, validateEmissionSourceData } from './controllers/EmissionSource.js';
import { EmissionSource } from './models/EmissionSourceModel.js';

import express from 'express';
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.urlencoded({ extended: true }));

createTable();

app.get('/', async (req, res) => {
    let emissionSources = await getAll();

    res.render('home', { emissionSources });
});

app.get('/register', (req, res) => {
    res.render('register');
})

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

    res.redirect('/');
})

app.post('/emissionSourcePDF', (req, res) => {
    console.log(req.body);
});

app.listen(3000, () => console.log("Api Rodando."))