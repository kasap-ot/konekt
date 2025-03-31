import { Account, Client, Databases } from 'react-native-appwrite';
import {AppwriteConfig} from './types'

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
const account = new Account(client);

export {databases, account, config};