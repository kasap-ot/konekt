import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import EventIcon from '../assets/images/event-icon.png';
import { useRouter } from 'expo-router';

// Sample event data
const events = [
  {
    id: '1',
    title: 'Music Festival',
    date: '2023-10-15',
    location: 'Central Park, New York',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'Tech Conference',
    date: '2023-11-20',
    location: 'San Francisco, CA',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Art Exhibition',
    date: '2023-12-05',
    location: 'London, UK',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    title: 'Food Fair',
    date: '2024-01-10',
    location: 'Tokyo, Japan',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '5',
    title: 'Film Premiere',
    date: '2024-02-14',
    location: 'Los Angeles, CA',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '6',
    title: 'Comedy Show',
    date: '2024-03-22',
    location: 'Chicago, IL',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '7',
    title: 'Fashion Week',
    date: '2024-04-05',
    location: 'Paris, France',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '8',
    title: 'Gaming Expo',
    date: '2024-05-18',
    location: 'Berlin, Germany',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '9',
    title: 'Wine Tasting',
    date: '2024-06-30',
    location: 'Napa Valley, CA',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '10',
    title: 'Marathon',
    date: '2024-07-15',
    location: 'Boston, MA',
    image: 'https://via.placeholder.com/150',
  },
];

// Event item component
const EventItem = ({ title, date, location, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.eventItem}>
      <Image source={EventIcon} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventText}>Date: {date}</Text>
        <Text style={styles.eventText}>Location: {location}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Main App component
const ListEventsPage = () => {
  const router = useRouter();

  const handleEventPress = (eventId) => {
    // Navigate to the event page with the event ID as a parameter
    router.push(`/event?id=${eventId}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventItem
            title={item.title}
            date={item.date}
            location={item.location}
            onPress={() => handleEventPress(item.id)} // Pass the event ID to the handler
          />
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#505050',
    borderRadius: 8,
    margin: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffffff',
  },
  eventText: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ListEventsPage;