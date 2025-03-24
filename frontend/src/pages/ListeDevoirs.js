import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListeDevoirs() {
  const [devoirs, setDevoirs] = useState([]);

  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

  useEffect(() => {
    fetch(`${API_URL}/api/devoirs`)
      .then(res => res.json())
      .then(data => setDevoirs(data));
  }, [API_URL]);

  return (
    <div>
      <h1>Liste des Devoirs</h1>
      <Link to="/ajouter">Ajouter un devoir</Link>
      <ul>
        {devoirs.map(dev => (
          <li key={dev.id}>
            <strong>{dev.titre}</strong> ({dev.matiere}) - {dev.date_rendu} [{dev.statut}]
            <p>{dev.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
