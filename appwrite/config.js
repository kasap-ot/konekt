import { Client, Databases, ID, Query } from 'react-native-appwrite';
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_DATABASE_ID, APPWRITE_EVENTS_COLLECTION_ID } from '@env';

const config = {
  endpoint: APPWRITE_ENDPOINT,
  projectId: APPWRITE_PROJECT_ID,
  databaseId: APPWRITE_DATABASE_ID,
  eventsCollectionId: APPWRITE_EVENTS_COLLECTION_ID,
}

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

const databases = new Databases(client);


export const AppwriteService = {
  async createEvent(eventData) {
    try {
      const response = await databases.createDocument(
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
          imagePath: eventData.imagePath
        }
      );
      return response;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async fetchEvents(category = null) {
    try {
      const queries = category ? [Query.equal('category', category)] : [];

      const response = await databases.listDocuments(
        config.databaseId,
        config.eventsCollectionId,
        queries,
      );

      return response.documents.map(doc => ({
        id: doc.$id,
        title: doc.title,
        date: doc.date,
        time: doc.time,
        location: doc.location,
        organizer: doc.organizer,
        description: doc.description,
        category: doc.category,
        imagePath: doc.imagePath
      }));
    }
    catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async deleteEvent(eventId) {
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