import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import EventIcon from '../assets/images/event-icon.png';
import { useRouter } from 'expo-router';
import { createContext, useContext } from 'react';


const EventsContext = createContext({
  events: [],
  addEvent: () => {},
});


export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Music Festival',
      date: '2023-10-15',
      time: '12:00',
      location: 'Central Park, New York',
      organizer: 'Party Inc',
      description: 'The craziest party ever!',
      category: 'Parties',
    },
  ]);

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: String(Date.now()), // Generate unique ID
      category: newEvent.category || 'Parties' // Default value
    };
    setEvents(prevEvents => [...prevEvents, eventWithId]);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

// Custom hook to use events context
export const useEvents = () => useContext(EventsContext);