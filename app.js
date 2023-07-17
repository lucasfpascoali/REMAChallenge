import { createTable, getAll, insert, validateEmissionSourceData } from './controllers/EmissionSource.js';
import { EmissionSource } from './models/EmissionSourceModel.js';
import express from 'express';
import multer from 'multer';
import { configs } from './multerConfig.js';
import { createEmissionSourceFromPdf } from './controllers/pdfParseController.js';


const upload = multer(configs);

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

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file || !req.body.name) {
        res.redirect('/');
        return;
    }

    await createEmissionSourceFromPdf(req.file.filename, req.body.name);
    res.redirect('/');
});

app.listen(3000, () => console.log("Api Rodando."))