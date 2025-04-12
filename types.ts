import { Models } from 'react-native-appwrite';


export type Location = {
    name: string;
    url: string;
}


export interface Event {
    $id: string;
    title: string;
    locationName: string;
    locationUrl: string;
    organizer: string;
    description: string;
    category: EventCategory;
    imagePath: string | null;
    userId: string;
    dateTime: string;
}

export type EventCategory = 'Party' | 'Sport' | 'Education';
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