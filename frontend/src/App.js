import React from 'react';
import { HashRouter as Router, Routes, Route  } from "react-router-dom";
import CalendarAgenda from './components/CalendarAgenda';
import ListeDevoirs from './pages/ListeDevoirs';
import AjouterDevoir from './pages/AjouterDevoir';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarAgenda />} />
        <Route path="/liste" element={<ListeDevoirs />} />
        <Route path="/ajouter" element={<AjouterDevoir />} />
      </Routes>
    </Router>
  );
}

export default App;
