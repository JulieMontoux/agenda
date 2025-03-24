import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListeDevoirs() {
  const [devoirs, setDevoirs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/devoirs')
      .then(res => res.json())
      .then(data => setDevoirs(data));
  }, []);

  return (
    <div>
      <h1>Agenda des Devoirs</h1>
      <Link to="/agenda">Voir le calendrier</Link>
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
