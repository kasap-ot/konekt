import { storage } from "appwrite";
import { ID, Models } from 'react-native-appwrite';
import { APPWRITE_EVENT_PHOTOS_BUCKED_ID } from 'config';
import { ImagePickerResult } from "node_modules/expo-image-picker/build/ImagePicker.types";
import { Platform } from "react-native";


export const EventPhotosService = {
    async savePhoto(imagePickerResult: ImagePickerResult): Promise<void | Models.File> {
        if (imagePickerResult.canceled || imagePickerResult.assets.length < 1)
            return;

        const asset = imagePickerResult.assets[0];
        const fileUri = asset.uri;
        const mimeType = asset.mimeType || 'image/jpg';
        const fileSize = asset.fileSize || 0;
        let fileName = asset.fileName || 'photo.jpg';
        fileName = fileName.replace(/\.jpeg$/, ".jpg");

        const file = {
            uri: Platform.OS === 'ios' ? fileUri.replace('file://', '') : fileUri,
            name: fileName,
            type: mimeType,
            size: fileSize,
        };

        try {
            const response = await storage.createFile(
                APPWRITE_EVENT_PHOTOS_BUCKED_ID,
                ID.unique(),
                file,
            );
            return response;
        }
        catch (error) { console.error('Could not save photo:', error); }
    },
}