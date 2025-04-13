import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Client, Storage } from 'react-native-appwrite';
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_EVENT_PHOTOS_BUCKED_ID,
  APPWRITE_EVENT_ICON_FILE_ID,
} from 'config';

const endpoint = APPWRITE_ENDPOINT;
const projectId = APPWRITE_PROJECT_ID;
const bucketId = APPWRITE_EVENT_PHOTOS_BUCKED_ID;
const fileId = APPWRITE_EVENT_ICON_FILE_ID;

const client = new Client();
client.setEndpoint(endpoint).setProject(projectId);
export const storage = new Storage(client);

export default function TestImageAppwrite() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = () => {
      try {
        const result = storage.getFileView(bucketId, fileId);
        setImageUri(result.toString());
        console.log('Image URL:', result.toString());
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchFile();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Check console for file content</Text>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
          resizeMode="contain"
        />
      )}
    </View>
  );
}
