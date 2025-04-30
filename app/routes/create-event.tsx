import React, { useState } from 'react';
import { useEvents } from 'app/contexts/EventsContext';
import { Redirect, useRouter } from 'expo-router';
import { CreateEvent, Location } from 'types';
import { useAuth } from 'app/contexts/AuthContext';
import { defaultEvent } from 'utils';
import EventForm from 'components/EventForm';


const CreateEventPage = (): React.ReactElement => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href='/' />
  }

  const [event, setEvent] = useState<CreateEvent>(defaultEvent(user));
  const [modalVisible, setModalVisible] = useState(false);
  const { addEvent } = useEvents();
  const router = useRouter();

  function handleFormSubmit(): void {
    addEvent(event);
    setEvent(defaultEvent());
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
    <EventForm
      event={event}
      setEvent={setEvent}
      handleFormSubmit={handleFormSubmit}
      handleLocationSelect={handleLocationSelect}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default CreateEventPage;