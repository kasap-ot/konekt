import { Models } from 'react-native-appwrite';


export interface Event {
    $id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    description: string;
    category: EventCategory;
    imagePath: string | null;
}

export type EventCategory = 'Parties' | 'Sport Events' | 'Educational Events';
export type UserType = 'guest' | 'organizer';

export type CreateEvent = Omit<Event, '$id'>;

export interface AppwriteConfig {
    endpoint: string;
    projectId: string;
    databaseId: string;
    eventsCollectionId: string;
}

export interface EventDocument extends CreateEvent, Models.Document { }

export type User = {
    $id: string,
    email: string,
    name: string,
    labels: string[],
};