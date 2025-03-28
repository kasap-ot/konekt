import { Client, Databases, ID, Query } from 'appwrite';

const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: 'konekt',
  databaseId: 'konekt-db',
  eventsCollectionId: 'events'
};

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
          image: eventData.image
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
      const queries = [Query.equal('category', category)] 
      
      const response = await databases.listDocuments(
        config.databaseId,
        config.eventsCollectionId,
        queries
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
        image: doc.image
      }));
    } catch (error) {
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

  async updateEventImage(eventId, imageUri) {
    try {
      const response = await databases.updateDocument(
        config.databaseId,
        config.eventsCollectionId,
        eventId,
        {
          image: imageUri
        }
      );
      return response;
    } catch (error) {
      console.error('Error updating event image:', error);
      throw error;
    }
  }
};

export default AppwriteService;