import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import * as ImagePicker from 'expo-image-picker';
import EventService from '../services/EventService';
import { Event, EventCategory, CreateEvent } from '../../types';


interface EventsContextType {
  events: Event[];
  addEvent: (newEvent: CreateEvent) => Promise<void>;
  pickImage: (setEvent: React.Dispatch<React.SetStateAction<CreateEvent>>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  fetchEvents: (category?: EventCategory | null) => Promise<void>;
}


const EventsContext = createContext<EventsContextType>({
  events: [],
  addEvent: async () => { },
  pickImage: async () => { },
  deleteEvent: async () => { },
  fetchEvents: async () => { },
});


interface EventsProviderProps {
  children: ReactNode;
}


export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);


  const fetchEvents = async (category: EventCategory | null = null) => {
    try {
      const fetchedEvents = await EventService.fetchEvents(category);
      setEvents(fetchedEvents);
    }
    catch (err) { console.error('Failed to fetch events:', err); }
  };


  const deleteEvent = async (eventId: string) => {
    try {
      await EventService.deleteEvent(eventId);
      setEvents(prevEvents => prevEvents.filter(event => event.$id !== eventId));
    }
    catch (err) { console.error('Failed to delete event:', err); }
  };


  const addEvent = async (newEvent: CreateEvent) => {
    try {
      const createdEvent = await EventService.createEvent({
        ...newEvent,
        imageId: newEvent.imageId || null,
      });

      // TODO - Add logic for saving the image to the storage bucket...

      setEvents(prevEvents => [...prevEvents, {
        $id: createdEvent.$id,
        title: createdEvent.title,
        locationName: createdEvent.locationName,
        locationUrl: createdEvent.locationUrl,
        organizer: createdEvent.organizer,
        description: createdEvent.description,
        category: createdEvent.category as EventCategory,
        imageId: createdEvent.imageId ?? null,
        userId: createdEvent.userId,
        dateTime: createdEvent.dateTime,
      }]);
    }
    catch (err) { console.error('Failed to add event:', err); }
  };


  const pickImage = async (setEvent: React.Dispatch<React.SetStateAction<CreateEvent>>) => {
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

    if (result.canceled || result.assets.length < 1)
      return;

    setEvent(prevEvent => ({ ...prevEvent, imageId: result.assets[0].uri }))
  };

  return (
    <EventsContext.Provider value={{
      events,
      addEvent,
      pickImage,
      deleteEvent,
      fetchEvents
    }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = (): EventsContextType => useContext(EventsContext);