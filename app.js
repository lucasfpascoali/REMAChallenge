import { createTable, deleteById, getAll, getById, insert, validateEmissionSourceData, updateEmissionSourceById } from './controllers/EmissionSource.js';
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

    res.render('home', { emissionSources, r: false });
});

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/:emissionId/edit', async (req, res) => {
    const emissionData = await getById(req.params.emissionId);
    res.render('edit', { emissionData });
});

app.get('/:emissionId/delete', (req, res) => {
    deleteById(req.params.emissionId);
    res.redirect('/');
})

app.get('/feedback', (req, res) => {
    let err = false;
    if (req.query.err) {
        err = true;
    }
    res.render('feedback', { err });

})

app.post('/emissionSource', (req, res) => {
    let data = validateEmissionSourceData(req.body);
    if (!data) {
        res.redirect('feedback?err=true')
        return;
    }

    let emissionSource = new EmissionSource(
        data.name,
        data.consumptionAmount,
        data.date,
        data.state
    );

    insert(emissionSource);

    res.redirect('/feedback');
})

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file || !req.body.name) {
        res.redirect('/feedback?err=true');
        return;
    }

    createEmissionSourceFromPdf(req.file.filename, req.body.name);
    res.redirect('/feedback');
});

app.post('/:emissionId/edit', (req, res) => {
    const emissionId = req.params.emissionId;
    let data = validateEmissionSourceData(req.body);
    if (!data) {
        res.redirect('feedback?err=true')
        return;
    }

    let emissionSource = new EmissionSource(
        data.name,
        data.consumptionAmount,
        data.date,
        data.state
    );

    updateEmissionSourceById(emissionId, emissionSource);

    res.redirect('/feedback');
});

app.listen(3000, () => console.log("Api Rodando."))