const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const devoirsRoutes = require('./routes/devoirs');
app.use('/api/devoirs', devoirsRoutes);

app.listen(5000, () => console.log('Serveur démarré sur http://localhost:5000'));
