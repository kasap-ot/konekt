import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';

const EventsContext = createContext({
  events: [],
  addEvent: () => {},
  pickImage: () => {},
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
      image: null, // Add image field
    },
  ]);

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: String(Date.now()), // Generate unique ID
      category: newEvent.category || 'Parties', // Default value
      image: newEvent.image || null, // Add image
    };
    setEvents(prevEvents => [...prevEvents, eventWithId]);
  };

  // Add image picking functionality
  const pickImage = async (setEvent) => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Update event state with selected image URI
      setEvent(prevEvent => ({
        ...prevEvent,
        image: result.assets[0].uri
      }));
    }
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, pickImage }}>
      {children}
    </EventsContext.Provider>
  );
};

// Custom hook to use events context
export const useEvents = () => useContext(EventsContext);