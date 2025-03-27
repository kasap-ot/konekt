import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../styles/globalStyles';


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
    backgroundColor: Colors.background.primary, 
  },
  topContainer: {
    height: 80, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: Colors.background.tertiary, 
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light, 
  },
  interestedText: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: Colors.text.primary, 
  },
  listContent: {
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light, 
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12, 
    backgroundColor: Colors.accent.primary, 
    marginRight: 12,
  },
  username: {
    fontSize: 18,
    color: Colors.text.primary 
  }
});

export default InterestedUsersPage;