import { openDb } from './helpers/configDB.js';
import express, { json } from 'express';

const app = express();
app.use(json());

openDb();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => console.log("Api Rodando."))