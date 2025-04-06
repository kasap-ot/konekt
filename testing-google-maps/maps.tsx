import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from './config'; // Store your API key securely

// Define types for the selected location data
type LocationData = {
    description: string;
    place_id: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
};

type PlaceDetails = {
    formatted_address: string;
    name: string;
    // Add other fields you need
};

export const LocationSearchBar = () => {
    const searchRef = useRef<GooglePlacesAutocomplete>(null);

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                ref={searchRef}
                placeholder="Search location"
                minLength={2}
                fetchDetails={true}
                onPress={(data: LocationData, details: PlaceDetails | null) => {
                    // Handle selected location
                    console.log('Selected place:', data.description);
                    console.log('Coordinates:', details?.geometry.location);
                }}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'en',
                    components: 'country:us', // Optional: restrict to specific country
                }}
                styles={{
                    textInputContainer: styles.inputContainer,
                    textInput: styles.textInput,
                    listView: styles.listView,
                }}
                currentLocation={false} // Don't show current location button
                debounce={300} // Debounce requests
                enablePoweredByContainer={false} // Remove "Powered by Google"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    textInput: {
        height: 48,
        color: '#5d5d5d',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    listView: {
        marginTop: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        zIndex: 1000, // Ensure dropdown appears above other elements
    },
});