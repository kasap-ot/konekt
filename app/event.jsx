import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

const EventPage = () => {
  const router = useRouter(); // Initialize the router

  // Example event data
  const event = {
    title: 'Tech Conference 2023',
    location: 'San Francisco, CA',
    date: 'November 15, 2023',
    time: '9:00 AM - 5:00 PM',
    description:
      'Join us for the largest tech conference of the year! Learn about the latest trends in AI, blockchain, and cloud computing. ' +
      'This event will feature keynote speakers from leading tech companies, hands-on workshops, and networking opportunities. ' +
      'Whether you\'re a developer, entrepreneur, or tech enthusiast, this conference has something for everyone. Don\'t miss out!',
    organizer: 'Tech Innovators Inc.',
  };

  return (
    <View style={styles.container}>
      {/* Orange container as a placeholder for event photo */}
      <View style={styles.photoPlaceholder} />

      {/* Event title */}
      <Text style={styles.eventTitle}>{event.title}</Text>

      {/* 2x2 Grid for pill-shaped containers */}
      <View style={styles.gridContainer}>
        <View style={styles.pillContainer}>
          <Text style={styles.pillText}>{event.location}</Text>
        </View>
        <View style={styles.pillContainer}>
          <Text style={styles.pillText}>{event.date}</Text>
        </View>
        <View style={styles.pillContainer}>
          <Text style={styles.pillText}>{event.time}</Text>
        </View>
        <View style={styles.pillContainer}>
          <Text style={styles.pillText}>{event.organizer}</Text>
        </View>
      </View>

      {/* Event description */}
      <Text style={styles.description}>{event.description}</Text>

      {/* Button to navigate to the Guests page */}
      <TouchableOpacity
        style={styles.guestsButton}
        onPress={() => router.push('/guests')} // Navigate to the "/guests" page
      >
        <Text style={styles.guestsButtonText}>View Guests</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  photoPlaceholder: {
    height: 200, // Fixed height for the placeholder
    backgroundColor: '#FFA500', // Orange color
    width: '100%', // Full width of the screen
    marginBottom: 20, // Space below the placeholder
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20, // Add horizontal padding to the title
  },
  gridContainer: {
    flexDirection: 'row', // Arrange children in a row
    flexWrap: 'wrap', // Allow wrapping to the next line
    justifyContent: 'space-between', // Space out the items evenly
    marginBottom: 20,
    paddingHorizontal: 20, // Add horizontal padding to the grid
  },
  pillContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25, // Larger pill shape
    paddingVertical: 15, // Larger padding for bigger containers
    paddingHorizontal: 20,
    width: '48%', // Each container takes up 48% of the width (2 per row)
    marginBottom: 10, // Space between rows
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  pillText: {
    fontSize: 16, // Larger font size
    fontWeight: '500',
    color: '#121212', // Dark text for contrast
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    paddingHorizontal: 20, // Add horizontal padding to the description
    marginBottom: 20, // Add space below the description
  },
  guestsButton: {
    backgroundColor: '#A0522D', // Blue color for the button
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: 20, // Add horizontal margin
    marginBottom: 20, // Add space at the bottom
  },
  guestsButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for contrast
  },
});

export default EventPage;