import { createTable, deleteById, getAll, getById, insert, validateEmissionSourceData } from './controllers/EmissionSource.js';
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

    if (req.query.r) {
        res.render('home', { emissionSources, r: true })
    } else {
        res.render('home', { emissionSources, r: false });
    }

});

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/:emissionId/edit', (req, res) => {
    const emissionData = getById(req.params.emissionId);
    res.render('edit', { emissionData });
});

app.get('/:emissionId/delete', (req, res) => {
    deleteById(req.params.emissionId);
    res.redirect('/');
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

    createEmissionSourceFromPdf(req.file.filename, req.body.name);
    res.redirect('/?r=true');
});

app.listen(3000, () => console.log("Api Rodando."))