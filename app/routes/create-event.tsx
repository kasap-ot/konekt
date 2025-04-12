import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, Alert } from 'react-native';
import { useEvents } from 'app/contexts/EventsContext';
import { Redirect, useRouter } from 'expo-router';
import { Colors } from 'styles/Colors';
import { EventCategory, CreateEvent, Location } from 'types';
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
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return <Redirect href='/' />
  }

  const [event, setEvent] = useState<CreateEvent>({
    title: '',
    locationName: '',
    locationUrl: '',
    organizer: '',
    description: '',
    category: 'Party',
    imagePath: null,
    userId: user.$id,
    dateTime: '',
  });

  const [modalVisible, setModalVisible] = useState(false);

  function handleFormSubmit(): void {
    addEvent(event);
    setEvent({
      title: '',
      locationName: '',
      locationUrl: '',
      organizer: '',
      description: '',
      category: 'Party',
      imagePath: null,
      userId: '',
      dateTime: '',
    });

    router.push('/routes/list-events');
    alert('Event created successfully!');
  };

  function handleLocationSelect(location: Location) {
    setEvent(prev => ({
       ...prev, 
       locationName: location.name,
       locationUrl: location.url,
    }));
    setModalVisible(false);
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

        <LocationButton onPress={() => setModalVisible(true)} labelText='Location' locationName={event.locationName} />

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