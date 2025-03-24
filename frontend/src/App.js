import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListeDevoirs from './pages/ListeDevoirs';
import AjouterDevoir from './pages/AjouterDevoir';
import CalendarAgenda from './components/CalendarAgenda';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListeDevoirs />} />
        <Route path="/ajouter" element={<AjouterDevoir />} />
        <Route path="/agenda" element={<CalendarAgenda />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
