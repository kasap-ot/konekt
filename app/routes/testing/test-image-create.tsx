import { useState } from 'react';
import { Button, Image, View, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Client, ID, Storage } from "react-native-appwrite";
import {
    APPWRITE_ENDPOINT,
    APPWRITE_PROJECT_ID,
    APPWRITE_EVENT_PHOTOS_BUCKED_ID,
} from 'config';

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);
const storage = new Storage(client);


export default function ImagePickerExample() {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
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

            setImage(fileUri);

            const file = {
                uri: Platform.OS === 'ios' ? fileUri.replace('file://', '') : fileUri,
                name: fileName,
                type: mimeType,
                size: fileSize,
            };

            try {
                console.log('Uploading to Appwrite...');
                const response = await storage.createFile(
                    APPWRITE_EVENT_PHOTOS_BUCKED_ID,
                    ID.unique(),
                    file,
                );
                console.log('Upload successful:', response);
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 400,
        height: 300,
    },
});

// const exampleImage = {
//     "assets": [
//         {
//             "assetId": null,
//             "base64": null,
//             "duration": null,
//             "exif": null,
//             "fileName": "fcee4dde-9c6c-4404-a682-16855d3f3bfb.jpeg",
//             "fileSize": 12108058,
//             "height": 3472,
//             "mimeType": "image/jpeg",
//             "rotation": null,
//             "type": "image",
//             "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fkonekt-75011ade-a9d2-40a9-aab7-f71fa3da927c/ImagePicker/fcee4dde-9c6c-4404-a682-16855d3f3bfb.jpeg",
//             "width": 4630
//         }
//     ],
//     "canceled": false
// }