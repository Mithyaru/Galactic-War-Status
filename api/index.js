const express = require('express')
const cors = require('cors')
const axios = require('axios')
const mongoose = require('mongoose');
const port = process.env.PORT || 4000
require('dotenv').config()


const app = express()
app.use(cors())


const planetEndPoint = "/planets";
const capmaingEndPoint = "/campaigns";
const mongo_uri = process.env.mongo_uri

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const CampaignSchema = new mongoose.Schema({
  id: Number,
  planet: {
    index: Number,
    name: String,
    sector: String,
    biome: {
      name: String,
      description: String
    },
    hazards: [
      {
        name: String,
        description: String
      }
    ],
    hash: Number,
    position: {
      x: Number,
      y: Number
    },
    waypoints: [Number],
    maxHealth: Number,
    health: Number,
    disabled: Boolean,
    initialOwner: String,
    currentOwner: String,
    regenPerSecond: Number,
    event: mongoose.Schema.Types.Mixed,
    statistics: {
      missionsWon: Number,
      missionsLost: Number,
      missionTime: Number,
      terminidKills: Number,
      automatonKills: Number,
      illuminateKills: Number,
      bulletsFired: Number,
      bulletsHit: Number,
      timePlayed: Number,
      deaths: Number,
      revives: Number,
      friendlies: Number,
      missionSuccessRate: Number,
      accuracy: Number,
      playerCount: Number
    },
    attacking: [mongoose.Schema.Types.Mixed]
  },
  type: Number,
  count: Number,
  timestamp: { type: Date, default: Date.now }
});

const Campaign = mongoose.model('Campaign', CampaignSchema);

const CampaignHistorySchema = new mongoose.Schema({
  id: Number,
  planet: {
    index: Number,
    name: String,
    sector: String,
    biome: {
      name: String,
      description: String
    },
    hazards: [
      {
        name: String,
        description: String
      }
    ],
    hash: Number,
    position: {
      x: Number,
      y: Number
    },
    waypoints: [Number],
    maxHealth: Number,
    health: Number,
    disabled: Boolean,
    initialOwner: String,
    currentOwner: String,
    regenPerSecond: Number,
    event: mongoose.Schema.Types.Mixed,
    statistics: {
      missionsWon: Number,
      missionsLost: Number,
      missionTime: Number,
      terminidKills: Number,
      automatonKills: Number,
      illuminateKills: Number,
      bulletsFired: Number,
      bulletsHit: Number,
      timePlayed: Number,
      deaths: Number,
      revives: Number,
      friendlies: Number,
      missionSuccessRate: Number,
      accuracy: Number,
      playerCount: Number
    },
    attacking: [mongoose.Schema.Types.Mixed]
  },
  type: Number,
  count: Number,
  timestamp: { type: Date, default: Date.now }  // A data de quando os dados foram armazenados no histórico
});

const CampaignHistory = mongoose.model('CampaignHistory', CampaignHistorySchema);


const headersList = {
  Accept: "*/*",
  "User-Agent": "GalaticWarTest-Mithyaru",
  "X-Super-Client": "GalacticWarTest",
  "X-Super-Contact": "Discord: mithyaru",
};
const reqPlanets = {
  url: "https://api.helldivers2.dev/api/v1" + planetEndPoint,
  method: "GET",
  headers: headersList,
};
const reqCampaings = {
  url: "https://api.helldivers2.dev/api/v1" + capmaingEndPoint,
  method: "GET",
  headers: headersList,
};

const atualizarCampanhas = async () => {
  try {
    const response = await axios.request(reqCampaings);
    const campaigns = response.data;
    

    if (!Array.isArray(campaigns)) {
      console.error('Formato inesperado dos dados da API:', campaigns);
      return;
    }

    // Copiar dados atuais para histórico
    const currentCampaigns = await Campaign.find();
    if (currentCampaigns.length > 0) {
      await CampaignHistory.deleteMany({});
      await CampaignHistory.insertMany(currentCampaigns, { ordered: false });
      console.log(`${currentCampaigns.length} campanhas copiadas para o histórico.`);
    }

    // Atualizar coleção Campaign
    await Campaign.deleteMany({});
    await Campaign.insertMany(campaigns, { ordered: false });
    console.log(`${campaigns.length} campanhas atualizadas no banco.`);

  } catch (error) {
    console.error('Erro ao atualizar campanhas:', error.message);
  }
};
atualizarCampanhas(); 
// Inicia o loop ao rodar o servidor
setInterval(atualizarCampanhas, 180000); // 3 minutos (180000 ms)


app.get('/', (req, res) => {
  res.send('Conectado')
})

app.get('/campanhas', async (req, res) => {
  try {
    const [current, history] = await Promise.all([
      Campaign.find(),
      CampaignHistory.find()
    ]);

    res.json({
      atual: current,
      historico: history
    });
  } catch (error) {
    console.error('Erro ao buscar campanhas:', error);
    res.status(500).json({ message: 'Erro ao buscar campanhas.' });
  }

})

app.get('/planets', async (req, res) => {
  let campaigns = [];
  const call = await axios.request(reqPlanets)
    .then(async (response) => response)
    .catch((error) => error);
  campaigns = call.data
  console.log(campaigns)
  res.json(campaigns)
})

app.listen(port, () => console.log('server is running on ' + port))
