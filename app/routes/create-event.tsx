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
  const { addEvent, pickImage } = useEvents();
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

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Create Event" />

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

      {/* NOTE - Old code */}

      {/* <FormTextInput
        label="Location"
        placeholder="Enter event location"
        value={event.location}
        onChangeText={(text) => setEvent({ ...event, location: text })}
      /> */}

      <LocationButton onPress={() => setModalVisible(true)} text='Location' />

      {/* ------------------------------------------ */}

      <LocationModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      {/* <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
          <Text style={styles.modalText}>There will be a search bar here...</Text>
          <Pressable onPress={() => setModalVisible(false)}>
            <Ionicons name='close' size={24} color='#fff'/>
          </Pressable>
          </View>
        </View>
      </Modal> */}

      {/* ------------------------------------------ */}

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
  locationButton: ViewStyle;
  locationButtonText: TextStyle;
  // modal: ViewStyle;
  // modalText: TextStyle;
  // modalHeader: ViewStyle;
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
  // modal: {
  //   backgroundColor: Colors.background.primary,
  //   flex: 1,
  //   padding: 30,
  // },
  // modalText: {
  //   color: Colors.text.primary,
  //   fontSize: 20,
  // },
  // modalHeader: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between'
  // }
});

export default CreateEventPage;