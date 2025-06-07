import { Account, Client, Databases, Storage } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || '')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '');

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { databases, account, storage };