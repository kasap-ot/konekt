import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';

const EventsContext = createContext({
  events: [],
  addEvent: () => {},
  pickImage: () => {},
  deleteEvent: () => {},
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
      image: null,
    },
  ]);

  const deleteEvent = (eventId) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: String(Date.now()), // Generate unique ID
      category: newEvent.category || 'Parties', // Default value
      image: newEvent.image || null, // Add image
    };
    setEvents(prevEvents => [...prevEvents, eventWithId]);
  };

  const pickImage = async (setEvent) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEvent(prevEvent => ({
        ...prevEvent,
        image: result.assets[0].uri
      }));
    }
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, pickImage, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

// Custom hook to use events context
export const useEvents = () => useContext(EventsContext);