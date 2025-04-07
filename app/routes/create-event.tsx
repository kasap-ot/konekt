import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, Alert } from 'react-native';
import { useEvents } from '../contexts/EventsContext';
import { Redirect, useRouter } from 'expo-router';
import { Colors } from '../../styles/Colors';
import { EventCategory, CreateEvent } from '../../types';
import DateTimePickerInput from '../components/DateTimeInput';
import FormTextInput from '../components/FormTextInput';
import PictureInput from '../components/PictureInput';
import CategoryInput from '../components/EventCategoryInput';
import DescriptionInput from '../components/EventDescriptionInput';
import { useAuth } from 'app/contexts/AuthContext';
import Header from '../components/Header';

const CreateEventPage = (): React.ReactElement => {
  const { addEvent, pickImage } = useEvents();
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return <Redirect href='/' />
  }

  const [event, setEvent] = useState<CreateEvent>({
    title: '',
    location: '',
    organizer: '',
    description: '',
    category: 'Parties',
    imagePath: null,
    userId: user.$id,
    dateTime: '',
  });

  const [dateTime, setDateTime] = useState(new Date());

  function onDateTimeChange(event: any, selectedDate?: Date) {
    const currentDate = selectedDate || dateTime;
    setDateTime(currentDate);
    setEvent(prevEvent => ({
      ...prevEvent,
      dateTime: currentDate.toISOString(),
    }));
  }

  function handleFormSubmit(): void {
    if (!event.title || !event.dateTime || !event.location || !event.organizer || !event.description) {
      Alert.alert('Event must contain information for all fields. Please fill out the form.');
      return;
    }

    addEvent(event);
    setEvent({
      title: '',
      location: '',
      organizer: '',
      description: '',
      category: 'Parties',
      imagePath: null,
      userId: '',
      dateTime: '',
    });

    router.push('/routes/list-events');
    alert('Event created successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Create Event"/>

      <PictureInput
        image={event.imagePath}
        onPickImage={() => pickImage(setEvent)}
      />

      <FormTextInput
        label="Title"
        placeholder="Enter event title"
        value={event.title}
        onChangeText={(text) => setEvent({ ...event, title: text })}
      />

      <DateTimePickerInput
        mode="date"
        value={dateTime}
        onChange={onDateTimeChange}
        label="Date"
        minimumDate={new Date()}
      />

      <DateTimePickerInput
        mode="time"
        value={dateTime}
        onChange={onDateTimeChange}
        label="Time"
        is24Hour={false}
      />

      <FormTextInput
        label="Location"
        placeholder="Enter event location"
        value={event.location}
        onChangeText={(text) => setEvent({ ...event, location: text })}
      />

      <FormTextInput
        label="Organizer"
        placeholder="Enter organizer name"
        value={event.organizer}
        onChangeText={(text) => setEvent({ ...event, organizer: text })}
      />

      <CategoryInput
        selectedValue={event.category}
        onValueChange={(itemValue: EventCategory) => setEvent({ ...event, category: itemValue })}
      />

      <DescriptionInput
        value={event.description}
        onChangeText={(text) => setEvent({ ...event, description: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

interface Styles {
  container: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.background.primary,
  },
  button: {
    backgroundColor: Colors.accent.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.background.primary,
  },
});

export default CreateEventPage;