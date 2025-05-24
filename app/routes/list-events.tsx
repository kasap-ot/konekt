import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEvents } from '../contexts/EventsContext';
import { Colors } from '../../styles/Colors';
import { Event } from 'types';
import Header from 'components/Header';
import EventListItem from 'components/EventListItem';
import EmptyState from 'components/EmpyState';
import EventSearchBar from 'components/EventSearchBar';


const ListEventsPage: React.FC = () => {
  const { events } = useEvents();
  const router = useRouter();
  const { category, userId } = useLocalSearchParams<{
    category?: string;
    userId?: string;
  }>();


  function handleEventPress(eventId: string): void {
    router.push(`/routes/event?id=${eventId}`);
  };


  const filteredEvents = React.useMemo(() => {
    let result = [...events];
    if (category)
      result = result.filter((event: Event) => event.category === category);
    if (userId)
      result = result.filter((event: Event) => event.userId === userId);
    return result;
  }, [events, category, userId]);

  
  const headerText = React.useMemo(() => {
    if (userId) return 'My Events';
    if (category) return category;
    return 'Events';
  }, [category, userId]);


  function renderEventItem({ item }: { item: Event }) {
    return (<EventListItem event={item} onPress={() => handleEventPress(item.$id)} />);
  }

  return (
    <View style={styles.container}>
      <Header title={headerText} />

      <EventSearchBar></EventSearchBar>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item: Event) => item.$id}
        renderItem={renderEventItem}
        ListEmptyComponent={<EmptyState message='No events found' />}
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