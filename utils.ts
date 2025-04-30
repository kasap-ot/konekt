import { CreateEvent, EventCategory, FileInfo, User } from "types";
import * as ImagePicker from 'expo-image-picker';
import { Platform } from "react-native";

export function defaultEvent(user?: User): CreateEvent {
  const category: EventCategory = 'Party';
  const event: CreateEvent = {
    title: '',
    locationName: '',
    locationUrl: '',
    organizer: '',
    description: '',
    category: category,
    imageId: null,
    userId: user?.$id || '',
    dateTime: '',
    fileInfo: null
  }
  return event;
}

export function extractFileInfo(pickerResult: ImagePicker.ImagePickerResult): FileInfo | null {
  if (pickerResult.canceled || pickerResult.assets.length === 0)
    return null;

  const asset = pickerResult.assets[0];

  const fileInfo = {
    uri: Platform.OS === 'ios' ? asset.uri.replace('file://', '') : asset.uri,
    name: asset.fileName?.replace(/\.jpeg$/, ".jpg") || 'photo.jpg',
    type: asset.mimeType || 'image/jpeg',
    size: asset.fileSize || 0,
  };

  return fileInfo;
}