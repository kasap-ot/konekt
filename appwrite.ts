import { Account, Client, Databases, Storage } from 'react-native-appwrite';
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
} from 'config';

const config = {
  endpoint: APPWRITE_ENDPOINT,
  projectId: APPWRITE_PROJECT_ID,
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { databases, account, storage };