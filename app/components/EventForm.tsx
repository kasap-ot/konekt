import { ScrollView, Text, TextStyle, TouchableOpacity, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'
import Header from './Header';
import PictureInput from './PictureInput';
import FormTextInput from './FormTextInput';
import DateTimePickerInput from './DateTimeInput';
import LocationButton from './LocationButton';
import CategoryInput from './EventCategoryInput';
import DescriptionInput from './EventDescriptionInput';
import LocationModal from './LocationModal';
import { Colors } from 'styles/Colors';
import { CreateEvent, EventCategory, Location } from 'types';

interface EventFormProps {
    event: CreateEvent;
    setEvent: (value: React.SetStateAction<CreateEvent>) => void;
    modalVisible: boolean;
    setModalVisible: (value: React.SetStateAction<boolean>) => void;
    handleFormSubmit: () => void;
    handleLocationSelect: (location: Location) => void;
}

export default function EventForm({
    event,
    setEvent,
    modalVisible,
    setModalVisible,
    handleFormSubmit,
    handleLocationSelect,
}: EventFormProps) {
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

                <LocationButton 
                    onPress={() => setModalVisible(true)} 
                    labelText='Location' 
                    locationName={event.locationName} 
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

            <LocationModal 
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
                onLocationSelect={handleLocationSelect} 
            />
        </>
    );
}

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