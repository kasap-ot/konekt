import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AppwriteService from '../appwrite/config';
import { Event, EventCategory, NewEvent } from '../types/event';

interface EventsContextType {
  events: Event[];
  addEvent: (newEvent: NewEvent) => Promise<void>;
  pickImage: (setEvent: React.Dispatch<React.SetStateAction<NewEvent>>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  fetchEvents: (category?: EventCategory | null) => Promise<void>;
}

const EventsContext = createContext<EventsContextType>({
  events: [],
  addEvent: async () => {},
  pickImage: async () => {},
  deleteEvent: async () => {},
  loading: false,
  error: null,
  fetchEvents: async () => {},
});

interface EventsProviderProps {
  children: ReactNode;
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (category: EventCategory | null = null) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedEvents = await AppwriteService.fetchEvents(category);
      setEvents(fetchedEvents);
    } 
    catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Failed to load events. Please try again later.');
    } 
    finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId: string) => {
    console.log('deleting event...');
    try {
      setLoading(true);
      await AppwriteService.deleteEvent(eventId);
      setEvents(prevEvents => prevEvents.filter(event => event.$id !== eventId));
    } 
    catch (err) {
      console.error('Failed to delete event:', err);
      setError('Failed to delete event. Please try again later.');
    } 
    finally {
      setLoading(false);
    }
  };

  const addEvent = async (newEvent: NewEvent) => {
    try {
      setLoading(true);
      setError(null);
      
      const createdEvent = await AppwriteService.createEvent({
        ...newEvent,
        imagePath: newEvent.image || null,
      });
      
      setEvents(prevEvents => [...prevEvents, {
        $id: createdEvent.$id,
        title: createdEvent.title,
        date: createdEvent.date,
        time: createdEvent.time,
        location: createdEvent.location,
        organizer: createdEvent.organizer,
        description: createdEvent.description,
        category: createdEvent.category || 'Parties', // Default value
        image: createdEvent.imagePath,
      }]);
    } 
    catch (err) {
      console.error('Failed to add event:', err);
      setError('Failed to add event. Please try again later.');
    } 
    finally {
      setLoading(false);
    }
  };

  const pickImage = async (setEvent: React.Dispatch<React.SetStateAction<NewEvent>>) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    <EventsContext.Provider value={{ 
      events, 
      addEvent, 
      pickImage, 
      deleteEvent, 
      loading,
      error,
      fetchEvents 
    }}>
      {children}
    </EventsContext.Provider>
  );
};

// Custom hook to use events context
export const useEvents = (): EventsContextType => useContext(EventsContext);