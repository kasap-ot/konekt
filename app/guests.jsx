import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const InterestedUsersPage = () => {
  // Sample data for users interested in the event
  const interestedUsers = [
    { id: '1', username: 'User1' },
    { id: '2', username: 'User2' },
    { id: '3', username: 'User3' },
    { id: '4', username: 'User4' },
    { id: '5', username: 'User5' },
  ];

  // Number of interested users
  const numberOfInterestedUsers = interestedUsers.length;

  // Render each user item
  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      {/* Orange Circle Component */}
      <View style={styles.circle} />
      <Text style={styles.username}>{item.username}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Fixed Top Component */}
      <View style={styles.topContainer}>
        <Text style={styles.interestedText}>Interested: {numberOfInterestedUsers}</Text>
      </View>

      {/* Scrollable List of Users */}
      <FlatList
        data={interestedUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  topContainer: {
    height: 80, // Fixed height for the top component
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#1F1F1F', // Slightly lighter dark background for the top component
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Darker border for contrast
  },
  interestedText: {
    fontSize: 28, // Larger text size
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
  },
  listContent: {
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Darker border for contrast
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12, // Half of width/height to make it a circle
    backgroundColor: 'orange', // Orange color
    marginRight: 12,
  },
  username: {
    fontSize: 18,
    color: '#FFFFFF' // White text
  }
});

export default InterestedUsersPage;