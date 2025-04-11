import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from 'styles/Colors';

interface LocationButtonProps {
    onPress: () => void;
    labelText: string;
    locationText: string;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onPress, labelText, locationText }) => {
    function extractLocationName(url: string): string | null {
        try {
            const queryStart = url.indexOf('?');
            if (queryStart === -1) return null;

            const queryString = url.slice(queryStart + 1);

            const params = new URLSearchParams(queryString);
            const encodedName = params.get('q');

            if (!encodedName) return null;

            return decodeURIComponent(encodedName);
        } 
        catch (error) {
            console.error('Error parsing Google Maps URL:', error);
            return null;
        }
    }
    return (
        <>
            <Text style={styles.label}>{labelText}</Text>
            <TouchableOpacity
                style={styles.locationButton}
                onPress={onPress}
            >
                <Text style={styles.locationButtonText}>
                    {extractLocationName(locationText) || 'Select Location'}
                </Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
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
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text.primary,
        marginBottom: 8,
    },
})

export default LocationButton;