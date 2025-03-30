import { Client, Account } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('konekt');

export const account = new Account(client);

export type User = {
  $id: string;
  email: string;
  name?: string;
};