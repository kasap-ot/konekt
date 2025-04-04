import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEvents } from '../contexts/EventsContext';
import { Colors } from '../../styles/Colors';
import { Event } from 'types';
import Header from '../../components/Header';
import EventListItem from 'components/EventListItem';
import EmptyState from '../../components/EmpyState';


const ListEventsPage: React.FC = () => {
  const { events } = useEvents();
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();

  function handleEventPress(eventId: string): void {
    router.push(`/routes/event?id=${eventId}`);
  };

  const filteredEvents = category
    ? events.filter((event: Event) => event.category === category)
    : events;

  const headerText = category || 'Events';

  function renderEventItem({ item }: { item: Event }) {
    return (<EventListItem event={item} onPress={() => handleEventPress(item.$id)} />);
  }

  return (
    <View style={styles.container}>
      <Header title={headerText} />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item: Event) => item.$id}
        renderItem={renderEventItem}
        ListEmptyComponent={<EmptyState message='No events found for this category' />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
});

export default ListEventsPage;