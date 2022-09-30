const express = require('express');
const cors = require('cors');
require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const apiPort = process.env.PORT || 3000;

const boleanizer = (value) => {
  if (value === 'true') return true;
  return false;   
};

const hereIsTheUpsideDown = boleanizer(process.env.UPSIDEDOWN_MODE);

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(apiPort, () => {
  console.log(`Escutando na porta ${apiPort}`);
});
