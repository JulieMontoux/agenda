const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const devoirsRoutes = require('./routes/devoirs');
app.use('/api/devoirs', devoirsRoutes);

app.listen(5001, () => console.log('Serveur démarré sur https://agenda-8r5i.onrender.com'));
