import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Client, ID, Storage } from "react-native-appwrite";
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_EVENT_PHOTOS_BUCKED_ID,
} from 'config';

// Set up the connection to Appwrite
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const storage = new Storage(client);

// The whole component the will be displayeed
export default function ImageUploadAndDisplay() {
  // We use state for storing the URLs of the local and remote images
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [serverImageUri, setServerImageUri] = useState<string | null>(null);

  async function pickAndUploadImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];

      const fileUri = asset.uri;
      const mimeType = asset.mimeType || 'image/jpg';
      const fileSize = asset.fileSize || 0;
      let fileName = asset.fileName || 'photo.jpg';
      fileName = fileName.replace(/\.jpeg$/, ".jpg");

      setLocalImage(fileUri);

      const file = {
        uri: Platform.OS === 'ios' ? fileUri.replace('file://', '') : fileUri,
        name: fileName,
        type: mimeType,
        size: fileSize,
      };

      try {
        const fileId = ID.unique();
        const response = await storage.createFile(
          APPWRITE_EVENT_PHOTOS_BUCKED_ID,
          fileId,
          file,
        );

        // Immediately fetch the uploaded image
        fetchUploadedImage(fileId);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  function fetchUploadedImage(fileId: string): void {
    try {
      const result = storage.getFileView(APPWRITE_EVENT_PHOTOS_BUCKED_ID, fileId);
      setServerImageUri(result.toString());
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick and Upload Image" onPress={pickAndUploadImage} />

      {localImage && (
        <>
          <Text style={styles.sectionTitle}>Local Preview:</Text>
          <Image source={{ uri: localImage }} style={styles.image} />
        </>
      )}

      {serverImageUri && (
        <>
          <Text style={styles.sectionTitle}>Image from Appwrite:</Text>
          <Image
            source={{ uri: serverImageUri }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text>{serverImageUri}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
});