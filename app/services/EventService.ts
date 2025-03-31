import { CreateEvent, EventDocument } from "types";
import { config, databases } from 'appwrite';
import { ID, Query } from 'react-native-appwrite'

export const EventService = {
    async createEvent(eventData: CreateEvent): Promise<EventDocument> {

        try {
            const response = await databases.createDocument<EventDocument>(
                config.databaseId,
                config.eventsCollectionId,
                ID.unique(),
                {
                    title: eventData.title,
                    date: eventData.date,
                    time: eventData.time,
                    location: eventData.location,
                    organizer: eventData.organizer,
                    description: eventData.description,
                    category: eventData.category,
                    imagePath: eventData.imagePath || null,
                    userId: eventData.userId,
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

            const response = await databases.listDocuments<EventDocument>(
                config.databaseId,
                config.eventsCollectionId,
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
                config.databaseId,
                config.eventsCollectionId,
                eventId
            );
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    },
};

export default EventService;