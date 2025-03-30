import { Client, Databases, ID, Query } from 'react-native-appwrite';
import {AppwriteConfig, CreateEvent, EventDocument} from '../types/event'

const config: AppwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: 'konekt',
  databaseId: '67e6d40e001b9e49230d',
  eventsCollectionId: '67e6d4230010e2efaff3',
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

const databases = new Databases(client);

export const AppwriteService = {
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
          imagePath: eventData.imagePath || null
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

export default AppwriteService;