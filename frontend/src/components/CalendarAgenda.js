import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/agenda.css';

const locales = { fr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarAgenda() {
  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/api/devoirs`);
        const data = await res.json();
        const formatted = data.map((dev) => {
          const start = dev.date_rendu ? new Date(dev.date_rendu) : new Date();
          const end = dev.date_rendu ? new Date(dev.date_rendu) : new Date();
          return {
            title: `${dev.titre} (${dev.matiere})`,
            start,
            end,
            allDay: true,
          };
        });
        setEvents(formatted);
      } catch (error) {
        console.error("Erreur API :", error);
      }
    };
    fetchEvents();
  }, [API_URL]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleNavigate = (action) => {
    const date = new Date(currentDate);
    if (action === 'TODAY') {
      setCurrentDate(new Date());
      setCurrentView(Views.DAY);
    } else if (action === 'NEXT') {
      if (currentView === Views.MONTH) {
        date.setMonth(date.getMonth() + 1);
      } else if (currentView === Views.WEEK) {
        date.setDate(date.getDate() + 7);
      } else if (currentView === Views.DAY) {
        date.setDate(date.getDate() + 1);
      }
      setCurrentDate(date);
    } else if (action === 'PREV') {
      if (currentView === Views.MONTH) {
        date.setMonth(date.getMonth() - 1);
      } else if (currentView === Views.WEEK) {
        date.setDate(date.getDate() - 7);
      } else if (currentView === Views.DAY) {
        date.setDate(date.getDate() - 1);
      }
      setCurrentDate(date);
    }
  };

  return (
    <div className="calendar-container">
      <div className="header-bar">
        <h1 className="pixel-title">Agenda des Devoirs</h1>
        <a href="/ajouter">
          <button className="pixel-button">➕ Ajouter un devoir</button>
        </a>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={currentView}
        date={currentDate}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        views={['month', 'week', 'day']}
        style={{ height: 600 }}
        messages={{
          today: "Aujourd'hui",
          previous: "Précédent",
          next: "Suivant",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          noEventsInRange: "Aucun devoir dans cette période",
        }}
      />
    </div>
  );
}