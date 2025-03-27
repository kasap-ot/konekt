import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEvents } from './events-context';
import { Colors } from '../styles/globalStyles';
import Pill from '../components/EventPill';
import EventImage from '../components/EventImage';

const EventPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { events } = useEvents();
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
      <EventImage imageUri={event.image} />

      <Text style={styles.eventTitle}>{event.title}</Text>

      <View style={styles.gridContainer}>
        <Pill text={event.location} />
        <Pill text={event.date} />
        <Pill text={event.time} />
        <Pill text={event.organizer} />
      </View>

      <Text style={styles.description}>{event.description}</Text>

      <TouchableOpacity
        style={styles.guestsButton}
        onPress={() => router.push('/guests')}
      >
        <Text style={styles.guestsButtonText}>View Guests</Text>
      </TouchableOpacity>
    </View>
  );
};

// Remove image-related styles from here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
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
});

export default EventPage;