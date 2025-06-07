import { useEvents } from 'app/contexts/EventsContext';
import EventForm from 'components/EventForm';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CreateEvent } from 'types';
import { useState } from 'react';
import { View, Text } from 'react-native';

const EditEventPage = () => {
    const { id } = useLocalSearchParams();
    const { events, updateEvent } = useEvents();
    const router = useRouter();

    const existingEvent = events.find(e => e.$id === id);

    if (existingEvent === undefined) {
        return (
            <View>
                <Text>Event not found...</Text>
            </View>
        );
    }

    const [event, setEvent] = useState<CreateEvent>(existingEvent);
    const [modalVisible, setModalVisible] = useState(false);

    function handleFormSubmit(): void {
        if (!existingEvent) return;
        updateEvent(existingEvent.$id, event);
        router.push('/routes/list-events');
        alert('Event updated successfully!');
    }

    return (
        <EventForm
            event={event}
            setEvent={setEvent}
            handleFormSubmit={handleFormSubmit}
            handleLocationSelect={(loc) => {
                setEvent(prev => ({ ...prev, locationName: loc.name, locationUrl: loc.url }));
                setModalVisible(false);
            }}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
        />
    );
};

export default EditEventPage;