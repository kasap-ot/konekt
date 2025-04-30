import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import * as ImagePicker from 'expo-image-picker';
import EventService from '../services/EventService';
import { ID } from 'react-native-appwrite';
import { Event, EventCategory, CreateEvent } from '../../types';
import { extractFileInfo } from 'utils';


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


  async function fetchEvents(category: EventCategory | null = null): Promise<void> {
    try {
      const fetchedEvents = await EventService.fetchEvents(category);
      setEvents(fetchedEvents);
    }
    catch (err) { console.error('Failed to fetch events:', err); }
  };


  async function deleteEvent(eventId: string): Promise<void> {
    try {
      await EventService.deleteEvent(eventId);
      setEvents(prevEvents => prevEvents.filter(event => event.$id !== eventId));
    }
    catch (err) { console.error('Failed to delete event:', err); }
  };


  async function addEvent(newEvent: CreateEvent): Promise<void> {
    try {
      const createdEvent = await EventService.createEvent({
        ...newEvent,
        imageId: newEvent.imageId || null,
      });

      // TODO:
      // Add logic for saving the image to the storage bucket
      // ..

      // Reset the whole list of events
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


  async function pickImage(setEvent: React.Dispatch<React.SetStateAction<CreateEvent>>): Promise<void> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    console.log('selecting image...');

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('image selected.');

    // TODO: 
    // Change this so that the file id is saved instead of the file uri
    const fileId = ID.unique();
    const fileInfo = extractFileInfo(result);

    if (fileInfo === null)
      return;

    console.log('saving all event and file data...');

    setEvent(prevEvent => ({ 
      ...prevEvent, 
      imageId: fileId,
      fileInfo: fileInfo,
    }));
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