import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../styles/Colors';

interface EventImageProps {
  imageUri?: string | null;
}

const EventImage: React.FC<EventImageProps> = ({ imageUri }) => {
  return imageUri ? (
    <Image
      source={{ uri: imageUri }}
      style={styles.photo}
      resizeMode="cover"
    />
  ) : (
    <View style={styles.imagePlaceholder}>
      <Text style={styles.placeholderText}>...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  photo: {
    height: 200,
    width: '100%',
    marginBottom: 20,
  },
  imagePlaceholder: {
    height: 200,
    width: '100%',
    marginBottom: 20,
    backgroundColor: Colors.accent.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.text.primary,
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default EventImage;