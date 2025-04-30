import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ViewStyle, TextStyle } from 'react-native';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';

import { useAuth } from 'app/contexts/AuthContext';
import { Colors } from '../../styles/Colors';
import { useEvents } from '../contexts/EventsContext';
import Pill from '../components/Pill';
import EventImage from '../components/EventImage';
import LocationPill from 'app/components/LocationPill';


type EventParams = {
  id: string | string[];
};


const EventPage = (): React.ReactElement => {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams<EventParams>();
  const { events, deleteEvent } = useEvents();

  // TODO: Add logic for fetching one event in EventService

  const eventId = typeof params.id === 'string' ? params.id : params.id?.[0];
  const event = events.find(e => e.$id === eventId);

  function handleDelete(): void {
    if (!user) { Alert.alert('Cannot perform action if not logged in'); }
    else if (!event) { Alert.alert('Cannot perform action - event does not exist'); }
    else if (user.$id !== event.userId) { Alert.alert('Cannot delete event - current user is not owner'); }

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

  if (!user) return <Redirect href="/" />;

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EventImage imageUri={event.imageId} />
      <Text style={styles.eventTitle}>{event.title}</Text>

      <View style={styles.gridContainer}>
        <LocationPill event={event}/>
        <Pill text={event.dateTime.split('T')[0]} />
        <Pill text={event.dateTime.split('T')[1].slice(0, 5)} />
        <Pill text={event.organizer} />
      </View>

      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.guestsButton]}
          onPress={() => router.push('/routes/guests')}
        >
          <Text style={styles.buttonText}>View Guests</Text>
        </TouchableOpacity>

        {user.labels.includes('organizer') && user.$id === event.userId && (
          <>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete Event</Text>
            </TouchableOpacity>
          </>
        )}
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