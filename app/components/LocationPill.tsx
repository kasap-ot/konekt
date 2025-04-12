import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Linking } from 'react-native';
import { Colors } from 'styles/Colors';
import { Event } from 'types';

interface LocationPillProps {
    event: Event;
    style?: ViewStyle;
}

const Pill: React.FC<LocationPillProps> = ({ event, style }) => {
    async function openLocation(locationUrl: string) {
        try { await Linking.openURL(locationUrl); }
        catch (error) { console.error('Cannot open location:', error); }
    }

    return (
        <View style={[styles.pillContainer, style]}>
            <TouchableOpacity 
                onPress={() => openLocation(event.locationUrl)}
                style={styles.button}
            >
                <Text style={styles.pillText}>{event.locationName}</Text>
            </TouchableOpacity>
        </View>
    );
};

// TODO - reuse ordinary Pill styles - to keep the Pill styling in sync

const styles = StyleSheet.create({
    pillContainer: {
        backgroundColor: Colors.text.primary,
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '48%',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pillText: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.background.primary,
        textAlign: 'center',
    },
    button: {
        width: '100%',
    }
});

export default Pill;