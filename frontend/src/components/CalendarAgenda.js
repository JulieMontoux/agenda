import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/agenda.css';

const locales = {
  'fr-FR': require('date-fns/locale/fr'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarAgenda() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/devoirs')
      .then(res => res.json())
      .then(data => {
        const formattedEvents = data.map(dev => ({
          title: `${dev.titre} (${dev.matiere})`,
          start: new Date(dev.date_rendu),
          end: new Date(dev.date_rendu),
          allDay: true,
        }));
        setEvents(formattedEvents);
      });
  }, []);

  return (
    <div className="calendar-container">
      <h2>Agenda des Devoirs (vue calendrier)</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
