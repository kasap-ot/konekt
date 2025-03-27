import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useEvents } from './events-context';
import { useRouter } from 'expo-router';
import { Colors } from '../styles/globalStyles';

// Import the new input components
import EventTextInput from '../components/EventTextInput';
import PictureInput from '../components/PictureInput';
import CategoryInput from '../components/EventCategoryInput';
import DescriptionInput from '../components/EventDescriptionInput';

const CreateEventPage = () => {
  const { addEvent, pickImage } = useEvents();
  const router = useRouter();

  const [event, setEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    description: '',
    category: 'Parties',
    image: null,
  });

  const handleSubmit = () => {
    // Validate form fields
    if (!event.title || !event.date || !event.location) {
      return;
    }

    // Add event to the context
    addEvent(event);

    // Reset form
    setEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      organizer: '',
      description: '',
      category: 'Parties',
      image: null,
    });

    // Navigate back or to events list
    router.push('/list-events');

    alert('Event created successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Event</Text>

      {/* Picture Input */}
      <PictureInput 
        image={event.image} 
        onPickImage={() => pickImage(setEvent)} 
      />

      {/* Text Inputs using EventTextInput */}
      <EventTextInput 
        label="Title"
        placeholder="Enter event title"
        value={event.title}
        onChangeText={(text) => setEvent({ ...event, title: text })}
      />

      <EventTextInput 
        label="Date"
        placeholder="Enter event date (e.g., November 15, 2023)"
        value={event.date}
        onChangeText={(text) => setEvent({ ...event, date: text })}
      />

      <EventTextInput 
        label="Time"
        placeholder="Enter event time (e.g., 9:00 AM - 5:00 PM)"
        value={event.time}
        onChangeText={(text) => setEvent({ ...event, time: text })}
      />

      <EventTextInput 
        label="Location"
        placeholder="Enter event location"
        value={event.location}
        onChangeText={(text) => setEvent({ ...event, location: text })}
      />

      <EventTextInput 
        label="Organizer"
        placeholder="Enter organizer name"
        value={event.organizer}
        onChangeText={(text) => setEvent({ ...event, organizer: text })}
      />

      {/* Category Input */}
      <CategoryInput 
        selectedValue={event.category} 
        onValueChange={(itemValue) => setEvent({ ...event, category: itemValue })} 
      />

      {/* Description Input */}
      <DescriptionInput 
        value={event.description} 
        onChangeText={(text) => setEvent({ ...event, description: text })} 
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.background.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 20,
    textAlign: 'center',
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