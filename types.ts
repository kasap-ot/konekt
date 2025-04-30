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
    userId: string;
    dateTime: string;
    imageId: string | null;
}

export type EventCategory = 'Party' | 'Sport' | 'Education';
export type UserType = 'guest' | 'organizer';

export type CreateEvent = Omit<Event, '$id'> & {fileInfo: FileInfo | null};

export interface EventDocument extends CreateEvent, Models.Document { }

export type User = {
    $id: string,
    email: string,
    name: string,
    labels: string[],
};

export type FileInfo = {
    name: string,
    type: string,
    size: number,
    uri: string,
}