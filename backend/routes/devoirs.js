const express = require('express');
const router = express.Router();
const db = require('../models/Devoir');

// Liste
router.get('/', (req, res) => {
  db.all("SELECT * FROM devoirs ORDER BY date_rendu ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ajouter
router.post('/', (req, res) => {
  const { titre, description, date_rendu, matiere, statut } = req.body;
  db.run("INSERT INTO devoirs (titre, description, date_rendu, matiere, statut) VALUES (?, ?, ?, ?, ?)",
    [titre, description, date_rendu, matiere, statut], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

// Modifier
router.put('/:id', (req, res) => {
  const { titre, description, date_rendu, matiere, statut } = req.body;
  db.run("UPDATE devoirs SET titre = ?, description = ?, date_rendu = ?, matiere = ?, statut = ? WHERE id = ?",
    [titre, description, date_rendu, matiere, statut, req.params.id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    });
});

// Supprimer
router.delete('/:id', (req, res) => {
  db.run("DELETE FROM devoirs WHERE id = ?", req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
