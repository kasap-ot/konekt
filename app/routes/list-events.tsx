import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEvents } from '../contexts/EventsContext';
import { Colors } from '../../styles/globalStyles';
import { Event } from 'types';
import Header from '../../components/Header';
import EventListItem from 'components/EventListItem';


const ListEventsPage: React.FC = () => {
  const { events } = useEvents();
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();

  const handleEventPress = (eventId: string) => {
    router.push(`/routes/event?id=${eventId}`);
  };

  const filteredEvents = category 
    ? events.filter((event: Event) => event.category === category) 
    : events;

  
  const headerText = category || 'Events';

  const renderEventItem = ({ item }: { item: Event }) => (
    <EventListItem event={item} onPress={() => handleEventPress(item.$id)}/>
  );

  return (
    <View style={styles.container}>
      <Header title={headerText}/>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item: Event) => item.$id}
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
});

export default ListEventsPage;