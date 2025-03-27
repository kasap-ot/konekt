import React, { useState } from 'react';
import { Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEvents } from './events-context';
import { useRouter } from 'expo-router';
import { Colors } from '../styles/globalStyles';


const CreateEventPage = () => {
  // State to store form data
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

      {/* Image Upload Section */}
      <TouchableOpacity
        style={styles.imageUploadContainer}
        onPress={() => pickImage(setEvent)}
      >
        {event.image ? (
          <Image
            source={{ uri: event.image }}
            style={styles.uploadedImage}
          />
        ) : (
          <Text style={styles.imageUploadText}>Upload Event Image</Text>
        )}
      </TouchableOpacity>

      {/* Title Input */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event title"
        placeholderTextColor="#999"
        value={event.title}
        onChangeText={(text) => setEvent({ ...event, title: text })}
      />

      {/* Date Input */}
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event date (e.g., November 15, 2023)"
        placeholderTextColor="#999"
        value={event.date}
        onChangeText={(text) => setEvent({ ...event, date: text })}
      />

      {/* Time Input */}
      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event time (e.g., 9:00 AM - 5:00 PM)"
        placeholderTextColor="#999"
        value={event.time}
        onChangeText={(text) => setEvent({ ...event, time: text })}
      />

      {/* Location Input */}
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event location"
        placeholderTextColor="#999"
        value={event.location}
        onChangeText={(text) => setEvent({ ...event, location: text })}
      />

      {/* Organizer Input */}
      <Text style={styles.label}>Organizer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter organizer name"
        placeholderTextColor="#999"
        value={event.organizer}
        onChangeText={(text) => setEvent({ ...event, organizer: text })}
      />

      {/* Category Picker */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={event.category}
          style={styles.picker}
          onValueChange={(itemValue) => setEvent({ ...event, category: itemValue })}
        >
          <Picker.Item label="Parties" value="Parties" />
          <Picker.Item label="Sport Events" value="Sport Events" />
          <Picker.Item label="Educational Events" value="Educational Events" />
        </Picker>
      </View>

      {/* Description Input */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter event description"
        placeholderTextColor="#999"
        value={event.description}
        onChangeText={(text) => setEvent({ ...event, description: text })}
        multiline
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 20,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
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
  pickerContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    color: '#FFFFFF',
  },
  imageUploadContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageUploadText: {
    color: Colors.text.primary,
    fontSize: 16,
  },
});

export default CreateEventPage;