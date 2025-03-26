import React, { useState } from 'react';
import { Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, View, Picker } from 'react-native';
import { useEvents } from './events-context';
import { useRouter } from 'expo-router';


const CreateEventPage = () => {
  // State to store form data
  const { addEvent } = useEvents();
  const router = useRouter();

  const [event, setEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    description: '',
    category: 'Parties',
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
    });

    // Navigate back or to events list
    router.push('/list-events');

    alert('Event created successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Event</Text>

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
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
  },
  pickerContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    color: '#FFFFFF',
  },
});

export default CreateEventPage;