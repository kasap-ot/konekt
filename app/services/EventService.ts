import { CreateEvent, EventDocument } from "types";
import { databases } from 'appwrite';
import { ID, Query } from 'react-native-appwrite'

export const EventService = {
    async createEvent(newEvent: CreateEvent): Promise<EventDocument> {
        try {
            const response = await databases.createDocument<EventDocument>(
                process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || '',
                process.env.EXPO_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID || '',
                ID.unique(),
                {
                    title: newEvent.title,
                    locationName: newEvent.locationName,
                    locationUrl: newEvent.locationUrl,
                    organizer: newEvent.organizer,
                    description: newEvent.description,
                    category: newEvent.category,
                    imageId: newEvent.imageId,
                    userId: newEvent.userId,
                    dateTime: newEvent.dateTime,
                }
            );
            return response;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    },

    async fetchEvents(category: string | null = null): Promise<EventDocument[]> {
        try {
            const queries = category ? [Query.equal('category', category)] : [];

            console.log('[REQUEST TO BACKEND - READ EVENTS]');
            const response = await databases.listDocuments<EventDocument>(
                process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || '',
                process.env.EXPO_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID || '',
                queries
            );

            return response.documents;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    },

    async deleteEvent(eventId: string): Promise<void> {
        try {
            await databases.deleteDocument(
                process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || '',
                process.env.EXPO_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID || '',
                eventId
            );
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    },
    async updateEvent(eventId: string, updatedEvent: Partial<CreateEvent>): Promise<EventDocument> {
        try {
            const response = await databases.updateDocument<EventDocument>(
                process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || '',
                process.env.EXPO_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID || '',
                eventId,
                updatedEvent,
            );
            return response;
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    }

};

export default EventService;