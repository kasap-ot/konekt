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
      location: 'Central Park, New York',
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: String(Date.now()), // Generate unique ID
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


// Modify list-events.jsx
export const ListEventsPage = () => {
  const { events } = useEvents();
  const router = useRouter();

  const handleEventPress = (eventId) => {
    router.push(`/event?id=${eventId}`);
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEventPress(item.id)}>
      <View style={styles.eventItem}>
        <Image source={EventIcon} style={styles.eventImage} />
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventText}>Date: {item.date}</Text>
          <Text style={styles.eventText}>Location: {item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEventItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events found</Text>
          </View>
        }
      />
    </View>
  );
};

// Styles (keep existing styles)
const styles = StyleSheet.create({
  // ... (your existing styles)
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default ListEventsPage;