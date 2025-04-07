import { Account, Client, Databases } from 'react-native-appwrite';
import { AppwriteConfig } from './types';
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_EVENTS_COLLECTION_ID,
} from 'config';

const config: AppwriteConfig = {
  endpoint: APPWRITE_ENDPOINT,
  projectId: APPWRITE_PROJECT_ID,
  databaseId: APPWRITE_DATABASE_ID,
  eventsCollectionId: APPWRITE_EVENTS_COLLECTION_ID,
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

const databases = new Databases(client);
const account = new Account(client);

export { databases, account, config };