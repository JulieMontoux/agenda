const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/devoirs.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS devoirs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT,
    description TEXT,
    date_rendu TEXT,
    matiere TEXT,
    statut TEXT
  )`);
});

module.exports = db;
