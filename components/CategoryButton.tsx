import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../styles/globalStyles';
import { EventCategory } from 'types/event';

interface CategoryButtonProps {
  category: EventCategory;
  onPress: (category: EventCategory) => void;
  style?: ViewStyle;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => onPress(category)}>
    <Text style={styles.buttonText}>{category}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
});

export default CategoryButton;