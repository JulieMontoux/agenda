import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AjouterDevoir() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ titre: '', description: '', date_rendu: '', matiere: '', statut: 'À faire' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/devoirs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => navigate('/'));
  };

  return (
    <div>
      <h1>Ajouter un Devoir</h1>
      <form onSubmit={handleSubmit}>
        <input name="titre" placeholder="Titre" onChange={handleChange} required />
        <input name="matiere" placeholder="Matière" onChange={handleChange} required />
        <input name="date_rendu" type="date" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <select name="statut" onChange={handleChange}>
          <option value="À faire">À faire</option>
          <option value="Fait">Fait</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
