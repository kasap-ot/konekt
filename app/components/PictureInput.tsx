import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../styles/Colors';

interface PictureInputProps {
  image?: string | null;
  onPickImage: () => void;
}

const PictureInput: React.FC<PictureInputProps> = ({ image, onPickImage }) => {
  return (
    <TouchableOpacity
      style={styles.imageUploadContainer}
      onPress={onPickImage}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.uploadedImage}
        />
      ) : (
        <Text style={styles.imageUploadText}>Upload Event Image</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageUploadContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageUploadText: {
    color: Colors.text.primary,
    fontSize: 16,
  },
});

export default PictureInput;