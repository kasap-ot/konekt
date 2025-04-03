import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { useEvents } from '../contexts/EventsContext';
import { Redirect, useRouter } from 'expo-router';
import { Colors } from '../../styles/globalStyles';
import { EventCategory, CreateEvent } from '../../types';

import FormTextInput from '../../components/FormTextInput';
import PictureInput from '../../components/PictureInput';
import CategoryInput from '../../components/EventCategoryInput';
import DescriptionInput from '../../components/EventDescriptionInput';
import { useAuth } from 'app/contexts/AuthContext';


const CreateEventPage = (): React.ReactElement => {
  const { addEvent, pickImage } = useEvents();
  const router = useRouter();
  const {user} = useAuth();

  if (!user) {
    return <Redirect href='/'/>
  }

  const [event, setEvent] = useState<CreateEvent>({
    title: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    description: '',
    category: 'Parties',
    imagePath: null,
    userId: user.$id,
  });

  const handleSubmit = (): void => {
    if (!event.title || !event.date || !event.location) {
      return;
    }
    
    console.log(event);
    addEvent(event);

    setEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      organizer: '',
      description: '',
      category: 'Parties',
      imagePath: null,
      userId: '',
    });

    router.push('/routes/list-events');

    alert('Event created successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Event</Text>

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

      <FormTextInput 
        label="Date"
        placeholder="Enter event date (e.g., November 15, 2023)"
        value={event.date}
        onChangeText={(text) => setEvent({ ...event, date: text })}
      />

      <FormTextInput 
        label="Time"
        placeholder="Enter event time (e.g., 9:00 AM - 5:00 PM)"
        value={event.time}
        onChangeText={(text) => setEvent({ ...event, time: text })}
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
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