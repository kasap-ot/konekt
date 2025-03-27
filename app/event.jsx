import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEvents } from './events-context';
import { Colors } from '../styles/globalStyles';


const EventPage = () => {
  const router = useRouter(); // Initialize the router
  const { id } = useLocalSearchParams();
  const { events } = useEvents();
  console.log(events);
  const event = events.find(e => e.id == id);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Custom placeholder or actual image */}
      {event.image ? (
        <Image
          source={{ uri: event.image }}
          style={styles.photo}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>...</Text>
        </View>
      )}

      {/* Event title */}
      <Text style={styles.eventTitle}>{event.title}</Text>

      {/* 2x2 Grid for pill-shaped containers */}
      <View style={styles.gridContainer}>
        <View style={styles.pillContainer}>
          <Text style={styles.pillText}>{event.location}</Text>
        </View>
        <View style={styles.pillContainer}>
          <Text style={styles.pillText}>{event.date}</Text>
        </View>
        <View style={styles.pillContainer}>
          <Text style={styles.pillText}>{event.time}</Text>
        </View>
        <View style={styles.pillContainer}>
          <Text style={styles.pillText}>{event.organizer}</Text>
        </View>
      </View>

      {/* Event description */}
      <Text style={styles.description}>{event.description}</Text>

      {/* Button to navigate to the Guests page */}
      <TouchableOpacity
        style={styles.guestsButton}
        onPress={() => router.push('/guests')}
      >
        <Text style={styles.guestsButtonText}>View Guests</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  photo: {
    height: 200,
    width: '100%',
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  pillContainer: {
    backgroundColor: Colors.text.primary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.background.primary,
  },
  description: {
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  guestsButton: {
    backgroundColor: Colors.accent.primary,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  guestsButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  errorText: {
    color: Colors.text.primary,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  imagePlaceholder: {
    height: 200, 
    width: '100%', 
    marginBottom: 20, 
    backgroundColor: Colors.accent.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.text.primary,
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default EventPage;