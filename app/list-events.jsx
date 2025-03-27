import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import EventIcon from '../assets/images/event-icon.png';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEvents } from './events-context';
import { Colors } from '../styles/globalStyles';


const ListEventsPage = () => {
  const { events } = useEvents();
  const router = useRouter();
  const { category } = useLocalSearchParams();

  const handleEventPress = (eventId) => {
    router.push(`/event?id=${eventId}`);
  };

  const filteredEvents = category ? events.filter(event => event.category === category) : events;

  const renderEventItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEventPress(item.id)}>
      <View style={styles.eventItem}>
        <Image 
          source={item.image ? { uri: item.image } : EventIcon} 
          style={styles.eventImage} 
        />
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventText}>Date: {item.date}</Text>
          <Text style={styles.eventText}>Location: {item.location}</Text>
          <Text style={styles.eventText}>Category: {item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {category && (
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>{category}</Text>
        </View>
      )}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderEventItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events found in this category.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
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
  image: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: Colors.text.primary,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: Colors.text.primary,
    fontSize: 18,
  },
  categoryHeader: {
    backgroundColor: Colors.background.tertiary,
    padding: 15,
    alignItems: 'center',
  },
  categoryHeaderText: {
    color: Colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ListEventsPage;