import { useMemo } from 'react';

export function useHeaderText(category?: string, userId?: string): string {
  return useMemo(() => {
    if (userId) return 'My Events';
    if (category) return category;
    return 'Events';
  }, [category, userId]);
}
