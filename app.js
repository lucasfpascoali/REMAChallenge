import { createTable } from './controllers/EmissionSource.js';

import express from 'express';
const app = express();
app.use(express.json());

createTable();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/emissionSource', (req, res) => {
    console.log(req.body);
    res.json({
        "statusCode": 200
    });
})

app.listen(3000, () => console.log("Api Rodando."))