import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ViewStyle, TextStyle } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEvents } from './events-context';
import { Colors } from '../styles/globalStyles';
import Pill from '../components/EventPill';
import EventImage from '../components/EventImage';

type EventParams = {
  id: string | string[];
};

const EventPage = (): React.ReactElement => {
  const router = useRouter();
  const params = useLocalSearchParams<EventParams>();
  const { events, deleteEvent } = useEvents();
  const eventId = typeof params.id === 'string' ? params.id : params.id?.[0];
  const event = events.find(e => e.$id === eventId);

  const handleDelete = (): void => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteEvent(eventId);
            router.back();
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EventImage imageUri={event.imagePath} />
      <Text style={styles.eventTitle}>{event.title}</Text>

      <View style={styles.gridContainer}>
        <Pill text={event.location} />
        <Pill text={event.date} />
        <Pill text={event.time} />
        <Pill text={event.organizer} />
      </View>

      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.guestsButton]}
          onPress={() => router.push('/guests')}
        >
          <Text style={styles.buttonText}>View Guests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  eventTitle: TextStyle;
  gridContainer: ViewStyle;
  description: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  guestsButton: ViewStyle;
  deleteButton: ViewStyle;
  buttonText: TextStyle;
  guestsButtonText: TextStyle;
  errorText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 0,
    width: '47%',
  },
  guestsButton: {
    backgroundColor: Colors.accent.primary,
  },
  deleteButton: {
    backgroundColor: Colors.accent.error,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
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