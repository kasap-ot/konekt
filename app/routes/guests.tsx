import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Colors } from '../../styles/Colors';
import UserItem from 'components/UserItem';

interface User {
  id: string;
  username: string;
}

const InterestedUsersPage: React.FC = () => {
  const interestedUsers: User[] = [
    { id: '1', username: 'User1' },
    { id: '2', username: 'User2' },
    { id: '3', username: 'User3' },
    { id: '4', username: 'User4' },
    { id: '5', username: 'User5' },
  ];

  const numberOfInterestedUsers: number = interestedUsers.length;

  const renderUserItem: ListRenderItem<User> = ({ item }) => (
    <UserItem username={item.username}/>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.interestedText}>Interested: {numberOfInterestedUsers}</Text>
      </View>

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
});

export default InterestedUsersPage;