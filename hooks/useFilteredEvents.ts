import { useMemo } from 'react';
import { Event } from 'types';

export function useFilteredEvents(
  events: Event[],
  category?: string,
  userId?: string,
  searchQuery: string = ''
): Event[] {
  return useMemo(() => {
    let result = [...events];

    if (category) {
      result = result.filter((event) => event.category === category);
    }

    if (userId) {
      result = result.filter((event) => event.userId === userId);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((event) => event.title.toLowerCase().includes(query));
    }

    return result;
  }, [events, category, userId, searchQuery]);
}
