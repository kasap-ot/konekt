import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageStyle, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { Colors } from 'styles/Colors';
import { Event } from 'types';
import EventIcon from 'assets/images/event-icon.png';


interface Props {
    event: Event;
    onPress: () => void;
    imageStyle?: ImageStyle;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
}

const EventListItem: React.FC<Props> = ({ event, onPress, imageStyle, textStyle, containerStyle }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.eventItem, containerStyle]}>
                <Image
                    source={event.imagePath ? { uri: event.imagePath } : EventIcon}
                    style={[styles.eventImage, imageStyle]}
                />
                <View style={styles.eventDetails}>
                    <Text style={[styles.eventTitle, textStyle]}>{event.title}</Text>
                    <Text style={[styles.eventText, textStyle]}>Date: {event.dateTime.split('T')[0]}</Text>
                    <Text style={[styles.eventText, textStyle]}>Location: {event.location}</Text>
                    <Text style={[styles.eventText, textStyle]}>Category: {event.category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

interface Styles {
    eventItem: ViewStyle;
    eventImage: ImageStyle;
    eventDetails: ViewStyle;
    eventTitle: TextStyle;
    eventText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    eventItem: {
        flexDirection: 'row',
        backgroundColor: Colors.background.listItem,
        borderRadius: 8,
        margin: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    eventImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 12,
    },
    eventDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Colors.text.primary,
    },
    eventText: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
});

export default EventListItem;