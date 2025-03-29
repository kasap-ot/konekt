export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    description: string;
    category: EventCategory;
    image: string | null;
}

export type EventCategory = 'Parties' | 'Sport Events' | 'Educational Events';

export interface NewEvent {
    title: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    description: string;
    category: EventCategory;
    image: string | null;
}

export interface User {
    id: string;
    username: string;
}