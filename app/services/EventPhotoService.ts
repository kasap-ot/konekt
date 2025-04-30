import { storage } from "appwrite";
import { APPWRITE_EVENT_PHOTOS_BUCKED_ID } from "config";
import { Models } from "node_modules/react-native-appwrite/types";
import { CreateEvent } from "types";


export const EventPhotoService =
{
    async createEventPhoto(event: CreateEvent): Promise<Models.File> 
    {
        if (event.imageId === null)
            throw new Error('Event must contain image id.');

        if (event.fileInfo === null)
            throw new Error('Event must contain image uri.');

        const response = await storage.createFile(
            APPWRITE_EVENT_PHOTOS_BUCKED_ID,
            event.imageId,
            event.fileInfo,
        );

        return response;
    }
}