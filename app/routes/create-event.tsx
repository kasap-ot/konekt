import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, Alert, Modal, View, Pressable } from 'react-native';
import { useEvents } from 'app/contexts/EventsContext';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from 'styles/Colors';
import { EventCategory, CreateEvent } from 'types';
import DateTimePickerInput from 'app/components/DateTimeInput';
import FormTextInput from 'app/components/FormTextInput';
import PictureInput from 'app/components/PictureInput';
import CategoryInput from 'app/components/EventCategoryInput';
import DescriptionInput from 'app/components/EventDescriptionInput';
import Header from 'app/components/Header';
import { useAuth } from 'app/contexts/AuthContext';
import LocationButton from 'app/components/LocationButton';
import LocationModal from 'app/components/LocationModal';


const CreateEventPage = (): React.ReactElement => {
  const { addEvent } = useEvents();
  const params = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return <Redirect href='/' />
  }

  const [event, setEvent] = useState<CreateEvent>({
    title: '',
    location: params.location?.toString() || '',
    organizer: '',
    description: '',
    category: 'Parties',
    imagePath: null,
    userId: user.$id,
    dateTime: '',
  });

  const [modalVisible, setModalVisible] = useState(false);

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

  function handleLocationSelect(location: string) {
    setEvent(prev => ({ ...prev, location }));
    setModalVisible(false);
    console.log(event);
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Header title="Create Event" />

        <PictureInput
          image={event.imagePath}
          setEvent={setEvent}
        />

        <FormTextInput
          label="Title"
          placeholder="Enter event title"
          value={event.title}
          onChangeText={(text) => setEvent({ ...event, title: text })}
        />

        <DateTimePickerInput
          mode="date"
          label="Date"
          minimumDate={new Date()}
          onDateTimeChange={(dateTime) => setEvent(prev => ({ ...prev, dateTime }))}
        />

        <DateTimePickerInput
          mode="time"
          label="Time"
          is24Hour={false}
          onDateTimeChange={(dateTime) => setEvent(prev => ({ ...prev, dateTime }))}
        />

        <LocationButton onPress={() => setModalVisible(true)} labelText='Location' locationText={event.location} />

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

      <LocationModal visible={modalVisible} onClose={() => setModalVisible(false)} onLocationSelect={handleLocationSelect} />
    </>
  );
};

interface Styles {
  container: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  locationButton: ViewStyle;
  locationButtonText: TextStyle;
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
  locationButton: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  locationButtonText: {
    fontSize: 16,
    color: Colors.text.primary,
  },
});

export default CreateEventPage;