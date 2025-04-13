import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Client, Storage } from 'react-native-appwrite';

const endpoint = 'https://cloud.appwrite.io/v1';
const projectId = 'konekt';
const bucketId = '67f7e35b000dfa9a3674';
const fileId = '67f7e395001bc9365d06';

const client = new Client();
client
    .setEndpoint(endpoint)
    .setProject(projectId);

export const storage = new Storage(client);


export default function TestImageAppwrite() {
    useEffect(() => {
        async function fetchFile() {
            try {
                const result = await storage.getFile(bucketId, fileId);
                console.log('File content:', result);
            } catch (error) {
                console.error('Error fetching file:', error);
            }
        };

        fetchFile();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Check console for file content</Text>
        </View>
    );
}
