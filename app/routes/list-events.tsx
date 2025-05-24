import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEvents } from '../contexts/EventsContext';
import { Colors } from '../../styles/Colors';
import { Event } from 'types';
import Header from 'components/Header';
import EventListItem from 'components/EventListItem';
import EmptyState from 'components/EmpyState';
import EventSearchBar from 'components/EventSearchBar';
import { useFilteredEvents } from 'hooks/useFilteredEvents';
import { useHeaderText } from 'hooks/useHeaderText';

const ListEventsPage: React.FC = () => {
  const router = useRouter();
  const { events } = useEvents();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { category, userId } = useLocalSearchParams<{
    category?: string;
    userId?: string;
  }>();

  const filteredEvents = useFilteredEvents(events, category, userId, searchQuery);
  const headerText = useHeaderText(category, userId);

  function handleEventPress(eventId: string): void {
    router.push(`/routes/event?id=${eventId}`);
  }

  function renderEventItem({ item }: { item: Event }) {
    return <EventListItem event={item} onPress={() => handleEventPress(item.$id)} />;
  }

  return (
    <View style={styles.container}>
      <Header title={headerText} />
      <EventSearchBar onSearch={setSearchQuery} />
      <FlatList
        data={filteredEvents}
        keyExtractor={(item: Event) => item.$id}
        renderItem={renderEventItem}
        ListEmptyComponent={<EmptyState message="No events found" />}
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
